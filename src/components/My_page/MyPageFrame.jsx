import React from "react";

const MyPageFrame = ({ children }) => {
  return (
    <div className="w-[1024px] h-[600px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] absolute z-10 flex justify-center items-start p-10 overflow-y-auto scrollbar-hide">
      {children}
    </div>
  );
};
export default MyPageFrame;
