import React from "react";

const O = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="22" cy="22" r="18" stroke="#9400d3b0" strokeWidth="6" />
  </svg>
);

const X = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="7"
      y1="7"
      x2="37"
      y2="37"
      stroke="#C2ACF4"
      strokeWidth="6"
    />
    <line
      x1="37"
      y1="7"
      x2="7"
      y2="37"
      stroke="#C2ACF4"
      strokeWidth="6"
    />
  </svg>
);


const OxSlide = ({ slide }) => (
  <div className="w-full flex flex-col items-center gap-8">
    <p className="text-3xl font-extrabold text-[#aa2d6b]">{slide.memberName}</p>
    {slide.oxResponseDtos.map((response, index) => (
      <div key={index} className="w-full flex items-center justify-center gap-5 ">
        {/* 내용과 아이콘을 겹치게 하기 위한 컨테이너 */}
        <p className=" text-2xl text-gray-600">{response.content}</p>
        <div className="flex items-center justify-center">
          {/* 아이콘을 중앙에 겹치도록 설정 */}
          {response.answer ? <O /> : <X />}
        </div>
      </div>
    ))}
  </div>
);

export default OxSlide;
