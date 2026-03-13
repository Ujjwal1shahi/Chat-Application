import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import { animationData, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppStore } from "../../../../../../store";
import { HOST } from "../../../../../../utils/constants";

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 20px rgba(167,139,250,0.4)";

const glassIconBtn = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
};

const ff = { fontFamily: "'Outfit', sans-serif" };

const NewDm = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.trim().length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContect = (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .newdm-trigger-btn {
          transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
        }
        .newdm-trigger-btn:hover {
          transform: scale(1.12) rotate(90deg);
          background: rgba(167,139,250,0.2) !important;
          box-shadow: 0 0 0 1px rgba(167,139,250,0.4), 0 4px 14px rgba(167,139,250,0.25) !important;
        }
        .newdm-trigger-btn:active {
          transform: scale(0.95) rotate(90deg);
        }

        /* ── FIX: left padding accounts for the search icon (16px icon + 12px gap + 14px base = 42px) ── */
        .newdm-input {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          color: #e2e8f0 !important;
          font-family: 'Outfit', sans-serif !important;
          border-radius: 14px !important;
          padding: 14px 18px 14px 42px !important;
          font-size: 14px !important;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.2) !important;
          width: 100%;
        }
        .newdm-input:focus {
          outline: none !important;
          border-color: rgba(167,139,250,0.55) !important;
          box-shadow: 0 0 0 3px rgba(167,139,250,0.15), inset 0 2px 8px rgba(0,0,0,0.15) !important;
        }
        .newdm-input::placeholder {
          color: rgba(148,163,184,0.45) !important;
        }

        .contact-row {
          transition: background 0.18s ease, transform 0.15s ease;
          border-radius: 14px;
          padding: 8px 10px;
          cursor: pointer;
        }
        .contact-row:hover {
          background: rgba(167,139,250,0.10);
          transform: translateX(3px);
        }
        .contact-row:active {
          transform: scale(0.98);
        }

        .newdm-scroll::-webkit-scrollbar { width: 4px; }
        .newdm-scroll::-webkit-scrollbar-track { background: transparent; }
        .newdm-scroll::-webkit-scrollbar-thumb {
          background: rgba(167,139,250,0.25);
          border-radius: 99px;
        }
        .newdm-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(167,139,250,0.45);
        }
      `}</style>

      {/* ── Trigger button ── */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="newdm-trigger-btn w-7 h-7 rounded-xl flex items-center justify-center"
              style={glassIconBtn}
              onClick={() => setOpenNewContactModal(true)}
              aria-label="New direct message"
            >
              <FaPlus style={{ fontSize: "11px", color: "#a78bfa" }} />
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
            New Direct Message
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* ── Dialog ── */}
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent
          className="border-0 p-0 overflow-hidden w-[420px] max-w-[95vw]"
          style={{
            background: "rgba(12,12,22,0.97)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            borderRadius: "24px",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {/* Top gradient accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
            style={{ background: primaryGrad, opacity: 0.75 }}
          />

          <div className="px-6 pt-7 pb-6 flex flex-col gap-5" style={{ minHeight: "420px" }}>

            {/* ── Header ── */}
            <DialogHeader className="gap-1">
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: primaryGrad, boxShadow: primaryShadow }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01M12 10h.01M16 10h.01" />
                  </svg>
                </div>
                <div>
                  <DialogTitle className="text-white font-bold text-base leading-tight" style={ff}>
                    New Direct Message
                  </DialogTitle>
                  <DialogDescription className="text-xs mt-0.5" style={{ color: "rgba(148,163,184,0.5)", ...ff }}>
                    Search for a contact to start chatting
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* ── Search input ── */}
            {/*
              The icon is positioned absolute at left-3.5 (14px from left edge).
              The input has padding-left: 42px in .newdm-input CSS so text
              starts after the icon with comfortable breathing room.
              Do NOT add pl-* Tailwind classes — they get overridden by !important.
            */}
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="rgba(148,163,184,0.5)" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              {/* No pl-* class here — padding is handled by .newdm-input padding-left: 42px */}
              <Input
                placeholder="Search by name or email…"
                className="newdm-input"
                onChange={(e) => searchContacts(e.target.value)}
              />
            </div>

            {/* ── Results ── */}
            {searchedContacts.length > 0 ? (
              <ScrollArea className="flex-1 newdm-scroll" style={{ maxHeight: "260px" }}>
                <div className="flex flex-col gap-1 pr-1">
                  {searchedContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="contact-row flex items-center gap-3"
                      onClick={() => selectNewContect(contact)}
                    >
                      {/* Avatar with gradient ring */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="absolute rounded-2xl"
                          style={{
                            inset: -2,
                            background: primaryGrad,
                            borderRadius: "14px",
                            opacity: 0.6,
                            zIndex: 0,
                          }}
                        />
                        <Avatar className="relative z-10 h-11 w-11 rounded-[12px] overflow-hidden block">
                          {contact.image ? (
                            <AvatarImage
                              src={`${HOST}/${contact.image}`}
                              alt="profile"
                              className="object-cover w-full h-full"
                              style={{ background: "#0f0f1a", borderRadius: "12px" }}
                            />
                          ) : (
                            <div
                              className={`uppercase h-11 w-11 text-sm font-bold flex items-center justify-center rounded-[12px] ${getColor(contact.color)}`}
                            >
                              {contact.firstName
                                ? contact.firstName.split("").shift()
                                : contact.email.split("").shift()}
                            </div>
                          )}
                        </Avatar>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-white truncate" style={ff}>
                          {contact.firstName && contact.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : contact.email}
                        </span>
                        <span className="text-xs truncate" style={{ color: "rgba(148,163,184,0.5)", ...ff }}>
                          {contact.email}
                        </span>
                      </div>

                      {/* Arrow hint */}
                      <div className="ml-auto flex-shrink-0 opacity-40">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              /* ── Empty state ── */
              <div className="flex flex-1 items-center justify-center py-4">
                <div className="flex flex-col items-center text-center gap-4">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    style={{ height: 130, width: 130 }}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1" style={ff}>
                      Find someone to chat
                    </h3>
                    <p className="text-xs" style={{ color: "rgba(148,163,184,0.45)", ...ff }}>
                      Type a name or email to search contacts
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {["⚡ Fast", "🔒 Secure", "🤖 Smart"].map((label, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{
                          background: "rgba(167,139,250,0.10)",
                          border: "1px solid rgba(167,139,250,0.2)",
                          color: "#a78bfa",
                          ...ff,
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;