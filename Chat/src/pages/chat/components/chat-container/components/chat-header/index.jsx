import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { useAppStore } from "../../../../../../store";
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar";
import { getColor } from "../../../../../../lib/utils";
import { HOST } from "../../../../../../utils/constants";

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 20px rgba(167,139,250,0.35)";

const ff = { fontFamily: "'Outfit', sans-serif" };

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

        .chat-header-close-btn {
          transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
        }
        .chat-header-close-btn:hover {
          transform: scale(1.12) rotate(90deg);
          background: rgba(244,114,182,0.15) !important;
          box-shadow: 0 0 0 1px rgba(244,114,182,0.35), 0 4px 14px rgba(244,114,182,0.2) !important;
        }
        .chat-header-close-btn:active {
          transform: scale(0.95);
        }
      `}</style>

      <div
        className="h-[10vh] min-h-[64px] flex items-center justify-between px-5 sm:px-8"
        style={{
          background: "rgba(10,10,20,0.65)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          ...ff,
        }}
      >
        {/* ── Left: Avatar + Name ── */}
        <div className="flex items-center gap-3.5">

          {/* Avatar with gradient ring */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute rounded-2xl"
              style={{
                inset: -2,
                background: primaryGrad,
                borderRadius: "16px",
                opacity: 0.7,
                zIndex: 0,
              }}
            />
            <Avatar className="relative z-10 h-11 w-11 rounded-[14px] overflow-hidden block">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full"
                  style={{ background: "#0f0f1a" }}
                />
              ) : (
                <div
                  className={`uppercase h-11 w-11 text-sm font-bold flex items-center justify-center rounded-[14px] ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>

          {/* Name */}
          <div className="flex flex-col min-w-0">
            <span
              className="text-sm font-semibold text-white leading-tight truncate"
              style={ff}
            >
              {selectedChatType === "contact" && selectedChatData.firstName
                ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                : selectedChatData.email}
            </span>
          </div>
        </div>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-2">
          {/* Close button */}
          <button
            onClick={closeChat}
            className="chat-header-close-btn w-9 h-9 rounded-xl flex items-center justify-center focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
            aria-label="Close chat"
          >
            <RiCloseFill style={{ fontSize: "18px", color: "#f472b6" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;