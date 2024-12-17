import LoadinSpinner from "@/components/LoadinSpinner";
import {
    useGetAllPasteQuery,
  useGetPasteQuery,
  useUpdatePasteMutation,
} from "@/features/apis/pasteApi";
import { Copy, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdatePage = () => {
  const { id } = useParams();

  const { data, refetch, isError, isSuccess , isLoading } = useGetPasteQuery({
    pasteId: id,
  });
  const {refetch:getAllRefetch} = useGetAllPasteQuery(); 
  const [
    updatePaste,
    {
      data: updateData,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdatePasteMutation();

  if (isLoading)
    return (
      <>
        <LoadinSpinner />
      </>
    );

  if (isError) return <>{"Error plz try again later"}</>;

  const [input, setInput] = useState({
    title: data.data.title,
    content: data.data.content,
  });

  useEffect(() => {
    if (updateIsSuccess) {
      refetch();
      getAllRefetch();
      toast.success(updateData.message);
    }
    if (updateIsError) toast.error(updateError.data.message);
  }, [updateIsSuccess, updateIsError, isSuccess]);

  const onChangeHandeler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handelUpdate = async () => {
    await updatePaste({
      pasteId: id,
      title: input.title,
      content: input.content,
    });
  };

  const copy = async() => {
    await navigator.clipboard.writeText(input.content)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="max-w-7xl mt-6 mx-auto p-4 ">
      <div className="flex items-center justify-between">
        <input
          value={input.title}
          name="title"
          onChange={onChangeHandeler}
          placeholder="Title"
          type="text"
          className="text-md placeholder-[#ecedee] placeholder rounded-lg w-[88%] p-2 pl-4 bg-[#0f0f0f] text-[#ffffff] border border-[#6674cc] focus:outline-none"
        />
        <button
          onClick={handelUpdate}
          disabled={updateIsLoading}
          className="py-2 px-4 text text-white bg-[#6674cc] rounded-lg hover:bg-[#6674cc]/[0.7] transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Update paste
            </>
          ) : (
            " Update paste"
          )}
        </button>
      </div>
      <div className="bg-[#333333] rounded h-fit relative">
        <div className="bg-[#333333] w-full  rounded-lg mt-10 flex items-center justify-between py-3 px-5 border border-[#6674cc]">
          <div className="flex items-center justify-center  gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <Copy className="mr-3 cursor-pointer" size={20} onClick={copy}/>
        </div>

        <textarea
          name="content"
          value={input.content}
          onChange={onChangeHandeler}
          placeholder="Write youe content here..."
          rows={20}
          className="absolute  w-full rounded bg-[#0f0f0f] p-3 border border-[#333333] focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default UpdatePage;
