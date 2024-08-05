import React from "react";
import Carousel from "../Carousel";

const Step2 = () => {
  return (
    <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] rounded-[20px] flex p-5 gap-5 relative">
      <div className="absolute top-[-10px] left-[-10px] rounded-[20px] bg-white w-[20%] h-[20%] flex justify-center items-center">
        <h1>step 2</h1>
      </div>
      <Carousel>
        <h1>나도 캐러셀이다.</h1>
      </Carousel>
    </div>
  );
};

export default Step2;
