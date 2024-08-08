import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";


const ThirdService = () => {
  return (
    <div className="">
      <NavBar />
      <div className="flex flex-col gap-2">
        <p className="text-sm opacity-80">
          게임이 모두 끝나면 오늘 한 플레이에 대한 레포트를 받아보실 수 있어요.{" "}
        </p>
        <p className="text-sm opacity-80">
          각자 했던 자기소개나 나를 맞춰봐 문제들을 다시 확인할 수 있어요.
        </p>
      </div>
      <iframe src="https://lottie.host/embed/aab4cb28-19fa-4f9a-a135-7c9dd3051300/3AdT1jVKUW.json"></iframe>
      <PlayBtn />
    </div>
  );
};

export default ThirdService;
