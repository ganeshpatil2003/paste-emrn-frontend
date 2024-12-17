import { Button } from "@/components/ui/button";
import { useRegisterUserMutation } from "@/features/apis/userApi";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUpPage = () => {
  const [registerUser,{data,isLoading,isSuccess,isError,error}] =useRegisterUserMutation()
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    if(isSuccess){
      setInput({ username: "", email: "", password: "" })
      toast.success(`${data.data.username} registered.`)
      navigate('/signin')
    }
    if(isError){
      toast.error(data.message)
    }
  } ,[isSuccess,isError])
  const handelSUbmit = async(e) => {
    e.preventDefault(true);
  
    await registerUser(input);
   
  };

  const onChangeHandeler = (e) => {
    
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

  };
  return (
    <div className="mt-20 max-w-7xl mx-auto h-auto flex items-center justify-center ">
      <form
        onSubmit={handelSUbmit}
        className="w-[30rem] mx-auto  py-10 px-6 border bg-[#0f0f0f] border-[#333333] rounded-md"
      >
        <h2 className="font-bold text-xl text-white mb-2">Sign up</h2>
        <p className="font-normal text-sm text-[#ecedee]/[0.5]">
          Enter your details here. Click save when you're done.
        </p>
        <div className="flex flex-col gap-1 mt-6">
          <label htmlFor="username" className="text-white text-lg ">
            {" "}
            Username
          </label>
          <input
            required
            type="text"
            id="username"
            name="username"
            value={input.username}
            onChange={onChangeHandeler}
            className="bg-[#27272a] py-2 px-3 w-11/12 text-base rounded focus:bg-[#27272a] focus:outline-none placeholder:text-white-[0.5]"
            placeholder="Exp: Itachi uhiha"
          />
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <label htmlFor="email" className="text-white text-lg ">
            {" "}
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            value={input.email}
            name="email"
            onChange={onChangeHandeler}
            className="bg-[#27272a] py-2 px-3 w-11/12 text-base rounded focus:outline-none placeholder:text-white-[0.5]"
            placeholder="exp@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <label htmlFor="password" className="text-white text-lg ">
            {" "}
            password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={onChangeHandeler}
            className="bg-[#27272a] py-2 w-11/12 px-3 text-base rounded focus:outline-none placeholder:text-white-[0.5]"
            placeholder="password"
          />
        </div>
        <div className="py-6 pb-4 flex justify-start mt-2 gap-4">
          <Button
          disabled = {isLoading}
            type={"submit"}
            variant="secondary"
            className="px-8 py-3 text-center mr-5 bg-white/[0.8]  text-base"
          >
            {
              isLoading ? <><Loader2 className="animate-spin h-4 w-4 mr-2"/> submit</>:'Submit'
            }
          </Button>
          <Link to="/signin">
            <Button type="button" variant={"link"} className="text-white">
              Sign in
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
