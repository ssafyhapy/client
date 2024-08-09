import React from "react";
// import smileyface from "src/assets/Common/smileyface.webp"

const EmojiBtn = () => {
  const smileyface = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/smileyface.webp"
  return (
    // smileyface
    <div>
      <button className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[40px] h-[40px]"
          src={smileyface}
          alt="smileyface"
        />
      </button>
    </div>
  );
};

export default EmojiBtn;
