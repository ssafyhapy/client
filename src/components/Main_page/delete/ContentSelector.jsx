import React from "react";

const ContentSelector = ({ content, setContent }) => {
  return (
    <div className="w-[700px] h-[40px] bg-[rgba(255,255,255,0.7)] rounded-[15px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] flex items-center justify-center space-x-4">
    <button
      onClick={() => setContent("service")}
      className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
    >
      서비스 소개
    </button>
    <button
      onClick={() => setContent("selfIntroduction")}
      className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
    >
      한 줄 자기소개
    </button>
    <button
      onClick={() => setContent("guessMe")}
      className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
    >
      나를 맞춰봐
    </button>
    <button
      onClick={() => setContent("balanceGame")}
      className="bg-white w-[168px] h-[40px] flex items-center justify-center text-[20px] text-[#4D98F7] rounded-[15px]"
    >
      밸런스 게임
    </button>
  </div>
  )

}

export default ContentSelector;