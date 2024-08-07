import React, { useState, useEffect } from "react";
import GameTurns from "../../components/Common/GameTurns";
import ExitBtn from "../../components/Buttons/ExitBtn";
import Chatbox from "../../components/Common/Chatbox";
import BalanceGameModal from "./BalanceGameModal";
import versus from "./../../assets/Balance_game/versus.png";

const BalanceGetReady = ({ onClose, dots }) => {
  const [showModal, setShowModal] = useState(false);
  const[questions, setQuestions] = useState({1:"", 2:"",3:""})
  const [selectedAnswers, setSelectedAnswers] = useState({ 1: null, 2: null, 3: null });

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
        <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
          <img className="absolute" src={versus} alt="star 그림" />
          <div className="flex-grow flex items-center justify-center">
            <span className="text-[rgba(85,181,236)]">
              밸런스 게임 문제를 준비 중{dots}
            </span>
          </div>
          <div className="flex justify-end"></div>
        </div>
      {showModal && (
        <BalanceGameModal btnText="저장" onClose={onClose} />
      )}
    </>
  );
};

export default BalanceGetReady;
