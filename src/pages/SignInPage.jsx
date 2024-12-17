import { Button } from "@/components/ui/button";
import { useLogInUserMutation } from "@/features/apis/userApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignInPage = () => {
  const navigate = useNavigate();
  const [logInUser, { data, isSuccess, isError, error, isLoading }] =
    useLogInUserMutation();
  const [input, setInput] = useState({ email: "", password: "" });
  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault(true);
    await logInUser(input);
  };
  useEffect(() => {
    if (isSuccess) {
      setInput({ email: "", password: "" });
      toast.success(data.message);
      navigate("/");
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);
  return (
    <div className="mt-20 max-w-7xl mx-auto h-auto flex items-center justify-center ">
      <form
        onSubmit={handelSubmit}
        className="w-[30rem] mx-auto  py-10 px-6 border bg-[#0f0f0f] border-[#333333] rounded-md"
      >
        <h2 className="font-bold text-xl text-white mb-2">Sign in</h2>
        <p className="font-normal text-sm text-[#ecedee]/[0.5]">
          Enter your details here. Click login when you're done.
        </p>

        <div className="flex flex-col gap-1 mt-6">
          <label htmlFor="email" className="text-white text-lg ">
            {" "}
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            value={input.email}
            onChange={handelOnChange}
            id="email"
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
            value={input.password}
            name="password"
            onChange={handelOnChange}
            id="password"
            className="bg-[#27272a] py-2 w-11/12 px-3 text-base rounded focus:outline-none placeholder:text-white-[0.5]"
            placeholder="password"
          />
        </div>
        <div className="py-6 pb-4 flex justify-start mt-2 gap-4">
          <Button
            type={"submit"}
            variant="secondary"
            className="px-8 py-3 text-center mr-5 bg-white/[0.8]  text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Log in
              </>
            ) : (
              "Log in"
            )}
          </Button>
          <Link to="/signup">
            <Button type="button" variant={"link"} className="text-white">
              Sign up
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
