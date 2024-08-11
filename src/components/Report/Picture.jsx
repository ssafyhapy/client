import React from "react";

const Picture = ({ before, after }) => {
  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5">
      <div className="h-[200px] w-full bg-white flex justify-center items-center">
        <div className="h-[150px] w-[90%] bg-gray-300 flex justify-center items-center">
          {before && <img src={before} alt="" className="w-full h-full object-cover"/>}
        </div>
      </div>
      <div className="h-[200px] w-full bg-white flex justify-center items-center">
        <div className="h-[150px] w-[90%] bg-gray-300 flex justify-center items-center">
          {after && <img src={after} alt="" className="w-full h-full object-cover"/>}
        </div>
      </div>
    </div>
  );
};

export default Picture;
