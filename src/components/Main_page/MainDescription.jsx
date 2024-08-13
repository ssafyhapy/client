import React from "react";
import ScrollDownBtn from "./ScrollDownBtn";
import RotateDescription from "./RotateDescription";
import MainFrame from "../MainFrame";

const MainDescription = () => {
  return (
    <MainFrame>
      <div className="w-[90%] h-[90%] flex flex-col justify-between items-center relative">
        <h1 className="opacity-45 text-3xl self-start">AR 테스트중임</h1>
        <div className="flex justify-between gap-10">
          {/* <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe>
          <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe> */}
          <h1 className="text-[#4D98F7] text-[156px] self-center z-10 jua-regular">
            AR 테스트중임 3분만 쓸게요
          </h1>
          <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe>
        </div>
        {/* <h1
            className="text-[70px] self-center z-10 font-bold"
            style={{
              WebkitTextStroke: "2px #4D98F7",
              color: "transparent",
            }}
          >
            사르르
          </h1> */}
        <RotateDescription
          sentences={["AR 테스트중임", "AR 테스트중임", "AR 테스트중임"]}
          fontsize="32px"
          time="5000"
        />
        <div className="z-50 top">
          <ScrollDownBtn text="더 보기" />
        </div>
      </div>
    </MainFrame>
  );
};

export default MainDescription;
