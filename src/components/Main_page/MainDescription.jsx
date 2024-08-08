import React from "react";
import ScrollDownBtn from "./ScrollDownBtn";
import SecondDescription from "./SecondDescription";

const MainDescription = () => {
  return (
    <>
      <div className="w-[90%] h-[90%] flex flex-col justify-between items-center relative">
        <h1 className="opacity-45 text-3xl self-start">
          새로운 관계를 위한 첫 걸음
        </h1>
        <div className="flex justify-between gap-10">
          {/* <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe>
          <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe> */}
          <h1 className="text-[#4D98F7] text-[200px] self-center z-10 jua-regular">
            사르르
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
        <SecondDescription />
        <div className="z-50 top">
          <ScrollDownBtn />
        </div>
      </div>
    </>
  );
};

export default MainDescription;
