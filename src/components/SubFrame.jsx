import React from "react";

const SubFrame = ({ children }) => {
  return (
    <div className="w-full h-full max-w-[80%] max-h-[80%] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col items-center overflow-y-auto scrollbar-hide">
      {children}
    </div>
  );
};
export default SubFrame;
