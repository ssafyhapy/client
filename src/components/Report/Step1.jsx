import React from "react";
import Carousel from "./Carousel";

const Step1 = ({ Intro }) => {
  console.log("Intro", Intro);

  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] rounded-[20px] flex py-5 gap-5 relative">
      <div className="absolute top-[-10px] left-[-10px] rounded-[20px] bg-white w-[20%] h-[20%] flex justify-center items-center">
        <h1>step 1</h1>
      </div>
      <Carousel slides={Intro} type="intro"></Carousel>
    </div>
  );
};

export default Step1;
