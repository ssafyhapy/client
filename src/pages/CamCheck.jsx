import React from "react";
import GameBackground from "../components/GameBackgound";
import GameDescriptionFrame from "./../components/GameDescriptionFrame";
import CameraCheckVideoView from "./../components/CameraCheckVideoView"
import MicBtn from "./../components/btn/MicBtn"
import MaskBtn from "./../components/btn/MaskBtn"


const CamCheck = () => {
  const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
  const btnText = "완료";
  return (
    <GameBackground>
      <div className="flex flex-col justify-center items-center p-[2rem] w-full">
        <div className="w-[70%]">
          <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px]">
            <div className="h-[28rem] flex justify-center items-center">
              <CameraCheckVideoView
                data={{ name: "someone", mic: false, ready: false }}
              />
            </div>
            <div className="flex justify-between"><span className="mr-10"><MicBtn/></span> <span><MaskBtn/></span></div>
          </div>
          <GameDescriptionFrame text={text} btnText={btnText} />
        </div>
      </div>
    </GameBackground>
  );
};

export default CamCheck;
