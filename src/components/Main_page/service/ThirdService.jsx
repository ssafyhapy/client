import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import MainHomeFrame from "../MainHomeFrame";

const ThirdService = () => {
  return (
    <MainHomeFrame>
      <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
        <NavBar />

        <div className="flex gap-5">
          <iframe src="https://lottie.host/embed/aab4cb28-19fa-4f9a-a135-7c9dd3051300/3AdT1jVKUW.json"></iframe>

          <div className="flex flex-col gap-5">
            <p className="text-3xl opacity-50">
              게임이 모두 끝나면 오늘 한 플레이에
            </p>
            <p className="text-3xl opacity-50">
              대한 레포트를 받아보실 수 있어요.
            </p>
            <p className="text-3xl opacity-50">각자 했던 한줄 자기소개나</p>
            <p className="text-3xl opacity-50">
              나를 맞춰봐 문항들을 다시 확인할 수 있어요.
            </p>
          </div>
        </div>
        <div className="self-end">
          <PlayBtn />
        </div>
      </div>
    </MainHomeFrame>
  );
};

export default ThirdService;
