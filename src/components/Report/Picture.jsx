import React from "react";

const Picture = ({ before, after }) => {
  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex p-5 gap-5">

      <div className="w-full h-auto bg-white flex justify-center items-center">
        <div className="max-w-[400px] flex justify-center items-center p-5">
          {before && <img src={before} alt="" className="max-w-full h-auto object-cover"/>}
        </div>
      </div>
      <div className="w-full h-auto bg-white flex justify-center items-center">
        <div className="max-w-[400px] flex justify-center items-center p-5">
          {after && <img src={after} alt="" className="max-w-full h-auto object-cover"/>}
        </div>
      </div>
    </div>
  );
};

export default Picture;
