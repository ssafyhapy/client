import React from "react";
import Vs from "./Vs";

const BalanceSlide = ({ slide }) => (
  <div className="w-full h-full flex gap-5 justify-center items-start">
    <div className="w-full h-full flex flex-col items-center gap-5 ">
      <p className="text-3xl text-center text-gray-600">{slide.balanceQuestionOptionFirst}</p>

      <div className="w-full flex flex-wrap justify-center items-center gap-2">
        {slide.balanceResultResponseDtos.map(
          (response, index) =>
            response.balanceResultSelectedOption === "FIRST" && (
              <p key={index} className="text-xl font-extrabold text-[#C2ACF4]">
                {response.memberName}
              </p>
            )
        )}
      </div>
    </div>
    <div className="w-[10%] h-full flex justify-center items-center">
      <p className="text-4xl text-[#9400d3b0] font-extrabold" >VS</p>
    </div>

    <div className="w-full h-full flex flex-col items-center gap-5">
      <p className="text-3xl text-center text-gray-600">
        {slide.balanceQuestionOptionSecond}
      </p>
      <div className="w-full flex flex-wrap justify-center items-center gap-2">
        {slide.balanceResultResponseDtos.map(
          (response, index) =>
            response.balanceResultSelectedOption === "SECOND" && (
              <p key={index} className="text-xl font-extrabold text-[#C2ACF4]">
                {response.memberName}
              </p>
            )
        )}
      </div>
    </div>
  </div>
);

export default BalanceSlide;
