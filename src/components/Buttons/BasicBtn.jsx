import React from "react";

const BasicBtn = ({ btnText, onClick, fontSize }) => {
  return (
    <button 
      onClick={onClick} 
      // 폰트사이즈 기본설정 클래스네임에 해둔거말고 따로 설정하고 싶을때 style에 props로 넘겨준 fontSize 적용
      style={{ fontSize: `${fontSize}px` }}
      className="w-[76px] h-[40px] rounded-[30px] text-[#458EF7] text-[16px] bg-custom-gradient-basicBtn shadow-[0_4px_10px_rgba(66,72,81,0.5)]"
    >
      {btnText}
    </button>
  );
};

export default BasicBtn;