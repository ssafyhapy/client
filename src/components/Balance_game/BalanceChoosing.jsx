import React, { useState, useEffect } from "react";
import useBalanceStore from "../../store/useBalanceStore";
import Chatbox from "../../components/Common/Chatbox";
import ExitBtn from "../../components/Buttons/ExitBtn";
import GameTurns from "../../components/Common/GameTurns";
// import timerImg from "./../../assets/Common/timer.png"

const BalanceChoosing = ({ onTimerEnd, currentStep }) => {
  const timerImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/timer.png"

  const { pickedChoice, setPickedChoice } = useBalanceStore();
  const { discussedNum } = useBalanceStore();

  const balanceChoicesHard = {
    first: "밸런스 게임 A",
    second: "밸런스 게임 B",
  };

  const handlePickedChoice = (choice) => {
    setPickedChoice(choice);
  };

  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (currentStep) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(timer);
            onTimerEnd(); // 타이머가 0이 되었을 때 호출
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    } // 컴포넌트 언마운트 시 타이머 클리어
  }, [currentStep]); // onTimerEnd를 의존성 배열에 포함

  return (
    <>
      {/* Bottom Div */}
      <div
        className={`text-[14px] text-[rgba(0,0,0,0.5)] absolute right-5 top-2 ${
          discussedNum === null ? "hidden" : ""
        }`}
      >
        현재 토론 완료 : {discussedNum}/5
      </div>
      <div className="flex-grow flex items-center justify-center relative gap-5">
        <button
          onClick={() => handlePickedChoice(1)}
          className={`text-[rgba(85,181,236)] px-2 py-3 rounded-[15px] ${
            pickedChoice === 1
              ? "border-solid border-4 border-[#64B8FF]"
              : "border-transparent"
          }`}
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(30, 144, 255, 0.3))",
          }}
        >
          {balanceChoicesHard.first}
        </button>
        <span className="text-[#FF607F]">VS</span>
        <button
          onClick={() => handlePickedChoice(2)}
          className={`text-[#FF6A89] px-2 py-3 rounded-[15px] ${
            pickedChoice === 2
              ? "border-solid border-4 border-[rgba(254,176,207)]"
              : "border-transparent"
          }`}
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(255,96,127,0.5))",
          }}
        >
          {balanceChoicesHard.second}
        </button>
      </div>
      <div className="flex items-center mb-2 absolute top-3 left-10">
        <img src={timerImg} alt="Timer" className="w-5 h-5 mr-2" />
        <span className="text-red-500">{secondsLeft}</span>
      </div>
    </>
  );
};

export default BalanceChoosing;
