import React from "react";
import ScrollDownBtn from "./ScrollDownBtn";

const MainDescription = () => {
  return (
    <>
      <div className="w-[80%] h-[80%] flex flex-col justify-between items-center relative">
        <h1 className="opacity-45 text-3xl self-start">
          새로운 관계를 위한 첫 걸음
        </h1>
        <div className="flex">
          <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe>
          <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe>
          <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe>
        </div>
        <div className="h-full flex gap-10 items-center">
          <h1
            className="text-[70px] self-center z-10 font-bold"
            style={{
              WebkitTextStroke: "2px #4D98F7",
              color: "transparent",
            }}
          >
            사르르
          </h1>
          <h1 className="text-[#4D98F7] text-[120px] self-center z-10">
            사르르
          </h1>
          <h1
            className="text-[70px] self-center z-10 font-bold"
            style={{
              WebkitTextStroke: "2px #4D98F7",
              color: "transparent",
            }}
          >
            사르르
          </h1>
        </div>
        <div className="z-50">
          <ScrollDownBtn />
        </div>
        <iframe
          className="absolute bottom-0 right-1/4 z-0"
          src="https://lottie.host/embed/f6bb91ac-8201-41a9-b1d5-87508a4d6679/0NOCFwtC2K.json"
        ></iframe>
      </div>
    </>
  );
};

export default MainDescription;
