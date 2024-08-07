import React from "react";
import ExitBtn from "../../components/Buttons/ExitBtn"


const GameBackground = ({ children }) => {
  return (
    <div className="bg-custom-gradient-game w-full flex justify-center items-center min-h-[100vh]">
      <div className="w-[90vw] h-[90vh] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative">
        <ExitBtn/>
        {children}
      </div>
    </div>
  );
};

export default GameBackground;
