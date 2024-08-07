import React from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../../store/useGameStore";
import useBalanceStore from "../../store/useBalanceStore";
import Chatbox from "../../components/Common/Chatbox";
import ExitBtn from "../../components/Buttons/ExitBtn";
import GameTurns from "../../components/Common/GameTurns";
import refresh from "./../../assets/Balance_game/refresh.png";

const BalanceChangeChoices = ({ onConfirm }) => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const { pickedChoice, setPickedChoice } = useBalanceStore();
  const { discussedNum, setDiscussedNum } = useBalanceStore();
  const balanceChoicesHard = {
    first: "밸런스 게임 A",
    second: "밸런스 게임 B",
  };

  const updateBalanceChoices = () => {
    setPickedChoice(null);
    // setBalanceChoices({first:, second:})
  };

  const handleConfirmChoices = () => {
    setDiscussedNum((prevNum) => prevNum + 1);
    setPickedChoice(null);
    onConfirm(); // 주제 확정 후 다음 단계로 이동
  };

 const handleNextStep=()=>{
  setGameStep("wrap-up")
 }
  

  return (
    <>
        <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
          <div className="flex-grow flex items-center justify-center relative gap-5">
            <div
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
            </div>
            <span className="text-[#FF607F]">VS</span>
            <div
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
            </div>
          </div>
          <div
            className={`absolute top-3 left-10 ${
              discussedNum >= 5 ? "hidden" : ""
            }`}
          >
            <div>
              <button
                onClick={updateBalanceChoices}
                className="flex flex-col justify-center items-center "
              >
                <img src={refresh} alt="주제 변경" className="w-[80%]" />
              </button>
              <div className="text-[12px]">주제 변경</div>
            </div>
          </div>

          <div
            className={`text-[14px] text-[rgba(0,0,0,0.5)] absolute right-5 top-2 ${
              discussedNum === null ? "hidden" : ""
            }`}
          >
            현재 토론 완료 : {discussedNum}/5
          </div>
          <div className="absolute bottom-3 right-5 flex flex-col items-center">
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={handleConfirmChoices}
                className={`bg-[rgba(150,165,254,0.6)] text-white w-[76px] h-[30px] text-[16px] rounded-[30px] mb-3 shadow-[0_4px_10px_rgba(66,72,81,0.5)] ${
                  pickedChoice !== null ? "hidden" : ""
                } ${discussedNum >= 5 ? "hidden" : ""}`}
              >
                주제 확정
              </button>
              <button
                onClick={handleNextStep}
                className="w-[76px] h-[30px] rounded-[30px] text-[#458EF7] text-[16px] bg-custom-gradient-basicBtn shadow-[0_4px_10px_rgba(66,72,81,0.5)]"
              >
                다음 단계
              </button>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default BalanceChangeChoices;
