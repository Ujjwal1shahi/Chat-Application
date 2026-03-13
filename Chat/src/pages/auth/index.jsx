import React from "react";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

// ─── NexChat Theme Tokens ─────────────────────────────────────────────────────
const primaryGrad =
  "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 24px rgba(167,139,250,0.45)";

const glass = {
  background: "rgba(15,15,25,0.50)",
  backdropFilter: "blur(32px) saturate(180%)",
  WebkitBackdropFilter: "blur(32px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow:
    "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
};

const glassPanel = {
  background: "rgba(255,255,255,0.03)",
  borderRight: "1px solid rgba(255,255,255,0.06)",
};

const gradientText = {
  background: primaryGrad,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const ff = { fontFamily: "'Outfit', sans-serif" };

function Auth() {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = () => {
    if (!email.length) { toast.error("Email is required."); return false; }
    if (!password.length) { toast.error("Password is required."); return false; }
    if (password !== confirmPassword) { toast.error("Password and Confirm Password should be same."); return false; }
    return true;
  };

  const validateLogin = () => {
    if (!email.length) { toast.error("Email is required."); return false; }
    if (!password.length) { toast.error("Password is required."); return false; }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
      if (response.data.user.id) {
        setUserInfo(response.data.user);
        setEmail(""); setPassword("");
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log({ response });
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
      if (response.status === 201) {
        setUserInfo(response.data.user);
        setEmail(""); setPassword("");
        navigate("/profile");
      }
      console.log({ response });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes blob1 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,60px) scale(1.12); } }
        @keyframes blob2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px,40px) scale(1.08); } }
        @keyframes blob3 { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-50%,-50%) scale(1.13); } }
        @keyframes floatIn { from { opacity:0; transform: translateY(22px); } to { opacity:1; transform: translateY(0); } }

        .auth-input {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          color: #e2e8f0 !important;
          font-family: 'Outfit', sans-serif !important;
          border-radius: 14px !important;
          padding: 14px 18px !important;
          font-size: 14px !important;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.25) !important;
          width: 100%;
        }
        .auth-input:focus {
          outline: none !important;
          border-color: rgba(167,139,250,0.55) !important;
          box-shadow: 0 0 0 3px rgba(167,139,250,0.15), inset 0 2px 8px rgba(0,0,0,0.2) !important;
        }
        .auth-input::placeholder {
          color: rgba(148,163,184,0.55) !important;
        }

        /* Tab overrides */
        .nexchat-tablist {
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.09) !important;
          border-radius: 16px !important;
          padding: 5px !important;
          gap: 4px !important;
        }
        .nexchat-tab {
          border-radius: 12px !important;
          font-family: 'Outfit', sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: rgba(148,163,184,0.8) !important;
          padding: 10px 20px !important;
          transition: all 0.25s ease !important;
          border: none !important;
          background: transparent !important;
          flex: 1 !important;
        }
        .nexchat-tab[data-state="active"] {
          background: linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%) !important;
          color: white !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 16px rgba(167,139,250,0.4) !important;
        }

        .auth-card {
          animation: floatIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      {/* ── Page wrapper ── */}
      <div
        className="min-h-screen w-full flex items-center justify-center px-4 py-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0a14 0%, #0f0a1e 50%, #0a0f1e 100%)",
          ...ff,
        }}
      >
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute rounded-full" style={{ width: 600, height: 600, top: -180, right: -100, background: "radial-gradient(circle, rgba(167,139,250,0.20) 0%, transparent 70%)", filter: "blur(40px)", animation: "blob1 12s ease-in-out infinite alternate" }} />
        <div className="pointer-events-none absolute rounded-full" style={{ width: 500, height: 500, bottom: -100, left: -100, background: "radial-gradient(circle, rgba(110,231,247,0.15) 0%, transparent 70%)", filter: "blur(40px)", animation: "blob2 10s ease-in-out infinite alternate" }} />
        <div className="pointer-events-none absolute rounded-full" style={{ width: 420, height: 420, top: "50%", left: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.10) 0%, transparent 70%)", filter: "blur(50px)", animation: "blob3 14s ease-in-out infinite alternate" }} />

        {/* ── Card ── */}
        <div
          className="auth-card relative w-full max-w-4xl rounded-3xl overflow-hidden flex flex-col xl:flex-row"
          style={glass}
        >
          {/* Top gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: primaryGrad, opacity: 0.75 }} />

          {/* ── Left — Form panel ── */}
          <div className="flex-1 flex flex-col gap-8 items-center justify-center px-8 py-12 sm:px-12">

            {/* Brand */}
            <div className="text-center">
              {/* Logo mark */}
              <div className="flex items-center justify-center gap-2.5 mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background: primaryGrad, boxShadow: primaryShadow }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01M12 10h.01M16 10h.01" />
                  </svg>
                </div>
                <span className="font-extrabold text-2xl tracking-tight" style={{ ...gradientText, ...ff }}>
                  NexChat
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-white mb-1" style={ff}>
                Welcome back
              </h1>
              <p className="text-sm text-slate-500" style={ff}>
                Sign in or create your account to get started
              </p>
            </div>

            {/* Tabs */}
            <div className="w-full max-w-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="nexchat-tablist w-full flex">
                  <TabsTrigger value="login" className="nexchat-tab">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="nexchat-tab">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* ── Login ── */}
                <TabsContent value="login" className="flex flex-col gap-4 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest" style={ff}>Email</label>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      className="auth-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest" style={ff}>Password</label>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full h-12 text-sm font-bold text-white rounded-2xl border-0 mt-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:brightness-110"
                    style={{ background: primaryGrad, boxShadow: primaryShadow, ...ff }}
                    onClick={handleLogin}
                  >
                    Login →
                  </Button>

                  <p className="text-center text-xs text-slate-600 mt-1" style={ff}>
                    Don't have an account?{" "}
                    <span
                      className="cursor-pointer font-semibold hover:underline underline-offset-2 transition-all"
                      style={{ color: "#A78BFA" }}
                      onClick={() => setActiveTab("signup")}
                    >
                      Sign up free
                    </span>
                  </p>
                </TabsContent>

                {/* ── Sign Up ── */}
                <TabsContent value="signup" className="flex flex-col gap-4 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest" style={ff}>Email</label>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      className="auth-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest" style={ff}>Password</label>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-widest" style={ff}>Confirm Password</label>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      className="auth-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full h-12 text-sm font-bold text-white rounded-2xl border-0 mt-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:brightness-110"
                    style={{ background: primaryGrad, boxShadow: primaryShadow, ...ff }}
                    onClick={handleSignup}
                  >
                    Create Account →
                  </Button>

                  <p className="text-center text-xs text-slate-600 mt-1" style={ff}>
                    Already have an account?{" "}
                    <span
                      className="cursor-pointer font-semibold hover:underline underline-offset-2 transition-all"
                      style={{ color: "#A78BFA" }}
                      onClick={() => setActiveTab("login")}
                    >
                      Sign in
                    </span>
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer note */}
            <p className="text-xs text-slate-700 text-center" style={ff}>
              By continuing you agree to our{" "}
              <span className="underline underline-offset-2 cursor-pointer text-slate-500">Terms</span>{" "}
              &{" "}
              <span className="underline underline-offset-2 cursor-pointer text-slate-500">Privacy Policy</span>
            </p>
          </div>

          {/* ── Right — Illustration panel (xl only) ── */}
          <div
            className="hidden xl:flex flex-col items-center justify-center px-12 py-12 gap-8 relative"
            style={{
              minWidth: "380px",
              ...glassPanel,
            }}
          >
            {/* Decorative gradient blob inside panel */}
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                width: 320, height: 320,
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Feature pills */}
            <div className="relative z-10 flex flex-col gap-3 w-full">
              {[
                { icon: "⚡", text: "Sub-50ms message delivery" },
                { icon: "🔒", text: "End-to-end encrypted chats" },
                { icon: "🤖", text: "AI-powered smart replies" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm font-medium text-slate-400" style={ff}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;