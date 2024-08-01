import React from "react";
import Chatbox from "../components/Chatbox";
import BasicBtn from "../components/btn/BasicBtn";
import ExitBtn from "../components/btn/ExitBtn";
import GameTurns from "../components/GameTurns";

import { useNavigate } from "react-router-dom";

const SelfIntroduction = () => {
  const btnText = "다음";
  const userText = "단 것을 좋아하는";
  
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/photo-first");
  };

  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Top Div */}
        <div className="h-[5%] flex justify-between items-center">
          <div className="w-[90%] flex justify-center absolute top-3">
            <GameTurns sectionNumber={1} />
          </div>
          <div className="w-[10%] flex justify-center">
            <ExitBtn />
          </div>
        </div>

        {/* Middle Div */}
        <div className="flex-grow flex overflow-hidden mt-5 h-[52vh]">
          <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
            <p className="m-5">camera background</p>
          </div>
          <div className="flex-[3] ml-5 h-full rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
            <Chatbox />
          </div>
        </div>

        {/* Bottom Div */}
        <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
          <div className="flex-grow flex items-center justify-center relative">
            <span>나는</span>
            <span className="text-transparent">&nbsp;</span>
            <span className="text-[rgb(129,109,255)] border-solid border-b-4 border-[rgb(129,109,255)]">
              {userText}
            </span>
            <span className="text-transparent">&nbsp;</span>
            <span>사람이다.</span>
          </div>
          <div className="absolute bottom-3 right-5">
            <BasicBtn btnText={btnText} onClick={handleNextStep} />
          </div>
          <img
            src="src/assets/thinking_character.png"
            alt="생각하는 캐릭터 그림"
            className="absolute bottom-0 left-0 mb-3 ml-3 max-w-[100px] max-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SelfIntroduction;
