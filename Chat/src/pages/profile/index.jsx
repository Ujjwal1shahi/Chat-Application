import { useAppStore } from "@/store";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { colors } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ADD_PROFILE_IMAGE_ROUTE, HOST, UPDATE_PROFILE_ROUTE, REMOVE_PROFILE_IMAGE_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";



function Profile() {
  // const {userInfo} = useAppStore();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);      
    }

    if(userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);
  
  const validateProfile = () => {
    if(!firstName) {
      toast.error("First name is required.");
      return false;
    }
    if(!lastName) {
      toast.error("Last name is required.");
      return false;
    }

    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {
          firstName,
          lastName,
          color: selectedColor,
        }, { withCredentials: true });
  
        if (response.status === 200 && response.data) {
          setUserInfo(response.data);
          
          toast.success("Profile updated successfully.");
          setTimeout(() => {
            navigate("/chat");
          }, 100);
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error) {
        console.error("API error:", error);
        toast.error("An error occurred while saving changes.");
      }
    }
  };

  const handleNavigate = () => {
    if(userInfo.profileSetup) {
      navigate("/chat");
    }
    else {
      toast.error("Please complete your profile first.");
      navigate("/auth");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log({file});

    if(file){
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });

      if(response.status === 200 && response.data.image){
        setUserInfo({...userInfo, image: response.data.image});
        toast.success("Profile image updated successfully.");
      }
      // const reader = new FileReader();
      // reader.onload= (e) => {
      //   setImage(reader.result);
      // };
      // reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async () => {
    try{
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });

      if(response.status === 200){
        setUserInfo({...userInfo, image: null});
        toast.success("Image removed successfully.");
        setImage(null);
      }
    }catch(error){
      console.log(error);
      toast.error("An error occurred while removing image.");
    }
  }
  
  return (
    // https://w0.peakpx.com/wallpaper/647/331/HD-wallpaper-anonymous-mask-profile-dark.jpg
    <div className=" bg-[#1c1e2b] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max border-2 p-12 border-white/10 text-opacity-90 shadow-2xl rounded-3xl bg-[#1c1e2b] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]">
      <h1 className="flex items-center justify-center text-white/60 text-lg">{userInfo?.profileSetup ? "Profile Status" : "Fill Your Profile Details"}</h1>
      <div className="w-full h-px bg-white/20" />
        <div onClick={handleNavigate} className="w-10">
          <IoArrowBack className="text-3xl lg:text-4xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 sm:w-48 sm:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-28 w-28 sm:h-40 sm:w-40 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-28 w-28  sm:w-40 sm:h-40 text-5xl sm:text-6xl border-[3px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div onClick={image ? handleDeleteImage : handleFileInputClick} className="absolute w-28 h-28 sm:w-40 sm:h-40 overflow-hidden flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input type='file' ref={fileInputRef} className="hidden" onChange={handleImageChange} name="profile-image" accept=".png, .jpg, .jpeg, .svg, .webp"/>
          </div>

          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((colors, index) => (
                <div
                  className={`${colors} h-8 w-8 rounded-full border-[2px] cursor-pointer transition-all duration-200 
                 ${
                   selectedColor === index
                     ? "outline outline-white/80 outline-3"
                     : " "
                 } `}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 sm:h-14 w-full sm:text-md bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
