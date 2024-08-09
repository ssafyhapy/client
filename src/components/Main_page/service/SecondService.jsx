import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import MainHomeFrame from "../MainHomeFrame";

const SecondService = () => {
  return (
    <MainHomeFrame>
      <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
        <NavBar />
        <div className="flex gap-5">
          <div className="flex flex-col gap-5">
            <p className="text-3xl opacity-50">
              오늘 우리가 처음 만난 이 순간!
            </p>
            <p className="text-3xl opacity-50">기념촬영을 해 기록을 남겨요.</p>
            <p className="text-3xl opacity-50">
              사진은 마이페이지의 추억상자에서
            </p>
            <p className="text-3xl opacity-50">
              다시 보며 추억을 되새길 수 있어요.
            </p>
          </div>
          <iframe src="https://lottie.host/embed/53c4bf92-22a8-4f56-a53e-7b175a27b5a8/QkwtuerjJG.json"></iframe>
        </div>
        <div className="self-end">
          <PlayBtn />
        </div>
      </div>
    </MainHomeFrame>
  );
};

export default SecondService;
