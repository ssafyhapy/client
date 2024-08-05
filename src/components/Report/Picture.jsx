import React from "react";

const Picture = () => {
  return (
    <div className="w-[820px] h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5 relative">
      <div className="h-[200px] w-[50%] bg-white flex justify-center items-center">
        <div className="h-[150px] w-[90%] bg-gray-300 flex justify-center items-center">
          before
        </div>
      </div>
      <div className="h-[200px] w-[50%] bg-white flex justify-center items-center">
        <div className="h-[150px] w-[90%] bg-gray-300 flex justify-center items-center">
          after
        </div>
      </div>
    </div>
  );
};

export default Picture;
