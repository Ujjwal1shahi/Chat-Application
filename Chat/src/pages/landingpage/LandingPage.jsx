import React, { useState } from "react";
import { Link, Element } from "react-scroll";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TextAnimate } from "@/components/magicui/text-animate";
import {NumberTicker} from "@/components/magicui/number-ticker"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", to: "home" },
    { name: "Features", to: "features" },
    { name: "How It Works", to: "how-it-works" },
    { name: "Pricing", to: "pricing" },
    { name: "Contact", to: "contact" },
  ];
  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-white/30 border-b border-white/5 text-white z-50">
      {/* <SmoothCursor/> */}
      <div className="container mx-auto px-16 py-3 flex justify-between items-center ">
        <div className="text-2xl font-bold">
          <iframe
            className="h-[50px] w-[50px]"
            // src="https://lottie.host/embed/dfb46be1-cf75-4491-9d3c-629c2132cb95/E2mYyXWidA.lottie" 
            src="https://lottie.host/embed/a0671975-89b5-4b03-b968-5ec82a3c33f6/ttutTXdhhg.lottie"
          ></iframe>
        </div>
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-[16px] hover:text-gray-400 transition-colors"
              activeClass="text-black font-semibold"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
        <button className="hidden md:block bg-black hover:bg-gray-900 text-white px-8 py-2 rounded-full transition-colors">
          Get Started
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              duration={500}
              className="block py-2 cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [clickedFirst, setClickedFirst] = useState(false);
  const [clickedSecond, setClickedSecond] = useState(false);
  const navigate = useNavigate();

  const handleFirstClick = () => {
    setClickedFirst(true);
    setTimeout(() => setClickedFirst(false), 600); // Reset after animation time

    navigate("/auth/signup"); // Redirect to signup page
  };

  const handleSecondClick = () => {
    setClickedSecond(true);
    setTimeout(() => setClickedSecond(false), 600); // Reset after animation time

    navigate("/main");
  };
  return (
    <Element name="home" className="pt-32 pb-2 bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      
      <div className="container h-[66vh] mx-auto px-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
    
          <TextAnimate  className="text-5xl h-[100px] md:text-5xl font-bold mb-6 text-white" animation="slideUp" by="word">
          Connect and collaborate seamlessly.
          </TextAnimate>

          <p className="text-lg py-4 text-gray-400 mb-8">
            Experience real-time messaging with enterprise-grade security and
            intuitive design.
          </p>
          <div className="flex gap-6 w-3/5">
            {/* First button */}
            <button
              onClick={handleFirstClick}
              className="relative overflow-hidden bg-black text-white px-10 py-4 rounded-full transition-all duration-300 text-lg font-semibold shadow-lg active:scale-95"
            >
              {/* Animated layer */}
              <span
                className={`absolute top-0 left-0 h-full bg-white/20 transition-all duration-500 ease-out ${
                  clickedFirst ? "w-full" : "w-0"
                }`}
              ></span>

              {/* Button Text */}
              
              <span className="relative z-10" >Get Started Free</span>
            </button>

            {/* Second button */}
            <button
              onClick={handleSecondClick}
              className="relative overflow-hidden bg-white text-black border-2 border-gray-300 px-10 py-4 rounded-full transition-all duration-300 text-lg font-semibold shadow-md active:scale-95"
            >
              {/* Animated layer */}
              <span
                className={`absolute top-0 left-0 h-full bg-gray-300/30 transition-all duration-500 ease-out ${
                  clickedSecond ? "w-full" : "w-0"
                }`}
              ></span>

              {/* Button Text */}
              <span className="relative z-10">Watch Demo</span>
            </button>
          </div>
        </div>
        {/* <Globe className='sm:h-[64vh] sm:w-[34vw] sm:mr-[140px] sm:mt-[20vh] ' /> */}
        <div className="h-1/2 w-1/2 mb-32">
          <img src="https://static.vecteezy.com/system/resources/previews/009/315/269/non_2x/3d-social-media-with-video-and-photo-gallery-platform-online-social-communication-applications-concept-emoji-webpage-search-icons-chat-with-smartphone-background-image-3d-render-free-png.png" />
          {/* <iframe src="https://lottie.host/embed/09a9dbf1-c6ae-4458-9681-9c75eea696a6/Nm3APf3oaX.lottie"></iframe> */}
        </div>
      </div>
    </Element>
  );
}

