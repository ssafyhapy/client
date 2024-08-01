import React, { useState, useEffect } from "react";
import ExitBtn from "../../../components/Buttons/ExitBtn";
import BasicBtn from "../../../components/Buttons/BasicBtn";
import Chatbox from "../../../components/Common/Chatbox";
import GameTurns from "../../../components/Common/GameTurns";

import { useNavigate } from "react-router-dom";

const GuessMe = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const userText = "1. 내 MBTI는 ISTP이다.";
  const btnText = "다음";
  const timerImg = "src/assets/common/timer.png";
  const correctImg = "src/assets/Guess_me/correct_circle.png";
  const wrongImg = "src/assets/Guess_me/wrong_x.png";
  const answer = true; // Assuming this is a boolean indicating the correct answer

  const handleNextStep = () => {
    navigate("/balance-getready");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Top Div */}
        <div className="h-[5%] flex justify-between items-center">
          <div className="w-[90%] flex justify-center absolute top-3">
            <GameTurns sectionNumber={2} />
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
            <span className="text-[rgba(85,181,236)]">{userText}</span>
            {showResult && (
              <img
                src={answer ? correctImg : wrongImg}
                alt={answer ? "Correct" : "Wrong"}
                className="absolute w-[50px] h-[50px]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>
          <div className="absolute bottom-3 right-5 flex flex-col items-center">
            <div className="flex items-center mb-2">
              <img src={timerImg} alt="Timer" className="w-5 h-5 mr-2" />
              <span className="text-red-500">{secondsLeft}</span>
            </div>
            {showResult && (
              <BasicBtn btnText={btnText} onClick={handleNextStep} />
            )}
          </div>
          <img
            src="src/assets/Guess_me/questionmark.png"
            alt="물음표 두개 그림"
            className="absolute bottom-0 left-0 mb-3 ml-3"
          />
        </div>
      </div>
    </div>
  );
};

export default GuessMe;
