import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import MainFrame from "../../MainFrame";

const LastService = () => {
  return (
    <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
      <NavBar />
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <p className="text-3xl opacity-50">온라인에서의 첫 만남이</p>
          <p className="text-3xl opacity-50">
            조금 덜 어색하고, 조금 더 재미있도록!
          </p>
          <p className="text-3xl opacity-50">가면을 쓰고 게임을 하며</p>
          <p className="text-3xl opacity-50">알아가는 시간을 가져요.</p>
          <p className="text-xl opacity-30">
            * 가면은 마지막 세션인 랩업에서 벗게 될 거예요.
          </p>
        </div>
        <iframe src="https://lottie.host/embed/c924990c-7e15-4888-948c-ab88b111c16a/9bCc8fUiES.json"></iframe>
      </div>
      <div className="self-end">
        <PlayBtn />
      </div>
    </div>
  );
};

export default LastService;
