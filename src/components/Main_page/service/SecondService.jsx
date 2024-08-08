import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import MainHomeFrame from "../MainHomeFrame";

const SecondService = () => {
  return (
    <MainHomeFrame>
      <NavBar />
      <div className="flex flex-col gap-2">
        <p className="text-sm opacity-80">
          오늘 우리가 처음 만난 이 순간! 기념촬영을 해 기록을 남겨요.{" "}
        </p>
        <p className="text-sm opacity-80">
          나중에 마이페이지의 추억상자에서 다시 보며 추억을 되새길 수 있어요.
        </p>
      </div>
      <iframe src="https://lottie.host/embed/53c4bf92-22a8-4f56-a53e-7b175a27b5a8/QkwtuerjJG.json"></iframe>
      <PlayBtn />
    </MainHomeFrame>
  );
};

export default SecondService;
