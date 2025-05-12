import React from "react";
import { useState } from "react";
import Background from "../../assets/login2.png";
import Victory from "../../assets/victory.svg";
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
import { Navigate, useNavigate  } from "react-router-dom";
import { useAppStore } from "@/store";

function Auth() {
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }

    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Passsword should be same.");
      return false;
    }

    return true;
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if(response.data.user.id){
        setUserInfo(response.data.user);
        setEmail('');
        setPassword('');
        if(response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log({ response });
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      // alert("done");
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if(response.status === 201){
        setUserInfo(response.data.user);
        setEmail('');
        setPassword('');
        navigate("/profile");
      }
      console.log({ response });
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center ">
      <div
        className="h-[80vh] bg-gray-200 border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:grid xl:w-[60vw]
          rounded-3xl xl:grid-cols-2"
      >
        <div className="flex flex-col gap-10 items-center justify-center">
          <div
            className="flex items-center justify-center
               flex-col"
          >
            <div className="flex items-center justify-center">
              <h1 className="ml-7 text-5xl font-bold md:text-6xl">Welcome</h1>
              {/* <img src={Victory} alt="Victory Emoji" className="h-[100px]" /> */}
              <iframe src="https://lottie.host/embed/08efe733-4fda-476b-b366-2e8106193557/mOjAWqt0YN.lottie" className="ml-0 w-[150px]"></iframe>
              
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started !
            </p>
          </div>

          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg w-full"
>
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 " value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center ">
        {/* <iframe src="https://lottie.host/embed/dea42000-6f97-4bcd-9a2d-885224484e80/kTDqEkoJui.lottie" className="h-[300px]"></iframe> */}
        <iframe className="h-[400px] w-[400px]" src="https://lottie.host/embed/db690ea4-6173-4dd5-a94d-a0032c365c49/iPPHZaDAdX.lottie"></iframe>
        </div>
      </div>
    </div>
  );
}

export default Auth;
