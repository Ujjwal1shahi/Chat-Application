import { useState, useEffect, useRef } from "react";
import {
  Zap, Lock, Globe, Bot, Palette, FolderOpen,
  Phone, Video, Send, Star, Sun, Moon,
  Play, MessageCircle, Users, Shield, ArrowRight,
  Twitter, Github, Linkedin, CheckCircle, Quote,
  Sparkles
} from "lucide-react";

// ─── Liquid Glass Styles (cards & navbar only) ────────────────────────────────
const glass = {
  light: {
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(28px) saturate(180%)",
    WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.48)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.65)",
  },
  dark: {
    background: "rgba(15,15,25,0.38)",
    backdropFilter: "blur(28px) saturate(180%)",
    WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.07)",
  },
};

const glassIcon = {
  light: {
    background: "rgba(255,255,255,0.30)",
    backdropFilter: "blur(16px) saturate(200%)",
    WebkitBackdropFilter: "blur(16px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.58)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.75)",
  },
  dark: {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(16px) saturate(200%)",
    WebkitBackdropFilter: "blur(16px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.11)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
  },
};

const gradientText = {
  background: "linear-gradient(135deg,#6EE7F7 0%,#A78BFA 50%,#F472B6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// Primary gradient — used on all buttons now
const primaryGrad = "linear-gradient(135deg, #6EE7F7 0%, #A78BFA 60%, #F472B6 100%)";
const primaryShadow = "0 4px 24px rgba(167,139,250,0.45)";

// Secondary gradient — for outline/ghost buttons
const secondaryGrad = "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)";

const ff = { fontFamily: "'Outfit', sans-serif" };

// ─── Button — all buttons now use gradients, no glass ────────────────────────
function Btn({ variant = "primary", children, className = "", onClick, icon, dark }) {
  const base = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer`;

  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        className={`${base} text-white ${className}`}
        style={{ background: primaryGrad, boxShadow: primaryShadow, ...ff }}
      >
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    // Soft gradient outline look — no glass, pure gradient border via bg-clip trick
    return (
      <button
        onClick={onClick}
        className={`${base} ${className}`}
        style={{
          background: dark
            ? "linear-gradient(135deg, rgba(110,231,247,0.12) 0%, rgba(167,139,250,0.15) 60%, rgba(244,114,182,0.12) 100%)"
            : "linear-gradient(135deg, rgba(110,231,247,0.18) 0%, rgba(167,139,250,0.20) 60%, rgba(244,114,182,0.18) 100%)",
          border: "1.5px solid transparent",
          backgroundClip: "padding-box",
          boxShadow: dark
            ? "0 0 0 1.5px rgba(167,139,250,0.35), 0 4px 16px rgba(167,139,250,0.15)"
            : "0 0 0 1.5px rgba(167,139,250,0.45), 0 4px 16px rgba(167,139,250,0.12)",
          color: dark ? "#c4b5fd" : "#7c3aed",
          ...ff,
        }}
      >
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  }

  // "ghost" — for dark-mode toggle icon button, keep glass
  return (
    <button
      onClick={onClick}
      className={`${base} ${className}`}
      style={{ ...glassIcon[dark ? "dark" : "light"], color: dark ? "#fbbf24" : "#7c3aed" }}
    >
      {children}
    </button>
  );
}

// ─── GlassCard ───────────────────────────────────────────────────────────────
function GlassCard({ dark, children, className = "", style = {}, hover = true }) {
  return (
    <div
      className={`rounded-3xl p-6 transition-all duration-300 ${hover ? "hover:scale-[1.025]" : ""} ${className}`}
      style={{ ...glass[dark ? "dark" : "light"], ...style }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Features", id: "features" },
  { label: "Reviews",  id: "reviews" },
  { label: "Docs",     id: "docs" },
  { label: "Blog",     id: "blog" },
];

function Navbar({ dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3 transition-all duration-500"
      style={scrolled ? glass[dark ? "dark" : "light"] : { background: "transparent" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* ── Logo & Brand ── */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: primaryGrad, boxShadow: primaryShadow }}
          >
            <Sparkles size={17} color="white" strokeWidth={2.2} />
          </div>
          <span
            className="font-extrabold text-xl tracking-tight"
            style={{ ...gradientText, ...ff }}
          >
            NexChat
          </span>
        </div>

        {/* ── Nav Links ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                dark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              style={ff}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle — kept as icon-glass since it's a utility icon */}
          <button
            onClick={toggleDark}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={glassIcon[dark ? "dark" : "light"]}
            aria-label="Toggle dark mode"
          >
            {dark
              ? <Sun size={17} color="#fbbf24" strokeWidth={2} />
              : <Moon size={17} color="#7c3aed" strokeWidth={2} />
            }
          </button>

          <Btn dark={dark} variant="secondary" className="hidden md:inline-flex">
            Sign In
          </Btn>
          <Btn dark={dark} variant="primary">
            Get Started
          </Btn>
        </div>
      </div>
    </nav>
  );
}

// ─── Chat Mockup ─────────────────────────────────────────────────────────────
function ChatMockup({ dark }) {
  const messages = [
    { from: "them", text: "Hey! Can you help me design a new feature? 🚀", time: "9:41 AM" },
    { from: "me",   text: "Absolutely! Tell me what you're thinking.",      time: "9:42 AM" },
    { from: "them", text: "I want real-time collaborative whiteboards in chat.", time: "9:42 AM" },
    { from: "me",   text: "Love it — sketching wireframes now!",            time: "9:43 AM" },
  ];

  return (
    <div
      className="rounded-3xl overflow-hidden w-full max-w-sm mx-auto"
      style={{
        ...glass[dark ? "dark" : "light"],
        boxShadow: dark
          ? "0 36px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)"
          : "0 36px 90px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.55)",
      }}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3" style={glass[dark ? "dark" : "light"]}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: primaryGrad }}
        >
          AR
        </div>
        <div>
          <p className={`font-semibold text-sm ${dark ? "text-white" : "text-slate-800"}`} style={ff}>Alex Rivera</p>
          <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            Online
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          {[<Phone size={14} />, <Video size={14} />].map((icon, i) => (
            <button
              key={i}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 text-white"
              style={{ background: primaryGrad, boxShadow: "0 2px 10px rgba(167,139,250,0.4)" }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-5 space-y-3 min-h-[220px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[78%] px-4 py-2.5 rounded-2xl text-sm"
              style={
                msg.from === "me"
                  ? { background: primaryGrad, color: "#fff", ...ff, borderBottomRightRadius: "6px", boxShadow: "0 2px 12px rgba(167,139,250,0.35)" }
                  : { ...glassIcon[dark ? "dark" : "light"], color: dark ? "#e2e8f0" : "#334155", ...ff, borderBottomLeftRadius: "6px" }
              }
            >
              {msg.text}
              <p className="text-[10px] mt-0.5 opacity-50 text-right">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={glass[dark ? "dark" : "light"]}>
          <input
            readOnly
            placeholder="Type a message…"
            className={`flex-1 bg-transparent text-sm outline-none ${dark ? "text-slate-200 placeholder-slate-500" : "text-slate-700 placeholder-slate-400"}`}
            style={ff}
          />
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110"
            style={{ background: primaryGrad, boxShadow: "0 2px 10px rgba(167,139,250,0.5)" }}
          >
            <Send size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ dark }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: dark
                ? "linear-gradient(135deg,rgba(110,231,247,0.10),rgba(167,139,250,0.15),rgba(244,114,182,0.10))"
                : "linear-gradient(135deg,rgba(110,231,247,0.18),rgba(167,139,250,0.22),rgba(244,114,182,0.18))",
              boxShadow: "0 0 0 1px rgba(167,139,250,0.3)",
              color: dark ? "#A78BFA" : "#7C3AED",
              ...ff,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Now with AI-powered messaging
          </div>

          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 ${dark ? "text-white" : "text-slate-900"}`}
            style={ff}
          >
            Chat that feels{" "}
            <span style={gradientText}>like magic</span>
          </h1>

          <p className={`text-xl leading-relaxed mb-8 max-w-lg ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>
            NexChat reimagines messaging with liquid-glass design, end-to-end encryption, and an AI assistant that truly understands context.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Btn dark={dark} variant="primary" icon={<Globe size={15} />}>
              Open Web App
            </Btn>
            <Btn dark={dark} variant="secondary" icon={<Play size={14} fill="currentColor" />}>
              Watch Demo
            </Btn>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-3">
              {["#6EE7F7","#A78BFA","#F472B6","#34D399","#FBBF24"].map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs text-white font-bold"
                  style={{ background: c, borderColor: dark ? "#0f0f1a" : "#f0f4ff" }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>
              <strong className={dark ? "text-white" : "text-slate-800"}>50M+</strong> people already chatting
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ChatMockup dark={dark} />
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsSection({ dark }) {
  const stats = [
    { num: "50M+",   label: "Active Users",   icon: <Users size={20} /> },
    { num: "99.99%", label: "Uptime SLA",     icon: <CheckCircle size={20} /> },
    { num: "200+",   label: "Edge Locations", icon: <Globe size={20} /> },
    { num: "<50ms",  label: "Avg. Latency",   icon: <Zap size={20} /> },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl p-8" style={glass[dark ? "dark" : "light"]}>
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white"
                style={{ background: primaryGrad, boxShadow: primaryShadow }}
              >
                {s.icon}
              </div>
              <p className="text-3xl md:text-4xl font-extrabold mb-1" style={{ ...gradientText, ...ff }}>{s.num}</p>
              <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────
function FeaturesSection({ dark }) {
  const features = [
    { icon: <Zap size={22} />,        title: "Blazing Fast",         desc: "Sub-100ms delivery with our distributed edge network spanning 200+ locations worldwide.", color: "#FBBF24" },
    { icon: <Lock size={22} />,       title: "End-to-End Encrypted", desc: "Military-grade AES-256 encryption. Your conversations are yours alone, always.", color: "#34D399" },
    { icon: <Globe size={22} />,      title: "Web-First Platform",   desc: "No download required. Seamlessly sync across all browsers and devices from one URL.", color: "#6EE7F7" },
    { icon: <Bot size={22} />,        title: "AI Assistant",         desc: "Intelligent message suggestions, smart replies, and real-time translation in 50+ languages.", color: "#A78BFA" },
    { icon: <Palette size={22} />,    title: "Custom Themes",        desc: "Fully customizable themes, fonts, and bubble styles to make NexChat feel like home.", color: "#F472B6" },
    { icon: <FolderOpen size={22} />, title: "Rich Media",           desc: "Share files up to 2GB, host live voice rooms, and stream HD video calls with screen share.", color: "#FB923C" },
  ];

  return (
    <section id="features" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest text-white"
            style={{ background: primaryGrad, ...ff }}
          >
            Everything you need
          </span>
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={ff}>
            Built for how you
            <span className="block" style={gradientText}> actually communicate</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>
            Every feature thoughtfully designed to make your conversations feel natural, secure, and delightful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <GlassCard key={i} dark={dark} className="group cursor-default">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `linear-gradient(135deg, ${f.color}cc, ${f.color}55)`, boxShadow: `0 4px 16px ${f.color}44` }}
              >
                {f.icon}
              </div>
              <h3 className={`font-bold text-lg mb-2 ${dark ? "text-white" : "text-slate-800"}`} style={ff}>{f.title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
function ReviewsSection({ dark }) {
  const reviews = [
    { name: "Sophia Chen",    role: "Product Designer at Figma",  avatar: "#6EE7F7", initials: "SC", rating: 5, platform: <Twitter size={14} />,  text: "NexChat has completely transformed how our design team collaborates. The glassmorphic UI is stunning, and the AI message suggestions save us hours every week. First chat app that actually feels designed by someone who cares." },
    { name: "Marcus Williams",role: "CTO at Vercel",              avatar: "#A78BFA", initials: "MW", rating: 5, platform: <Linkedin size={14} />, text: "We migrated our entire 200-person engineering team to NexChat in a single weekend. The zero-latency message delivery is real. End-to-end encryption gives our security team peace of mind. Best decision this year." },
    { name: "Priya Patel",    role: "Head of Community, GitHub",  avatar: "#F472B6", initials: "PP", rating: 5, platform: <Twitter size={14} />,  text: "I've tried every messaging tool out there. NexChat is the only one that doesn't feel like enterprise software from 2015. The liquid glass web experience is gorgeous, and the AI assistant actually understands context." },
    { name: "Jonas Berg",     role: "Senior Engineer at Stripe",  avatar: "#34D399", initials: "JB", rating: 5, platform: <Github size={14} />,   text: "File sharing and code snippet support are incredible. I can paste a stack trace in chat, and NexChat's AI automatically formats it and even suggests a fix. This is the future of developer communication." },
    { name: "Leila Hassan",   role: "UX Lead at Shopify",         avatar: "#FBBF24", initials: "LH", rating: 5, platform: <Twitter size={14} />,  text: "Dark mode on NexChat is an art form. The glass effects actually adapt to background content — it feels like magic. Our remote team's morale has visibly improved since we switched. Beautiful tools genuinely matter." },
    { name: "David Kim",      role: "Co-founder, Linear",         avatar: "#FB923C", initials: "DK", rating: 5, platform: <Github size={14} />,   text: "NexChat's API is clean, well-documented, and the webhooks are rock solid. We built a custom integration in a day. The team went from skeptical to obsessed within a week. Customer support is genuinely responsive and human." },
  ];

  const StarRating = ({ count }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => <Star key={i} size={13} fill="#FBBF24" color="#FBBF24" />)}
    </div>
  );

  return (
    <section id="reviews" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest text-white"
            style={{ background: "linear-gradient(135deg,#FBBF24,#F472B6)", ...ff }}
          >
            Loved by teams worldwide
          </span>
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={ff}>
            Don't take our word
            <span className="block" style={gradientText}> for it</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>
            Trusted by product teams, engineers, and creators at the world's best companies.
          </p>

          {/* Rating badge — gradient, no glass */}
          <div
            className="inline-flex items-center gap-3 mt-6 px-5 py-3 rounded-2xl"
            style={{
              background: dark
                ? "linear-gradient(135deg,rgba(251,191,36,0.12),rgba(244,114,182,0.12))"
                : "linear-gradient(135deg,rgba(251,191,36,0.18),rgba(244,114,182,0.18))",
              boxShadow: "0 0 0 1px rgba(251,191,36,0.35)",
            }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />)}
            </div>
            <span className={`font-bold text-lg ${dark ? "text-white" : "text-slate-800"}`} style={ff}>4.9</span>
            <span className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>from 12,400+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <GlassCard key={i} dark={dark} className="flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                <Quote size={40} color={r.avatar} />
              </div>
              <StarRating count={r.rating} />
              <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-slate-300" : "text-slate-600"}`} style={ff}>
                "{r.text}"
              </p>
              <div className="w-full h-px" style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }} />
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: r.avatar, boxShadow: `0 4px 12px ${r.avatar}55` }}
                >
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm truncate ${dark ? "text-white" : "text-slate-800"}`} style={ff}>{r.name}</p>
                  <p className={`text-xs truncate ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>{r.role}</p>
                </div>
                {/* Platform icon — gradient pill */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: primaryGrad, boxShadow: "0 2px 8px rgba(167,139,250,0.35)" }}
                >
                  {r.platform}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Docs placeholder ─────────────────────────────────────────────────────────
