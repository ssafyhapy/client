import React from "react";
import X from "./X";
import O from "./O";

const OxSlide = ({ slide }) => (
  <div className="flex flex-col items-center gap-8 flex-wrap">
    <p>{slide.memberName}</p>
    {slide.oxResponseDtos.map((response, index) => (
      <div key={index} className="relative flex items-center justify-center">
        {/* 내용과 아이콘을 겹치게 하기 위한 컨테이너 */}
        <p className="text-3xl">{response.content}</p>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 아이콘을 중앙에 겹치도록 설정 */}
          {response.answer ? <O /> : <X />}
        </div>
      </div>
    ))}
  </div>
);

export default OxSlide;
