import React from "react";

const IntroSlide = ({ slide }) => (
  <div className="flex flex-col items-center gap-4">
    <p className="text-3xl font-extrabold text-[#aa2d6b]">{slide.memberName}</p>
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p className="text-base text-gray-600">나는</p>
      <p className="text-2xl font-extrabold text-gray-600">{slide.content}</p>
      <p className="text-base text-gray-600">다</p>
    </div>
  </div>
);

export default IntroSlide;
