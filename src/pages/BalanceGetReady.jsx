import React from "react";
import { useEffect, useState } from "react";
import GameTurns from "../components/GameTurns";
import ExitBtn from "../components/btn/ExitBtn";
import Chatbox from "../components/Chatbox";
import BalanceGameModal from "../components/BalanceGameModal";
import versus from "./../assets/versus.png"

const BalanceGetReady = () => {
  const [dots, setDots] = useState("");
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(true)
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = ()=>{
    setShowModal(true)
  }

  const handleCloseModal = ()=>{
    setShowModal(false)
  }

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

        <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
          <img className="absolute" src={versus} alt="star 그림" />
          <div className="flex-grow flex items-center justify-center">
            <span className="text-[rgba(85,181,236)]">
              밸런스 게임 문제를 준비 중{dots}
            </span>
          </div>
          <div className="flex justify-end"></div>
        </div>
      </div>
      {showModal&& <BalanceGameModal btnText="저장" onClose={handleCloseModal}/>}
    </div>
    
  );
};

export default BalanceGetReady;
