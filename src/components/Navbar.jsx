import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetUserQuery, useLogOutMutation } from "@/features/apis/userApi";
import { useSelector } from "react-redux";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const {data} = useGetUserQuery()
  const [logOut,{data:logOutData,isSuccess,isError,isLoading,error}] = useLogOutMutation();
  const handelLogOut =async() => {
    await logOut();
  }
 useEffect(() => {
  if(isSuccess){
    toast.success(logOutData.message);
    navigate('/signin'); 
  }
  if(isError){
    toast.error(error.data.message);
  }
 } ,[isSuccess,isError])
  const {user} =useSelector(state => state.user)

  return (
    <>
      {user ? (
        <div className="min-h-20 min-w-full bg-[rgb(15,15,15)] shadow-lg  shadow-[#6674CC40] py-auto flex items-center justify-center gap-12 relative z-[10]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl font-semibold cursor-pointer hover:text-[#6674cc] duration-300 transition-text ${
                isActive && "text-[#6674cc]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-xl font-semibold cursor-pointer hover:text-[#6674cc] duration-300 transition-text ${
                isActive && "text-[#6674cc]"
              }`
            }
          >
            Pastes
          </NavLink>

          <div className="absolute right-32">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to='/profile'>Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem ><div onClick={handelLogOut} aria-disabled={isLoading} className='flex items-center gap-10 w-full'><div>{isLoading ? <><Loader2 className="w-4 h-4 animate-spin"/>Log out</>:'Log out'}</div> <div><LogOut size={15}/></div></div></DropdownMenuItem>
                </DropdownMenuGroup>
               
               
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className="min-h-20 min-w-full bg-[rgb(15,15,15)] shadow-lg  shadow-[#6674CC40] py-auto  pr-20 flex items-center justify-end gap-5 relative z-[100]">
          {/* <button className="text-lg font-semibold py-2 px-4 rounded bg-[#6674cc]">Sign in</button>
                <button className="text-lg font-semibold py-2 px-4 rounded bg-[#6674cc]">Sign up</button> */}
          <Link to='/signin'><Button variant={"primary"}>Sign in</Button></Link>
          <Link to = '/signup'><Button variant={"secondary"}>Sign up</Button></Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
