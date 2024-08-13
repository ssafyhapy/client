import React from "react";
import ScrollDownBtn from "./ScrollDownBtn";
import RotateDescription from "./RotateDescription";
import MainFrame from "../MainFrame";

const MainDescription = ({onNextSection}) => {
  return (
    <div className="w-[90%] h-[90%] flex flex-col justify-between items-center relative">
      <h1 className="opacity-45 text-3xl self-start">
        새로운 관계를 위한 첫 걸음
      </h1>
      <div className="flex justify-between gap-10">
        <h1 className="text-[#9400d3b0] text-[156px] self-center z-10 jua-regular">
          사르르
        </h1>
        {/* <iframe src="https://lottie.host/embed/7b087024-b29f-4049-9373-1ffd9735b411/MwhAEk65d8.json"></iframe> */}
        {/* <iframe src="https://lottie.host/embed/e61d9aab-2ad6-4958-9b92-59f308e61607/fzeD0O9H5M.json"></iframe> */}
        <iframe src="https://lottie.host/embed/6a75e862-d36b-42f8-9ef4-146cd6a85b1b/6PP0EMRQsD.json"></iframe>
      </div>
      <RotateDescription
        sentences={[
          "오프라인에서의 어색한 첫 만남, 걱정되지는 않으신가요?",
          "오프라인에서 처음 만나 대화를 나누고 서로에 대해 알아가고",
          "친밀도를 올리기에는 시간도 체력도 부족한 당신을 위해",
        ]}
        fontsize="32px"
        time="5000"
      />
    </div>
  );
};

export default MainDescription;
