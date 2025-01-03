import React from "react";
// import mask from "../../assets/Camera_check/mask.webp"

const MaskBtn = ({onClick}) => {
  const mask = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mask.webp"
  return (
    // mask 고르는 버튼
    <div>
      <button onClick={onClick} className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]">
        <img
          className="w-[43px] h-[43px]"
          src={mask}
          alt="mask"
        />
      </button>
    </div>
  );
};

export default MaskBtn;
