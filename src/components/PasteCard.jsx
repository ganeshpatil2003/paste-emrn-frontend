import React, { useEffect } from "react";
import { Copy, Edit, Eye, Loader2, LucideCalendar, Search, Trash} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useDeletePasteMutation } from "@/features/apis/pasteApi";
import { toast } from "sonner";
const PasteCard = ({paste,refetch}) => {
  const date = new Date(paste.createdAt).toLocaleDateString('en-GB');
  const navigate = useNavigate();
  const [deletePaste,{data,isSuccess,isError,error,isLoading}] = useDeletePasteMutation()
  useEffect(() => {
    if(isSuccess){
      refetch();
      toast.success(data.message);
    }
    if(isError){
      toast.error(error.data.message)
    }
  } ,[isSuccess,isError])
  const update = () => {
    navigate(`/update/${paste._id}`)
  }

  const view = () => {
    navigate(`/view/${paste._id}`)
  }

  const copy = async() => {
    await navigator.clipboard.writeText(paste.content)
    toast.success('Copied to clipboard')
  }

  const remove = async() => {
    await deletePaste({pasteId : paste._id})
  }

  return (
    <div className="border border-gray-600 rounded-md p-4 flex items-center justify-between gap-5 ">
      <div className="flex flex-col space-y-3 max-w-[70%]">
        <h2 className="font-semibold text-3xl">{paste.title}</h2>
        <p className="text-[#c5c4c4] text-base text-balance line-clamp-3">
          {
            paste.content
          }
        </p>
      </div>
      <div className="flex flex-col items-start justify-end text-white space-y-2">
        <div className="flex gap-2 items-center">
          <div className="group border border-gray-600 bg-[#0f0f0f] p-3 hover:border-pink-500 rounded  transition ease-in-out duration-200 cursor-pointer">
            <Edit
              size={20} onClick={update}
              className="group-hover:text-pink-500 transition-text duration-200"
            />
          </div>
          <div className="group border border-gray-600 bg-[#0f0f0f] p-3 hover:border-orange-500 rounded  transition ease-in-out duration-200 cursor-pointer">
            <Eye onClick = {view}
              size={20}
              className="group-hover:text-orange-500 transition-text duration-200"
            />
          </div>
          <div className="group border border-gray-600 bg-[#0f0f0f] p-3 hover:border-indigo-500 rounded  transition ease-in-out duration-200 cursor-pointer">
            <Copy onClick ={copy}
              size={20}
              className="group-hover:text-indigo-500 transition-text duration-200"
            />
          </div>
          <div aria-disabled = {isLoading} className="group border  border-gray-600 bg-[#0f0f0f] p-3 hover:border-green-500 rounded  transition ease-in-out duration-200 cursor-pointer">
           {
            isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> :  <Trash onClick = {remove}
            size={20} 
            className="group-hover:text-green-500 transition-text duration-200"
          />
           }
          </div>
        </div>
        <div className="flex items-center gap-1  ml-auto mr-2">
          <div className="p-1 py-3">
            <LucideCalendar size={25} />
          </div>
          <div className="text-xl font-normal">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default PasteCard;
