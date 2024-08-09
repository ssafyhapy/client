import React from "react";

const PlayFrame = ({ children }) => {
  return (
    <div className="flex flex-col justify-between w-full h-full max-h-[400px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] z-20 mt-5">
      {children}
    </div>
  );
};

export default PlayFrame;
