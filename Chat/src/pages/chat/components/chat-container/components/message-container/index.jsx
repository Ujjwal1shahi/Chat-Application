import React from "react";
import moment from "moment";
import { useEffect, useRef } from "react";
import { useAppStore } from "../../../../../../store";

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";

const ff = { fontFamily: "'Outfit', sans-serif" };

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages } =
    useAppStore();

  const getUserId = (value) =>
    typeof value === "string" ? value : value?._id || value?.id;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id}>
          {/* ── Date separator ── */}
          {showDate && (
            <div className="flex items-center gap-3 my-5">
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(167,139,250,0.10)",
                  border: "1px solid rgba(167,139,250,0.2)",
                  color: "rgba(148,163,184,0.7)",
                  ...ff,
                }}
              >
                {moment(message.timestamp).format("LL")}
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
            </div>
          )}

          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    if (!message || !selectedChatData) return null;

    const isOwn = getUserId(message.sender) === getUserId(userInfo);

    return (
      <div
        className={`flex flex-col mb-1 ${isOwn ? "items-end" : "items-start"}`}
        style={ff}
      >
        {message.messageType === "text" && (
          <div
            className="relative inline-block px-4 py-2.5 max-w-[55%] break-words text-sm leading-relaxed"
            style={
              isOwn
                ? {
                    // Own message — gradient bubble
                    background: primaryGrad,
                    color: "#ffffff",
                    borderRadius: "18px 18px 4px 18px",
                    boxShadow: "0 4px 16px rgba(167,139,250,0.35)",
                  }
                : {
                    // Other message — glass bubble
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "#e2e8f0",
                    borderRadius: "18px 18px 18px 4px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                  }
            }
          >
            {message.content}
          </div>
        )}

        {/* Timestamp */}
        <span
          className="text-[10px] mt-1 px-1"
          style={{ color: "rgba(100,116,139,0.7)", ...ff }}
        >
          {moment(message.timestamp).format("LT")}
        </span>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        /* Custom scrollbar */
        .msg-scroll::-webkit-scrollbar { width: 4px; }
        .msg-scroll::-webkit-scrollbar-track { background: transparent; }
        .msg-scroll::-webkit-scrollbar-thumb {
          background: rgba(167,139,250,0.2);
          border-radius: 99px;
        }
        .msg-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(167,139,250,0.4);
        }
      `}</style>

      <div
        className="msg-scroll flex-1 overflow-y-auto p-4 px-6 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full"
        style={{
          background: "transparent",
          ...ff,
        }}
      >
        {renderMessages()}
        <div ref={scrollRef} />
      </div>
    </>
  );
};

export default MessageContainer;