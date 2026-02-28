import React from "react";
import ProfileInfo from "./components/profile-info";
import NewDm from "./components/new-dm";

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 20px rgba(167,139,250,0.4)";

const ff = { fontFamily: "'Outfit', sans-serif" };

const gradientText = {
  background: primaryGrad,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── ContactsContainer ────────────────────────────────────────────────────────
function ContactsContainer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        .contacts-sidebar {
          background: linear-gradient(180deg, #0a0a14 0%, #0f0a1e 100%);
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
        }

        /* Custom scrollbar for sidebar */
        .contacts-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .contacts-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .contacts-scroll::-webkit-scrollbar-thumb {
          background: rgba(167,139,250,0.25);
          border-radius: 99px;
        }
        .contacts-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(167,139,250,0.45);
        }

        /* Section divider */
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
          margin: 0 16px;
        }
      `}</style>

      <div
        className="contacts-sidebar relative md:w-[35vw] lg:w-[30vw] xl:w-[22vw] w-full"
        style={ff}
      >
        {/* ── Logo ── */}
        <Logo />

        {/* ── Divider ── */}
        <div className="section-divider" />

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto contacts-scroll">

          {/* Direct Messages */}
          <div className="mt-5 mb-2">
            <div className="flex items-center justify-between px-4">
              <Title text="Direct Messages" />
              <NewDm />
            </div>
          </div>

          {/* Channels */}
          <div className="mt-5 mb-2">
            <div className="flex items-center justify-between px-4">
              <Title text="Channels" />
            </div>
          </div>

        </div>

        {/* ── Profile Info pinned at bottom ── */}
        <div className="section-divider mb-1" />
        <ProfileInfo />
      </div>
    </>
  );
}

export default ContactsContainer;

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      {/* Gradient icon mark */}
      <div
        className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background: primaryGrad,
          boxShadow: primaryShadow,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      </div>

      {/* Brand name */}
      <span
        className="text-xl font-extrabold tracking-tight"
        style={{ ...gradientText, ...ff }}
      >
        NexChat
      </span>
    </div>
  );
};

// ─── Section Title ────────────────────────────────────────────────────────────
const Title = ({ text }) => {
  return (
    <div className="flex items-center gap-2 pl-2">
      {/* Accent dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: primaryGrad,
          boxShadow: "0 0 6px rgba(167,139,250,0.6)",
        }}
      />
      <h6
        className="uppercase tracking-widest text-xs font-semibold"
        style={{ color: "rgba(148,163,184,0.55)", ...ff }}
      >
        {text}
      </h6>
    </div>
  );
};