function Features() {
  const features = [
    {
      title: "Real-time Messaging",
      description:
        "Send and receive messages instantly with no delays or refreshing required.",
      icon: "💬",
    },
    {
      title: "End-to-End Encryption",
      description:
        "Your conversations remain private with our advanced security protocols.",
      icon: "🔒",
    },
    {
      title: "Multi-platform Support",
      description: "Use our app on any device - mobile, tablet, or desktop.",
      icon: "📱",
    },
    {
      title: "File Sharing",
      description: "Share documents, images, and videos with ease.",
      icon: "📁",
    },
  ];
  return (
    <Element name="features" className="py-20  bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      <div className="container mx-auto px-16 bg-gradient-to-br from-[#0d1117] to-[#161b22]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Why Choose Our Chat App?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Designed with users in mind, our platform delivers the features you
            need with the simplicity you want.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-500 p-8 rounded-xl shadow-lg shadow-white/30 transition-all duration-300 hover:shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]  group"
            >
              <div className="text-4xl mb-4 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up in seconds with just an email address.",
    },
    {
      number: "02",
      title: "Add Your Contacts",
      description: "Import contacts or invite friends to join you.",
    },
    {
      number: "03",
      title: "Start Chatting",
      description: "Begin conversations with individuals or groups instantly.",
    },
  ];
  return (
    <Element name="how-it-works" className="py-20 bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      <div className="container mx-auto px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Simple to Get Started
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our streamlined process gets you communicating in minutes, not
            hours.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1">
              <div className="text-5xl font-bold text-gray-300 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      period: "Free forever",
      features: [
        "1-on-1 messaging",
        "Group chats up to 5 people",
        "File sharing up to 20MB",
        "24/7 support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Everything in Basic",
        "Group chats up to 50 people",
        "File sharing up to 100MB",
        "Voice and video calls",
        "Screen sharing",
      ],
      cta: "Try Free for 14 Days",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$19.99",
      period: "per user/month",
      features: [
        "Everything in Pro",
        "Unlimited group size",
        "Unlimited file sharing",
        "Advanced admin controls",
        "Custom branding",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];
  return (
    <Element name="pricing" className="py-20 bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      <div className="container mx-auto px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the plan that works for you. All plans include a 14-day
            trial.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white/30 rounded-xl border-2 shadow-lg shadow-white/40 overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.4)] ${
                plan.popular
                  ? "border-2 border-white/50 transform -translate-y-2"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-black text-white py-2 text-center font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-black">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-700"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium ${
                    plan.popular
                      ? "bg-black/80 hover:bg-gray-800 text-white"
                      : "bg-gray-100 hover:bg-gray-300 text-black"
                  } transition-colors`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
}

function Contact() {
  return (
    <Element name="contact" className="py-20 bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      <div className="container mx-auto px-16">
        <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your communication?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who have already enhanced their team
            collaboration with our chat platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full transition-colors text-lg font-medium">
              Get Started Free
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full transition-colors text-lg font-medium">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </Element>
  );
}

function Footer() {
  const icons = {
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
  };

  const socialLinks = {
    twitter: "https://twitter.com/your_username",
    facebook: "https://facebook.com/your_username",
    instagram: "https://instagram.com/ujjwal._.shahi",
    linkedin: "https://www.linkedin.com/in/ujjwal-shahi-0956b22a0/",
  };

  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="container mx-auto px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">ChatApp</h3>
            <p className="mb-4">
              Making communication simpler, faster, and more secure for teams
              around the world.
            </p>
            <div className="flex space-x-4">
              {Object.keys(socialLinks).map((social) => (
                <a
                  key={social}
                  href={socialLinks[social]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-2xl"
                >
                  <span className="sr-only">{social}</span>
                  {icons[social]}
                </a>
              ))}
            </div>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Security", "Updates"],
            },
            {
              title: "Support",
              links: ["Help Center", "Contact Us", "Documentation", "Status"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press"],
            },
          ].map((column, idx) => (
            <div key={idx}>
              <h3 className="text-white text-lg font-semibold mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 ChatApp. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const [loading, setLoading] = useState(true);      // Controls if loader is visible
  const [fadeOut, setFadeOut] = useState(false);     // Controls fade-out animation

  // Duration for your counting animation in ms (adjust to match your NumberTicker)
  const COUNT_DURATION = 3000;
  // Duration for fade transition in ms (should match CSS below)
  const FADE_DURATION = 600;

  useEffect(() => {
    // After counting is done, start fade out
    const timer = setTimeout(() => setFadeOut(true), COUNT_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // After fade out is done, hide loader
    if (fadeOut) {
      const timer = setTimeout(() => setLoading(false), FADE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  return (
    <div className="font-sans bg-black relative">
      {/* Loader overlay with smooth fade out */}
      {loading && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-600
            ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
          style={{
            transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4,0,0.2,1)`
          }}
        >
          <NumberTicker
            value={100}
            direction="up"
            className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-white"
          />
        </div>
      )}

      {/* Main content with fade in */}
      <div
        className={`transition-opacity duration-600 ${loading ? "opacity-0" : "opacity-100"}`}
        style={{
          transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4,0,0.2,1)`
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
