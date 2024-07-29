import React from "react";

const GameBackground = ({ children }) => {
  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[75%] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex">
        {children}
      </div>
    </div>
  );
};

export default GameBackground;
