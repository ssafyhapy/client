import React from "react";

const EmojiBtn = () => {
  return (
    // smileyface
    <div>
      <button className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[40px] h-[40px]"
          src="src/assets/smileyface.webp"
          alt="smileyface"
        />
      </button>
    </div>
  );
};

export default EmojiBtn;
