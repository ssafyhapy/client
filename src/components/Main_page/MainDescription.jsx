import React from "react";
import ScrollDownBtn from "./ScrollDownBtn";

const MainDescription = () => {

  return (
    <>
      <h1 className="absolute top-[-50px] left-10 text-[#4D98F7] text-2xl">
        새로운 관계를 위한 첫 걸음
      </h1>
      <div className="flex flex-col space-y-20">
        <h1 className="text-9xl text-[#4D98F7] pt-12">사르르</h1>
        <div className="flex flex-col space-y-5">
          <h1 className="text-black opacity-20 text-3xl">
            오프라인에서의 어색한 첫 만남, 걱정되지는 않으신가요?
          </h1>
          <h1 className="text-black opacity-20 text-3xl">
            오프라인에서 처음 만나 대화를 나누고 서로에 대해 알아가고
          </h1>
          <h1 className="text-black opacity-20 text-3xl">
            친밀도를 올리기에는 시간도 체력도 부족한 당신을 위해
          </h1>
        </div>
        <ScrollDownBtn />
      </div>
    </>
  );
};

export default MainDescription;
