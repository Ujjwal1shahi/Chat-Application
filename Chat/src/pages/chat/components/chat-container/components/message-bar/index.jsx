import EmojiPicker from "emoji-picker-react";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useAppStore } from "../../../../../../store";
import { useSocket } from "../../../../../../context/SocketContext";

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 20px rgba(167,139,250,0.45)";

const ff = { fontFamily: "'Outfit', sans-serif" };

const MessageBar = () => {
  const emojiRef = useRef();
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const getUserId = (value) =>
    typeof value === "string" ? value : value?._id || value?.id;

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    const senderId = getUserId(userInfo);
    const recipientId = getUserId(selectedChatData);

    if (
      !socket ||
      selectedChatType !== "contact" ||
      !senderId ||
      !recipientId ||
      !trimmedMessage
    ) {
      return;
    }

    socket.emit("sendMessage", {
      sender: senderId,
      content: trimmedMessage,
      recipient: recipientId,
      messageType: "text",
      fileUrl: undefined,
    });
    setMessage("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .msgbar-icon-btn {
          transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
          border-radius: 12px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.09);
          flex-shrink: 0;
        }
        .msgbar-icon-btn:hover {
          transform: scale(1.12);
          background: rgba(167,139,250,0.18) !important;
          box-shadow: 0 0 0 1px rgba(167,139,250,0.35), 0 4px 14px rgba(167,139,250,0.2) !important;
        }
        .msgbar-icon-btn:active {
          transform: scale(0.94);
        }

        .msgbar-send-btn {
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
          flex-shrink: 0;
        }
        .msgbar-send-btn:hover {
          transform: scale(1.08);
          filter: brightness(1.15);
          box-shadow: 0 6px 28px rgba(167,139,250,0.6) !important;
        }
        .msgbar-send-btn:active {
          transform: scale(0.95);
        }

        .msgbar-input::placeholder {
          color: rgba(148,163,184,0.45);
          font-family: 'Outfit', sans-serif;
        }
        .msgbar-input:focus {
          outline: none;
        }

        /* Emoji picker dark glass overrides */
        .EmojiPickerReact {
          --epr-bg-color: rgba(12,12,22,0.98) !important;
          --epr-category-label-bg-color: rgba(12,12,22,0.95) !important;
          --epr-hover-bg-color: rgba(167,139,250,0.15) !important;
          --epr-focus-bg-color: rgba(167,139,250,0.2) !important;
          --epr-search-input-bg-color: rgba(255,255,255,0.06) !important;
          --epr-search-input-border-color: rgba(255,255,255,0.1) !important;
          --epr-search-input-text-color: #e2e8f0 !important;
          --epr-text-color: #94a3b8 !important;
          border: 1px solid rgba(255,255,255,0.09) !important;
          border-radius: 20px !important;
          box-shadow: 0 24px 60px rgba(0,0,0,0.7) !important;
          backdrop-filter: blur(20px) !important;
        }
      `}</style>

      <div
        className="h-[10vh] min-h-[68px] flex items-center px-4 sm:px-5 gap-3 mx-3 mb-3 rounded-2xl"
        style={{
          background: "rgba(10,10,20,0.65)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 -4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          ...ff,
        }}
      >
        {/* ── Input row ── */}
        <div
          className="flex-1 flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {/* Text input */}
          <input
            type="text"
            className="msgbar-input flex-1 bg-transparent text-sm text-slate-200 py-2 px-1"
            placeholder="Type a message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            style={ff}
          />

          {/* Attachment */}
          <button
            className="msgbar-icon-btn focus:outline-none"
            aria-label="Attach file"
          >
            <GrAttachment style={{ fontSize: "15px", color: "#94a3b8" }} />
          </button>

          {/* Emoji */}
          <div className="relative" ref={emojiRef}>
            <button
              className="msgbar-icon-btn focus:outline-none"
              onClick={() => setEmojiPickerOpen((v) => !v)}
              aria-label="Emoji picker"
            >
              <RiEmojiStickerLine
                style={{
                  fontSize: "17px",
                  color: emojiPickerOpen ? "#a78bfa" : "#94a3b8",
                  transition: "color 0.2s",
                }}
              />
            </button>

            {/* Emoji picker popup */}
            <div className="absolute bottom-14 right-0 z-50">
              <EmojiPicker
                theme="dark"
                open={emojiPickerOpen}
                onEmojiClick={handleAddEmoji}
                onClickOutside={() => setEmojiPickerOpen(false)}
                autoFocusSearch={false}
              />
            </div>
          </div>
        </div>

        {/* ── Send button ── */}
        <button
          className="msgbar-send-btn w-11 h-11 rounded-2xl flex items-center justify-center text-white focus:outline-none"
          style={{
            background: primaryGrad,
            boxShadow: primaryShadow,
          }}
          onClick={handleSendMessage}
          aria-label="Send message"
        >
          <IoSend style={{ fontSize: "17px" }} />
        </button>
      </div>
    </>
  );
};

export default MessageBar;