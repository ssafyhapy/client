import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";


const LastService = () => {
  return (
    <div className="">
      <NavBar />
      <iframe src="https://lottie.host/embed/c924990c-7e15-4888-948c-ab88b111c16a/9bCc8fUiES.json"></iframe>
      <div className="flex flex-col gap-2">
        <p className="text-sm opacity-80">
          온라인에서의 첫 만남이 조금 덜 어색하고, 조금 더 재미있도록!{" "}
        </p>
        <p className="text-sm opacity-80">
          가면을 쓰고 게임을 하며 알아가는 시간을 가져요.가면은 마지막 세션인
          랩업에서 벗게 될 거예요.
        </p>
      </div>
      <PlayBtn />
    </div>
  );
};

export default LastService;
