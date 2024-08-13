import React from "react";
import Vs from "./Vs";

const BalanceSlide = ({ slide }) => (
  <div className="w-full h-full flex gap-5 justify-center items-start">
    <div className="w-full h-full flex flex-col items-center gap-5 ">
      <p className="text-3xl text-center text-gray-600">{slide.balanceQuestionOptionFirst}</p>

      <div className="w-full flex justify-center items-center gap-2">
        {slide.balanceResultResponseDtos.map(
          (response, index) =>
            response.balanceResultSelectedOption === "FIRST" && (
              <p key={index} className="text-xl font-extrabold text-[#aa2d6b]">
                {response.memberName}
              </p>
            )
        )}
      </div>
    </div>
    <div className="w-[10%] h-full flex justify-center items-center">
      <Vs />
    </div>

    <div className="w-full h-full flex flex-col items-center gap-5">
      <p className="text-3xl text-center text-gray-600">
        {slide.balanceQuestionOptionSecond}
      </p>
      <div className="w-full flex justify-center items-center gap-2">
        {slide.balanceResultResponseDtos.map(
          (response, index) =>
            response.balanceResultSelectedOption === "SECOND" && (
              <p key={index} className="text-xl font-extrabold text-[#aa2d6b]">
                {response.memberName}
              </p>
            )
        )}
      </div>
    </div>
  </div>
);

export default BalanceSlide;
