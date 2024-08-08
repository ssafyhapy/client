import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";

const FirstService = () => {
  return (
    <div>
      <div className="w-full">
      <NavBar />
      </div>
      <p className="text-sm opacity-80">
        사르르는 어떤 목적으로 모인 그룹이든 첫 만남에 어색하지 않도록
      </p>
      <p className="text-sm opacity-80">
        서로를 알아가는 시간을 가질 수 있도록 다양한 게임으로 구성된 화상 채팅
        서비스입니다.
      </p>
      <p className="text-sm opacity-80">
        구성되어 있는 게임들을 하나하나 따라가는 것만으로도 서로를 더 잘
        이해하게 될 거예요.
      </p>

      <h1 className="text-base text-[#4D98F7] mt-5 mb-5">
        사르르만의 독특한 서비스
      </h1>
      <PlayBtn />
    </div>
  );
};

export default FirstService;
