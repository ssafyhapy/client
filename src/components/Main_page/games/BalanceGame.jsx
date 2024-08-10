import React from "react";
const BalanceGame = () => {
  return (
    <div className="flex">
      <iframe src="https://lottie.host/embed/cd990655-08aa-4206-84f2-14c4ea6c9cc9/EUSLBGOxOM.json"></iframe>
      <div className="w-[350px] h-[300px] bg-white rounded-[30px] flex flex-col gap-3 items-center justify-center">
        <p className="text-black opacity-50">일상의 사소한 결정들!</p>
        <p className="text-black opacity-50">
          참 많은 일에 결정이 갈리곤 하죠.
        </p>
        <p className="text-black">
          <span className="opacity-50">저희 밸런스 게임은</span> <span className="text-[#4D98F7]">모임과 관련된 주제 혹은</span>
        </p>
        
        <p className="text-black">
          <span className="text-[#4D98F7]">재미있는 주제</span><span className="opacity-50">를 주기도 할 거예요!</span>
        </p>
        <p className="text-[#4D98F7]">
          랜덤으로 제공되는 밸런스 게임의 주제를 통해
        </p>
        <p className="text-black opacity-50">
          치열하게 토론하며 더 친밀해져 보세요.
        </p>
      </div>
    </div>
  );
};

export default BalanceGame;
