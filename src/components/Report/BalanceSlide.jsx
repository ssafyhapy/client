import React from "react";
import Vs from "./Vs";

const BalanceSlide = ({ slide }) => (
  <div>
    <div className="w-full h-full flex gap-5 items-start">

      <div className="w-auto h-full flex flex-col gap-5 ">
        <p className="text-4xl text-right">{slide.balanceQuestionOptionFirst}</p>

        <div className="w-full flex flex-row-reverse gap-2 flex-nowrap">
          {slide.balanceResultResponseDtos.map(
            (response, index) =>
              response.balanceResultSelectedOption === "FIRST" && (
                <p key={index}>{response.memberName}</p>
              )
          )}
        </div>
      </div>

      <Vs />

      <div className="w-auto h-full flex flex-col gap-5">
        <p className="text-4xl text-left">{slide.balanceQuestionOptionSecond}</p>
        <div className="flex gap-2 flex-nowrap">
          {slide.balanceResultResponseDtos.map(
            (response, index) =>
              response.balanceResultSelectedOption === "SECOND" && (
                <p key={index}>{response.memberName}</p>
              )
          )}
        </div>
      </div>
    </div>
  </div>
);

export default BalanceSlide;
