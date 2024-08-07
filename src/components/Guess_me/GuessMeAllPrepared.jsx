import React from "react";
import Chatbox from "./../Common/Chatbox";
import star from "../../assets/Common/star.png";

const GuessMeAllPrepared = ({ guessMeStep, setGuessMeStep }) => {
  return (
    <>
      
      {/* Bottom Div */}
      <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
        <div className="flex-grow flex items-center justify-center">
          <img src={star} alt="star 그림" />
          <span className="text-transparent">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-[rgba(85,181,236)]">전원 준비 완료!!</span>
          <span className="text-transparent">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <img src={star} alt="star 그림" />
        </div>
        <div className="flex justify-end"></div>
      </div>
    </>
  );
};

export default GuessMeAllPrepared;
