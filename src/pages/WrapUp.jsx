import React, { useState, useEffect } from "react";
import Chatbox from "../components/Chatbox";
import BasicBtn from "../components/btn/BasicBtn";
import ExitBtn from "../components/btn/ExitBtn";
import GameTurns from "../components/GameTurns";
import WrapUpModal from "../components/WrapUpModal";
import { useNavigate } from "react-router-dom";

const WrapUp = () => {
  const btnText = "종료";
  const userText =
    "섹션 별 소감이나 궁금했던 점 등을 자유롭게 이야기 나눠주세요.";

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show the modal after some time or based on a condition
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 250); // Show modal after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate()
  const handleNextStep = ()=>{
    navigate("/report")
  }

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
          <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-[52vh] mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
            <p className="m-5">camera background</p>
          </div>
          <div className="flex-[3] ml-5 h-[52vh] rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
            <Chatbox />
          </div>
        </div>

        {/* Bottom Div */}
        <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
          <div className="flex-grow flex items-center justify-center relative">
            <span className="text-[rgb(85,181,236)]">{userText}</span>
          </div>
          <div className="absolute bottom-3 right-5">
            <BasicBtn btnText={btnText} onClick={handleNextStep}/>
          </div>
        </div>
      </div>
      {showModal && <WrapUpModal btnText="닫기" onClose={handleCloseModal} />}
    </div>
  );
};

export default WrapUp;
