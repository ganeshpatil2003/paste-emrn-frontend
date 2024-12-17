import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetUserQuery,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/features/apis/userApi";
import LoadinSpinner from "@/components/LoadinSpinner";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {

  const { data, isLoading, error, refetch } = useGetUserQuery();


  const [
    updateAvatar,
    {
      data: avatarData,
      isLoading: avatarIsLoading,
      isError: avatarIsError,
      isSuccess: avatarIsSuccess,
    },
  ] = useUpdateAvatarMutation();


  const [
    updateUser,
    {
      data: userData,
      isSuccess: userIsSuccess,
      isError: userIsError,
      isLoading: userIsLoading,
    },
  ] = useUpdateUserMutation();

  const [username,setUsername] = useState('');
  const [avatar,setAvatar] = useState(null);

  useEffect(() => {
    if (userIsSuccess){ refetch(); toast.success("Username updated");}
    if (userIsError) toast.error("Error while updating username");
    if (avatarIsError) toast.error("Error while updating photo");
    if (avatarIsSuccess) {refetch();toast.success("Photo updated");}
  }, [userIsSuccess, userIsError, avatarIsError, avatarIsSuccess]);

  const handelClickAvatar = async() => {
    const formData = new FormData();
    formData.append('avatar',avatar)
      await updateAvatar(formData)
  }

  const handelClickUpdate = async() => {
    await updateUser({username:username})
  }

  if (isLoading)
    return (
      <>
        <LoadinSpinner />
      </>
    );


  if (error) return <div className="m-auto"> {error.data.message}</div>;


  const user = data?.data;
  

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="max-w-4xl mx-auto flex items-center gap-10 border border-[#333333] rounded-lg p-20">
        <div className="flex items-center">
          <Avatar className="h-36 w-36 ">
            <AvatarImage
              src={
                user?.avatar ? user?.avatar : "https://github.com/shadcn.png"
              }
              className="bg-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-start items-start flex-col space-y-2 py-10">
          <p className="text-lg font-normal">
            Username :{" "}
            <span className="text-indigo-400 italic">{user.username}</span>
          </p>
          <p className="text-lg font-normal">
            Email : <span className="text-indigo-400 italic">{user.email}</span>
          </p>
          <div className="flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Update username</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#191919]">
                <DialogHeader className={"text-[#EEEEF0]"}>
                  <DialogTitle>Update username</DialogTitle>
                  <DialogDescription>
                    Make changes to your username here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4  text-[#EEEEF0]">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      placeholder="Enter username to change.."
                      className="col-span-3"
                      onChange = {(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                  disabled = {userIsLoading}
                    type="button"
                    variant={"primary"}
                    className="bg-[#EEEEF0]"
                    onClick = {handelClickUpdate}
                  >
                   {userIsLoading?<><Loader2 className='animate-spin h-4 w-4 mr-2'/>Save changes</>:' Save changes'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Update photo</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#191919]">
                <DialogHeader className={"text-[#EEEEF0]"}>
                  <DialogTitle>Update photo</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile photo. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4  text-[#EEEEF0]">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="avatar" className="text-right">
                      Photo
                    </Label>
                    <Input
                      id="avatar"
                    
                      type="file"
                      accept = 'image/*'
                      onChange = {(e) => setAvatar(e.target.files[0])}
                      className="col-span-3 placeholder:text-[#EEEEF0] text-[#EEEEF0]"
                    />
                  </div>
                </div>
                underline-[#EEEEF0]
                <DialogFooter>
                  <Button
                  disabled = {avatarIsLoading}
                    type="button"
                    onClick={handelClickAvatar}
                    variant={"primary"}
                    className="text-[#EEEEF0] "
                  >
                    {avatarIsLoading ? <><Loader2 className='animate-spin h-4 w-4 mr-2'/>Update photo</> :'Update photo'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
