import React from "react";

const VideochatButton = () => {
  return (
    <div>
      {/* smileyfacebutton */}
      <button className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[40px] h-[40px]"
          src="src/assets/smileyface.webp"
          alt="smileyface"
        />
        {/* maskbutton */}
      </button>
      <button className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[43px] h-[43px]"
          src="src/assets/mask.webp"
          alt="smileyface"
        />
      </button>
      {/* micbutton */}
      <button className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[43px] h-[43px]"
          src="src/assets/mic.webp"
          alt="smileyface"
        />
      </button>
    </div>
  );
};

export default VideochatButton;
