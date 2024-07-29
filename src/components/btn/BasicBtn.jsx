import React from "react";

const BasicBtn = ({ btnText }) => {
  console.log;
  return (
    <button className="w-[76px] h-[30px] rounded-[30px] text-[#458EF7] text-[16px] bg-custom-gradient-basicBtn shadow-[0_4px_10px_rgba(66,72,81,0.5)]">
      {btnText}
    </button>
  );
};
export default BasicBtn;
