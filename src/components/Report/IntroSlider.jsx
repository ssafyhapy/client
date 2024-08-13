import React from "react";

const IntroSlide = ({ slide }) => (
  <div className="flex flex-col items-center gap-4">
    <p className="text-base">{slide.memberName}</p>
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p className="text-base ">나는</p>
      <p className="text-2xl font-extrabold">{slide.content}</p>
      <p className="text-base">(이)다</p>
    </div>
  </div>
);

export default IntroSlide;
