import React from "react";
// import mic from "../../assets/Common/mic.webp"

const MicBtn = () => {
  const mic = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic.png"
  return (
    // 마이크 버튼
    <div>
      <button className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[43px] h-[43px]"
          src={mic}
          alt="smileyface"
        />
      </button>
    </div>
  );
};

export default MicBtn;
