import React from "react";
import X from "./X";
import O from "./O";

const OxSlide = ({ slide }) => (
  <div className="w-full flex flex-col items-center gap-8">
    <p>{slide.memberName}</p>
    {slide.oxResponseDtos.map((response, index) => (
      <div key={index} className="w-full flex items-center justify-center gap-5 ">
        {/* 내용과 아이콘을 겹치게 하기 위한 컨테이너 */}
        <p className=" text-2xl ">{response.content}</p>
        <div className="flex items-center justify-center">
          {/* 아이콘을 중앙에 겹치도록 설정 */}
          {response.answer ? <O /> : <X />}
        </div>
      </div>
    ))}
  </div>
);

export default OxSlide;
