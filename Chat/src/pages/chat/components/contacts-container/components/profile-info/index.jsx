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

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";

const glassCard = {
  background: "rgba(15,15,25,0.55)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const glassIconBtn = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
};

const ff = { fontFamily: "'Outfit', sans-serif" };

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const logOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(undefined);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        .profile-info-icon-btn {
          transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
        }
        .profile-info-icon-btn:hover {
          transform: scale(1.12);
          background: rgba(167,139,250,0.18) !important;
          box-shadow: 0 0 0 1px rgba(167,139,250,0.35), 0 4px 14px rgba(167,139,250,0.2) !important;
        }
        .profile-info-icon-btn:active {
          transform: scale(0.95);
        }
      `}</style>

      <div
        className="w-full px-3 pb-3 pt-1"
        style={ff}
      >
        {/* ── Glass bar ── */}
        <div
          className="relative flex items-center justify-between px-3 py-2.5 rounded-2xl overflow-hidden"
          style={glassCard}
        >
          {/* Subtle top accent line */}
          <div
            className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
            style={{ background: primaryGrad, opacity: 0.4 }}
          />

          {/* ── Left: Avatar + Name ── */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar with gradient ring */}
            <div className="relative flex-shrink-0">
              {/* Gradient ring */}
              <div
                className="absolute rounded-2xl"
                style={{
                  inset: -2,
                  background: primaryGrad,
                  borderRadius: "14px",
                  opacity: 0.75,
                  zIndex: 0,
                }}
              />
              <Avatar className="relative z-10 h-10 w-10 rounded-[12px] overflow-hidden">
                {userInfo.image ? (
                  <AvatarImage
                    src={`${HOST}/${userInfo.image}`}
                    alt="profile"
                    className="object-cover w-full h-full"
                    style={{ background: "#0f0f1a" }}
                  />
                ) : (
                  <div
                    className={`uppercase h-10 w-10 text-sm font-bold flex items-center justify-center rounded-[12px] ${getColor(
                      userInfo.color
                    )}`}
                  >
                    {userInfo.firstName
                      ? userInfo.firstName.split("").shift()
                      : userInfo.email.split("").shift()}
                  </div>
                )}
              </Avatar>

              {/* Online indicator */}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 z-20"
                style={{
                  background: "#34D399",
                  borderColor: "#0a0a14",
                }}
              />
            </div>

            {/* Name + email hint */}
            <div className="min-w-0">
              <p
                className="text-sm font-semibold text-white truncate leading-tight"
                style={ff}
              >
                {userInfo.firstName && userInfo.lastName
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : userInfo.email}
              </p>
              {userInfo.firstName && (
                <p
                  className="text-xs truncate leading-tight mt-0.5"
                  style={{ color: "rgba(148,163,184,0.55)", ...ff }}
                >
                  {userInfo.email}
                </p>
              )}
            </div>
          </div>

          {/* ── Right: Action buttons ── */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {/* Edit Profile */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => navigate("/profile")}
                    className="profile-info-icon-btn w-8 h-8 rounded-xl flex items-center justify-center"
                    style={glassIconBtn}
                    aria-label="Edit profile"
                  >
                    <FiEdit2
                      style={{
                        fontSize: "15px",
                        color: "#a78bfa",
                      }}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="text-xs font-medium rounded-xl border-0 px-3 py-1.5"
                  style={{
                    background: "rgba(15,15,25,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Edit Profile
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Logout */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={logOut}
                    className="profile-info-icon-btn w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      ...glassIconBtn,
                    }}
                    aria-label="Logout"
                  >
                    <IoLogOut
                      style={{
                        fontSize: "17px",
                        color: "#f472b6",
                      }}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  className="text-xs font-medium rounded-xl border-0 px-3 py-1.5"
                  style={{
                    background: "rgba(15,15,25,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Logout
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
