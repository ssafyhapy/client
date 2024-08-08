import React from "react";
import MainHomeFrame from "../MainHomeFrame";

const BalanceGame = () => {
  return (
    <MainHomeFrame>
      <iframe src="https://lottie.host/embed/cd990655-08aa-4206-84f2-14c4ea6c9cc9/EUSLBGOxOM.json"></iframe>
      <p className="w-[350px] h-[300px] bg-white rounded-[30px] flex justify-center items-center">
        이미지
      </p>
      <div className="w-[350px] h-[300px] bg-white rounded-[30px] flex flex-col gap-3 items-center justify-center">
        <h1 className="text-base opacity-80">밸런스 게임</h1>
        <p className="text-black opacity-20">일상의 사소한 결정들!</p>
        <p className="text-black opacity-20">
          참 많은 일에 결정이 갈리곤 하죠.
        </p>
        <p className="text-black opacity-20">
          저희 밸런스 게임은 모임과 관련된 주제 혹은
        </p>
        <p className="text-black opacity-20">
          재미있는 주제를 주기도 할 거예요!
        </p>
        <p className="text-black opacity-20">
          랜덤으로 제공되는 밸런스 게임의 주제를 통해
        </p>
        <p className="text-black opacity-20">
          치열하게 토론하며 더 친밀해져 보세요.
        </p>
      </div>
    </MainHomeFrame>
  );
};

export default BalanceGame;
