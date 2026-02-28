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
import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  UPDATE_PROFILE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";
import { apiClient } from "@/lib/api-client";

// ─── Theme tokens (matching NexChat landing page) ────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 24px rgba(167,139,250,0.45)";

const glass = {
  background: "rgba(15,15,25,0.45)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow:
    "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
};

const glassInput = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25)",
};

const glassIcon = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.11)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
};

const gradientText = {
  background: primaryGrad,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const ff = { fontFamily: "'Outfit', sans-serif" };

// ─── Profile Component ───────────────────────────────────────────────────────
function Profile() {
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
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First name is required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last name is required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo(response.data);
          toast.success("Profile updated successfully.");
          setTimeout(() => navigate("/chat"), 100);
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
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please complete your profile first.");
      navigate("/auth");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success("Profile image updated successfully.");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image removed successfully.");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while removing image.");
    }
  };

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        /* Animated background blobs */
        @keyframes blob1 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,60px) scale(1.12); } }
        @keyframes blob2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px,40px) scale(1.08); } }

        /* Input overrides */
        .nexchat-input {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          color: #e2e8f0 !important;
          font-family: 'Outfit', sans-serif !important;
          border-radius: 14px !important;
          padding: 14px 18px !important;
          font-size: 14px !important;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.25) !important;
        }
        .nexchat-input:focus {
          outline: none !important;
          border-color: rgba(167,139,250,0.55) !important;
          box-shadow: 0 0 0 3px rgba(167,139,250,0.15), inset 0 2px 8px rgba(0,0,0,0.2) !important;
        }
        .nexchat-input::placeholder {
          color: rgba(148,163,184,0.6) !important;
        }
        .nexchat-input:disabled {
          opacity: 0.45 !important;
          cursor: not-allowed !important;
        }
      `}</style>

      {/* ── Page wrapper ── */}
      <div
        className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0a14 0%, #0f0a1e 50%, #0a0f1e 100%)",
          ...ff,
        }}
      >
        {/* Ambient blobs */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 560, height: 560,
            top: -160, right: -80,
            background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "blob1 12s ease-in-out infinite alternate",
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 460, height: 460,
            bottom: -100, left: -80,
            background: "radial-gradient(circle, rgba(110,231,247,0.14) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "blob2 10s ease-in-out infinite alternate",
          }}
        />

        {/* ── Card ── */}
        <div
          className="relative w-full max-w-xl rounded-3xl p-8 sm:p-10"
          style={glass}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
            style={{ background: primaryGrad, opacity: 0.7 }}
          />

          {/* ── Header ── */}
          <div className="flex items-center gap-4 mb-8">
            {/* Back button */}
            <button
              onClick={handleNavigate}
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
              style={glassIcon}
            >
              <IoArrowBack className="text-xl text-white/80" />
            </button>

            <div>
              <h1
                className="text-xl font-extrabold"
                style={{ ...gradientText, ...ff }}
              >
                {userInfo?.profileSetup ? "Your Profile" : "Set Up Profile"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5" style={ff}>
                {userInfo?.profileSetup
                  ? "Manage your personal information"
                  : "Complete your profile to get started"}
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="w-full h-px mb-8"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />

          {/* ── Avatar + Fields ── */}
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">

            {/* Avatar */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div
                className="relative flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {/* Gradient ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: -3,
                    background: primaryGrad,
                    padding: 2,
                    borderRadius: "9999px",
                    opacity: hovered ? 1 : 0.6,
                    transition: "opacity 0.2s",
                  }}
                />

                <Avatar className="relative h-28 w-28 rounded-full overflow-hidden z-10">
                  {image ? (
                    <AvatarImage
                      src={image}
                      alt="profile"
                      className="object-cover w-full h-full"
                      style={{ background: "#0f0f1a" }}
                    />
                  ) : (
                    <div
                      className={`uppercase h-28 w-28 text-4xl border-0 flex items-center justify-center rounded-full font-extrabold ${getColor(selectedColor)}`}
                    >
                      {firstName
                        ? firstName.split("").shift()
                        : userInfo.email.split("").shift()}
                    </div>
                  )}
                </Avatar>

                {/* Hover overlay */}
                {hovered && (
                  <div
                    onClick={image ? handleDeleteImage : handleFileInputClick}
                    className="absolute z-20 h-28 w-28 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {image ? (
                      <FaTrash className="text-white text-2xl" />
                    ) : (
                      <FaPlus className="text-white text-2xl" />
                    )}
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 text-center" style={ff}>
                {image ? "Hover to remove" : "Hover to upload"}
              </p>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                name="profile-image"
                accept=".png, .jpg, .jpeg, .svg, .webp"
              />
            </div>

            {/* Fields */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              {/* Email (disabled) */}
              <div className="relative">
                <label
                  className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest"
                  style={ff}
                >
                  Email
                </label>
                <Input
                  placeholder="Email"
                  type="email"
                  disabled
                  value={userInfo.email}
                  className="nexchat-input w-full"
                />
              </div>

              {/* First Name */}
              <div className="relative">
                <label
                  className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest"
                  style={ff}
                >
                  First Name
                </label>
                <Input
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="nexchat-input w-full"
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <label
                  className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest"
                  style={ff}
                >
                  Last Name
                </label>
                <Input
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="nexchat-input w-full"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label
                  className="block text-xs font-semibold text-slate-500 mb-2.5 uppercase tracking-widest"
                  style={ff}
                >
                  Profile Color
                </label>
                <div className="flex gap-3">
                  {colors.map((colorClass, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`h-8 w-8 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${colorClass}`}
                      style={
                        selectedColor === index
                          ? {
                              boxShadow: `0 0 0 2px rgba(15,15,25,1), 0 0 0 4px rgba(167,139,250,0.8)`,
                              transform: "scale(1.15)",
                            }
                          : { boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="w-full h-px my-8"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />

          {/* ── Save Button ── */}
          <Button
            className="w-full h-14 text-sm font-bold text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:brightness-110 border-0"
            style={{
              background: primaryGrad,
              boxShadow: primaryShadow,
              fontFamily: "'Outfit', sans-serif",
              fontSize: "15px",
              letterSpacing: "0.02em",
            }}
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}

export default Profile;