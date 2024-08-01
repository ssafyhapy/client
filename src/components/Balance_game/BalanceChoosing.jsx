import React, { useState, useEffect } from "react";
import useBalanceStore from "../../store/useBalanceStore";
import Chatbox from "../Chatbox";
import ExitBtn from "../btn/ExitBtn";
import GameTurns from "../GameTurns";

const BalanceChoosing = ({ onTimerEnd, currentStep }) => {
  const { pickedChoice, setPickedChoice } = useBalanceStore();
  const { discussedNum } = useBalanceStore();

  const balanceChoicesHard = {
    first: "밸런스 게임 A",
    second: "밸런스 게임 B",
  };

  const timerImg = "src/assets/timer.png";

  const handlePickedChoice = (choice) => {
    setPickedChoice(choice); 
  };

  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (currentStep){
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

    return () => clearInterval(timer);} // 컴포넌트 언마운트 시 타이머 클리어
  }, [currentStep]); // onTimerEnd를 의존성 배열에 포함

  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Top Div */}
        <div className="h-[5%] flex justify-between items-center">
          <div className="w-[90%] flex justify-center absolute top-3">
            <GameTurns sectionNumber={3} />
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
          <div className={`text-[14px] text-[rgba(0,0,0,0.5)] absolute right-5 top-2 ${discussedNum===null?"hidden":""}`}>
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
        </div>
      </div>
    </div>
  );
};

export default BalanceChoosing;
