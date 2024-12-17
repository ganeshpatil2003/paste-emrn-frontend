import LoadinSpinner from "@/components/LoadinSpinner";
import { useGetPasteQuery } from "@/features/apis/pasteApi";
import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewPage = () => {
    const {id} = useParams();
    const {refetch,data,isError,error,isLoading} = useGetPasteQuery({pasteId : id})
    const [input,setInput] = useState({title:'',content :''});
   
    useEffect(() => {
      setInput({title:data.data.title,content :data.data.content})
    },[data])
    if(isLoading) return <><LoadinSpinner/></>

    if(isError) return <>{'Error plz try again later'}</>

  

    const copy = async() => {
        await navigator.clipboard.writeText(input.content)
        toast.success('Copied to clipboard')
      }

  return (

 
    <div className="max-w-7xl mt-6 mx-auto p-4 ">
      <div className="flex  items-center justify-between">
        <input value={input.title} readOnly name="title"
          placeholder="Title"
          type="text"
          className="text-md placeholder-[#ecedee] placeholder rounded-lg flex-1 p-2 pl-4 bg-[#0f0f0f] text-[#ffffff] border border-[#6674cc] focus:outline-none"
        />
      </div>
      <div className="bg-[#333333] rounded h-fit relative">
        <div className="bg-[#333333] w-full  rounded-lg mt-10 flex items-center justify-between py-3 px-5 border border-[#6674cc]">
          <div className="flex items-center justify-center  gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <Copy className="mr-3 cursor-pointer" size={20}  onClick = {copy}/>
        </div>

        <textarea name = "content" readOnly value={input.content}
          placeholder="Write youe content here..."
          rows={20}
          className="absolute  w-full rounded bg-[#0f0f0f] p-3 border border-[#333333] focus:outline-none resize-none"
        />
      </div>
    </div>

  )
}

export default ViewPage