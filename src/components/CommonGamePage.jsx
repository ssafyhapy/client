import React from "react";
import GameBackground from "./GameBackgound";
import Chatbox from "./Chatbox";
import BasicBtn from "./btn/BasicBtn";

const CommonGamePage = () => {
  const btnText = "기본";
  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[75%] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        <div className="flex-grow flex overflow-hidden">
          <div className="bg-[rgba(255,255,255,0.9)] flex-[4] h-full mr-5 rounded-[20px] overflow-hidden">
            <p className="m-5">camera background</p>
          </div>
          <div className="flex-[1] ml-5 rounded-[20px] flex flex-col overflow-hidden">
            <Chatbox />
          </div>
        </div>
        <div className="flex-none mt-10 w-full h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
          <div className="flex-grow flex items-center justify-center">text</div>
          <div className="flex justify-end">
            <BasicBtn btnText={btnText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonGamePage;
