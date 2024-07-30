import React from "react";
import ExitBtn from "./../components/btn/ExitBtn"

const GameBackground = ({ children }) => {
  return (
    <div className="bg-custom-gradient-game w-full h-full flex justify-center items-center py-[2rem]">
      <div className="w-[75%] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex relative">
        <ExitBtn/>
        {children}
      </div>
    </div>
  );
};

export default GameBackground;