function DocsSection({ dark }) {
  const docs = [
    { title: "Quick Start Guide", desc: "Get NexChat running in under 5 minutes with our step-by-step setup.", tag: "Beginner", icon: <Zap size={18} /> },
    { title: "REST API Reference", desc: "Full endpoint documentation with request/response examples and auth flows.", tag: "API", icon: <Globe size={18} /> },
    { title: "Webhooks & Events", desc: "React to real-time events: messages, presence, reactions, and file uploads.", tag: "Advanced", icon: <Bot size={18} /> },
    { title: "SDKs & Libraries",  desc: "Official SDKs for JavaScript, Python, Go, and Rust. Community libs too.", tag: "SDK", icon: <FolderOpen size={18} /> },
    { title: "Security & Privacy",desc: "Learn how end-to-end encryption, key management, and GDPR compliance work.", tag: "Security", icon: <Shield size={18} /> },
    { title: "Integrations",      desc: "Connect NexChat with Slack, GitHub, Jira, Notion, and 200+ other tools.", tag: "Ecosystem", icon: <Palette size={18} /> },
  ];

  return (
    <section id="docs" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest text-white"
            style={{ background: "linear-gradient(135deg,#6EE7F7,#34D399)", ...ff }}
          >
            Documentation
          </span>
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={ff}>
            Everything you need
            <span className="block" style={gradientText}> to build & integrate</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>
            Comprehensive guides, API references, and SDKs to help you ship faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {docs.map((d, i) => (
            <GlassCard key={i} dark={dark} className="group cursor-pointer flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{ background: primaryGrad, boxShadow: primaryShadow }}
                >
                  {d.icon}
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: "linear-gradient(90deg,#A78BFA,#F472B6)" }}
                >
                  {d.tag}
                </span>
              </div>
              <h3 className={`font-bold text-base ${dark ? "text-white" : "text-slate-800"}`} style={ff}>{d.title}</h3>
              <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>{d.desc}</p>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#A78BFA" }}>
                Read more <ArrowRight size={12} />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Blog placeholder ─────────────────────────────────────────────────────────
function BlogSection({ dark }) {
  const posts = [
    { title: "Introducing Liquid Glass UI", date: "Jan 12, 2025", read: "4 min read", tag: "Design",   gradient: "linear-gradient(135deg,#6EE7F7,#A78BFA)", desc: "How we reimagined chat interfaces with frosted glass, motion, and spatial depth to create a truly modern experience." },
    { title: "How We Achieve <50ms Latency Globally", date: "Jan 28, 2025", read: "6 min read", tag: "Engineering", gradient: "linear-gradient(135deg,#A78BFA,#F472B6)", desc: "Deep dive into our edge infrastructure, custom WebSocket protocol, and the architectural decisions that make NexChat blazing fast." },
    { title: "AI That Actually Understands You", date: "Feb 10, 2025", read: "5 min read", tag: "AI",       gradient: "linear-gradient(135deg,#F472B6,#FBBF24)", desc: "Our context-aware AI assistant learns from conversation patterns to suggest smarter replies and surface relevant information." },
  ];

  return (
    <section id="blog" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest text-white"
            style={{ background: "linear-gradient(135deg,#F472B6,#FBBF24)", ...ff }}
          >
            From the blog
          </span>
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={ff}>
            Insights &
            <span className="block" style={gradientText}> behind the scenes</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>
            Design thinking, engineering deep-dives, and product stories from the NexChat team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <GlassCard key={i} dark={dark} className="group cursor-pointer flex flex-col gap-0 p-0 overflow-hidden">
              {/* Gradient banner */}
              <div
                className="h-36 flex items-end p-5 relative"
                style={{ background: p.gradient }}
              >
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)" }}
                >
                  {p.tag}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-xs" style={{ color: dark ? "#64748b" : "#94a3b8", ...ff }}>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
                <h3 className={`font-bold text-base leading-snug ${dark ? "text-white" : "text-slate-800"}`} style={ff}>{p.title}</h3>
                <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>{p.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold mt-2" style={{ color: "#A78BFA" }}>
                  Read article <ArrowRight size={12} />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTASection({ dark }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <GlassCard dark={dark} className="relative overflow-hidden" hover={false}>
          <div
            className="absolute inset-0 -z-10 rounded-3xl"
            style={{
              background: dark
                ? "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.10) 0%, transparent 70%)"
                : "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="py-8">
            <div
              className="w-16 h-16 rounded-3xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: primaryGrad, boxShadow: primaryShadow }}
            >
              <Globe size={28} color="white" strokeWidth={1.8} />
            </div>
            <h2 className={`text-4xl md:text-5xl font-extrabold mb-5 ${dark ? "text-white" : "text-slate-900"}`} style={ff}>
              Ready to chat
              <span className="block" style={gradientText}>differently?</span>
            </h2>
            <p className={`text-lg mb-8 max-w-lg mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`} style={ff}>
              Join 50 million people who've already switched. No download needed — NexChat runs beautifully right in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Btn dark={dark} variant="primary" icon={<Globe size={16} />}>
                Launch NexChat on Web
              </Btn>
              <Btn dark={dark} variant="secondary" icon={<ArrowRight size={15} />}>
                View Documentation
              </Btn>
            </div>

            {/* Trust badges — gradient pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { icon: <Shield size={13} />,       label: "SOC 2 Certified" },
                { icon: <Lock size={13} />,         label: "End-to-End Encrypted" },
                { icon: <CheckCircle size={13} />,  label: "GDPR Compliant" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white"
                  style={{ background: "linear-gradient(135deg,rgba(52,211,153,0.7),rgba(110,231,247,0.7))", boxShadow: "0 2px 10px rgba(52,211,153,0.25)", ...ff }}
                >
                  {badge.icon}
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ dark }) {
  return (
    <footer className="py-10 px-6" style={glass[dark ? "dark" : "light"]}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: primaryGrad }}>
            <Sparkles size={14} color="white" strokeWidth={2.2} />
          </div>
          <span className="font-bold" style={{ ...gradientText, ...ff }}>NexChat</span>
        </div>
        <p className={`text-sm ${dark ? "text-slate-500" : "text-slate-400"}`} style={ff}>
          © 2025 NexChat Technologies, Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Privacy", "Terms", "Security"].map((link) => (
            <button
              key={link}
              className={`text-sm font-medium hover:underline underline-offset-2 ${dark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}
              style={ff}
            >
              {link}
            </button>
          ))}
          <div className="flex gap-2 ml-1">
            {[<Twitter size={15} />, <Github size={15} />, <Linkedin size={15} />].map((icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 text-white"
                style={{ background: primaryGrad, boxShadow: "0 2px 8px rgba(167,139,250,0.35)" }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Background Blobs ────────────────────────────────────────────────────────
function BackgroundBlobs({ dark }) {
  const blobs = [
    { size: 600, top: -200, right: -100, color: "167,139,250", anim: "blob1", op: dark ? 0.18 : 0.22 },
    { size: 500, bottom: -100, left: -100, color: "110,231,247", anim: "blob2", op: dark ? 0.14 : 0.20 },
    { size: 400, cx: true, color: "244,114,182", anim: "blob3", op: dark ? 0.10 : 0.14 },
  ];
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size, height: b.size,
            top: b.cx ? "50%" : b.top,
            bottom: b.bottom,
            left: b.cx ? "50%" : b.left,
            right: b.right,
            transform: b.cx ? "translate(-50%,-50%)" : undefined,
            background: `radial-gradient(circle, rgba(${b.color},${b.op}) 0%, transparent 70%)`,
            filter: "blur(40px)",
            animation: `${b.anim} ${10 + i * 3}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [dark, setDark] = useState(true);

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: dark
          ? "linear-gradient(135deg, #0a0a14 0%, #0f0a1e 50%, #0a0f1e 100%)"
          : "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0faff 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes blob1 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,60px) scale(1.1); } }
        @keyframes blob2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px,40px) scale(1.08); } }
        @keyframes blob3 { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-50%,-50%) scale(1.15); } }
      `}</style>

      <BackgroundBlobs dark={dark} />
      <Navbar dark={dark} toggleDark={() => setDark(d => !d)} />
      <HeroSection dark={dark} />
      <StatsSection dark={dark} />
      <FeaturesSection dark={dark} />
      <ReviewsSection dark={dark} />
      <DocsSection dark={dark} />
      <BlogSection dark={dark} />
      <CTASection dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}