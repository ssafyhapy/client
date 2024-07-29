import React from "react";

const MaskBtn = ({onClick}) => {
  return (
    // mask 고르는 버튼
    <div>
      <button onClick={onClick} className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[43px] h-[43px]"
          src="src/assets/mask.webp"
          alt="smileyface"
        />
      </button>
    </div>
  );
};

export default MaskBtn;
