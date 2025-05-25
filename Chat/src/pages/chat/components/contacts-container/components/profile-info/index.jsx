import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const logOut = async () => {
    try{
      const response = await apiClient.post(LOGOUT_ROUTE, {}, {withCredentials: true});

      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    }catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out.");
    }
  }

  return (
    <div style={{ fontFamily: 'Delius, cursive' }}
   className="absolute bottom-0 h-16 flex items-center justify-between p-4 w-full  mb-3">
    <div className="flex items-center justify-between w-full bg-[#2a2b33] rounded-3xl px-3 py-2 mb-5 text-white/70">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-2xl overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><FiEdit2 
            onClick={() => navigate('/profile')}
            className="text-gray-500 hover:text-gray-400 text-xl font-medium transition-all duration-300" /></TooltipTrigger>
            <TooltipContent className="bg-[#121212] text-white text-sm font-normal border-none">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><IoLogOut 
            onClick={logOut}
            className="text-gray-500 hover:text-gray-400 text-2xl font-medium transition-all duration-300" /></TooltipTrigger>
            <TooltipContent className="bg-[#121212] text-white text-sm font-normal border-none">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
