import React from "react";
const BottomDiv = ({ children }) => {
  return (
    <div id="bottomDiv" className="w-[100%] flex justify-center mb-5">
      <div className="flex-none w-[95%] h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
        {children}
      </div>
    </div>
  );
};

export default BottomDiv;
