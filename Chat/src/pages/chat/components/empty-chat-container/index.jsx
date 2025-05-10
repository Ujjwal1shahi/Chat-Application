import { animationDefaultOptions } from "@/lib/utils";
import React from "react";
import Lottie from "react-lottie";
import "@fontsource/pacifico";

function EmptyChatContainer() {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />

      <div className="text-opacity-80 flex flex-col text-white gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="font-pacifico font-thin text-2xl">
          <span className="text-white">Hi </span>
          <span className="text-purple-500">! </span>
          <span className="text-white">Welcome to </span>
          <span className="text-purple-500">Synchronous</span>
          <span className="text-white"> Chat App</span>
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
}

export default EmptyChatContainer;
