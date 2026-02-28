import { animationDefaultOptions } from "@/lib/utils";
import React from "react";
import Lottie from "react-lottie";

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 24px rgba(167,139,250,0.45)";

const gradientText = {
  background: primaryGrad,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const ff = { fontFamily: "'Outfit', sans-serif" };

function EmptyChatContainer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobA {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px,40px) scale(1.1); }
        }
        @keyframes blobB {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-25px,35px) scale(1.08); }
        }

        .empty-chat-lottie {
          animation: floatY 4s ease-in-out infinite;
        }
        .empty-chat-heading {
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .empty-chat-sub {
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }
        .empty-chat-pills {
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both;
        }
      `}</style>

      <div
        className="flex-1 hidden md:flex flex-col justify-center items-center relative overflow-hidden transition-all duration-1000"
        style={{
          background: "linear-gradient(160deg, #0a0a14 0%, #0f0a1e 55%, #0a0f1e 100%)",
          ...ff,
        }}
      >
        {/* ── Ambient background blobs ── */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 480, height: 480,
            top: -120, right: -80,
            background: "radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "blobA 13s ease-in-out infinite alternate",
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 400, height: 400,
            bottom: -80, left: -60,
            background: "radial-gradient(circle, rgba(110,231,247,0.11) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "blobB 10s ease-in-out infinite alternate",
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 320, height: 320,
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">

          {/* Lottie — floating
          <div className="empty-chat-lottie">
            <Lottie
              isClickToPauseDisabled={true}
              height={200}
              width={200}
              options={animationDefaultOptions}
            />
          </div> */}

          {/* Logo mark */}
          <div
            className="w-14 h-14 rounded-3xl flex items-center justify-center -mt-2"
            style={{ background: primaryGrad, boxShadow: primaryShadow }}
          >
            <svg
              width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="2.3"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </svg>
          </div>

          {/* Heading */}
          <div className="empty-chat-heading flex flex-col items-center gap-2">
            <h3
              className="text-2xl lg:text-3xl font-extrabold leading-snug"
              style={ff}
            >
              <span className="text-white">Welcome to </span>
              <span style={gradientText}>NexChat</span>
            </h3>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: "rgba(148,163,184,0.55)", ...ff }}
            >
              Select a conversation or start a new one to begin chatting.
            </p>
          </div>

          {/* Feature pills */}
          <div className="empty-chat-pills flex flex-wrap justify-center gap-2.5 mt-1">
            {[
              { icon: "⚡", label: "Blazing Fast" },
              { icon: "🔒", label: "End-to-End Encrypted" },
              { icon: "🤖", label: "AI Powered" },
            ].map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(167,139,250,0.09)",
                  border: "1px solid rgba(167,139,250,0.2)",
                  color: "#a78bfa",
                  boxShadow: "0 2px 10px rgba(167,139,250,0.1)",
                  ...ff,
                }}
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmptyChatContainer;