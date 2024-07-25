import React from "react";

export default function DescriptionNav() {
  return (
    <div className="w-[800px] h-[60px] bg-[rgba(255,255,255,0.7)] rounded-[15px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] flex items-center justify-center space-x-4">
      <button className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]">
        서비스 소개
      </button>
      <button className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]">
        한 줄 자기소개
      </button>
      <button className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]">
        나를 맞춰봐
      </button>
      <button className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]">
        밸런스 게임
      </button>
    </div>
  );
}
