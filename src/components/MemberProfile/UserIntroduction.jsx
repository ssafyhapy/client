import React from "react";

const UserIntroduction = ({ memberIntroduction }) => {
  return (
    <div className="w-full h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
      <div className="w-full flex flex-col justify-center gap-5">
        <h1 className="text-3xl text-[#9400d3b0]">About me</h1>
        {memberIntroduction ? <p className="text-2xl">{memberIntroduction}</p> : <p>No content</p>}
      </div>
    </div>
  );
};
export default UserIntroduction;
