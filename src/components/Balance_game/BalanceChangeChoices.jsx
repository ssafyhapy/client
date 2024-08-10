import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../../store/useGameStore";
import useBalanceStore from "../../store/useBalanceStore";
import Chatbox from "../../components/Common/Chatbox";
import ExitBtn from "../../components/Buttons/ExitBtn";
import GameTurns from "../../components/Common/GameTurns";
// import refresh from "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/refresh.png";
// import refresh from "./../../assets/Balance_game/refresh.png"
import webSocketService from "../../WebSocketService";

const BalanceChangeChoices = ({
  memberId,
  hostId,
  roomId,
  purpose,
  onConfirm,
  optionFirst,
  optionSecond,
  discussedNum
}) => {
  const refresh =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/refresh.png";
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const { pickedChoice, setPickedChoice } = useBalanceStore();
  // const { discussedNum, setDiscussedNum } = useBalanceStore();

  const [First, setOptionFirst] = useState("");
  const [Second, setOptionSecond] = useState("");

  useEffect(() => {
    // 주제1, 2 받아온 데이터로 바꾸자
    setOptionFirst(optionFirst);
    setOptionSecond(optionSecond);
  });

  const updateBalanceChoices = () => {
    // 주제변경 버튼 누르면 다시 pub해줌
    webSocketService.sendBalancePurpose(roomId, purpose);
    setPickedChoice(null);
    // setBalanceChoices({first:, second:})
  };

  const handleConfirmChoices = () => {
    // 확정된 주제 백에 보내줌
    webSocketService.sendBalanceChosenTopic(roomId, optionFirst, optionSecond);
    // setDiscussedNum((prevNum) => prevNum + 1);
    setPickedChoice(null);
    onConfirm(); // 주제 확정 후 다음 단계로 이동 (이러면 호스트만 이동함.. 호스트만 이 버튼을 누를수있으니까)
  };

  const handleNextStep = () => {
    const memberState = "wrapup"
    webSocketService.sendMemberState(roomId, memberState)
    // setGameStep("wrap-up");
  };

  return (
    <>
      <div className="flex-grow flex items-center justify-center relative gap-5">
        <div
          className={`text-[rgba(85,181,236)] px-2 py-3 rounded-[15px] ${
            pickedChoice === "FIRST"
              ? "border-solid border-4 border-[#64B8FF]"
              : "border-transparent"
          } text-[14px]`}
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(30, 144, 255, 0.3))",
          }}
        >
          {First}
        </div>
        <span className="text-[#FF607F]">VS</span>
        <div
          className={`text-[#FF6A89] px-2 py-3 rounded-[15px] ${
            pickedChoice === "SECOND"
              ? "border-solid border-4 border-[rgba(254,176,207)]"
              : "border-transparent"
          } text-[14px]`}
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(255,96,127,0.5))",
          }}
        >
          {Second}
        </div>
      </div>
      <div
        className={`absolute top-3 left-10 ${
          discussedNum >= 5 ? "hidden" : ""
        }`}
      >
        {memberId == hostId && (
          <div>
            <button
              onClick={updateBalanceChoices}
              className="flex flex-col justify-center items-center "
            >
              <img src={refresh} alt="주제 변경" className="w-[80%]" />
            </button>
            <div className="text-[12px]">주제 변경</div>
          </div>
        )}
      </div>

      <div
        className={`text-[14px] text-[rgba(0,0,0,0.5)] absolute right-5 top-2 ${
          discussedNum === null ? "hidden" : ""
        }`}
      >
        현재 토론 완료 : {discussedNum}/5
      </div>
      {memberId === hostId && (
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
      )}
    </>
  );
};

export default BalanceChangeChoices;
