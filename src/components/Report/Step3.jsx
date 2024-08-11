import React from "react";
import Carousel from "./Carousel";

const Step3 = ({ Balance }) => {
  console.log("Balance", Balance);

  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] rounded-[20px] flex p-5 gap-5 relative">
      <div className="absolute top-[-10px] left-[-10px] rounded-[20px] bg-white w-[10%] h-[20%] flex justify-center items-center">
        <h1>step 3</h1>
      </div>
      <Carousel slides={Balance} type="balance">
        <div></div>
      </Carousel>
    </div>
  );
};

export default Step3;
