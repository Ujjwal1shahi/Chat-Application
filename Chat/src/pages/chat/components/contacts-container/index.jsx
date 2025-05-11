import React from "react";
import ProfileInfo from "./components/profile-info";


function ContactsContainer() {
  return (
    <div
      className="relative md:w-[35vw] lg:w-[30vw] xl-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full"
      style={{ fontFamily: "Text Me One" }}
    >
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
}

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-4">
      <img src="https://cdn-icons-png.freepik.com/256/12096/12096696.png" alt="logo" className="w-10 h-10 p-1.5 border-2 rounded-xl border-purple-800" />
      <span className="text-2xl font-semibold "> Syncronus </span>
    </div>
  );
};


const Title = ({text}) => {
  return (
   <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-thin text-opacity-90 text-sm" >{text}</h6>
  );
}