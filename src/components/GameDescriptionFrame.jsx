import React from "react";
import BasicBtn from "./btn/BasicBtn";

const GameDescriptionFrame = ({ text, btnText }) => {
  return (
    <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
      <div className="flex-grow flex items-center justify-center">
        {text}
      </div>
      <div className="absolute bottom-4 right-4">
        <BasicBtn btnText={btnText} />
      </div>
    </div>
  );
};

export default GameDescriptionFrame;
