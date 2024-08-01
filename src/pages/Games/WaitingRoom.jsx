import React, { useEffect, useState } from "react";
import WaitingRoomGameTurns from "../../components/Waiting_room/WaitingRoomGameTurns";
import ExitBtn from "../../components/Buttons/ExitBtn";
import Chatbox from "../../components/Common/Chatbox";
import BasicBtn from "../../components/Buttons/BasicBtn";
import clipboard from "../../assets/Waiting_room/clipboard.webp";
import check from "../../assets/Waiting_room/check.webp";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const [accessCode, setAccessCode] = useState();
  const [copyState, setCopyState] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const btnText = "시작";

  useEffect(() => {
    setAccessCode("axios로 백에서 받아올 것");
  }, []);

  const handleClipBoard = () => {
    if (accessCode) {
      navigator.clipboard
        .writeText(accessCode)
        .then(() => {
          setCopyState(true);
          setShowModal(true);
        })
        .catch((err) => {
          console.error("클립보드에 복사 실패:", err);
        });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate()
  const handleNextStep = ()=>{
    navigate("/selfintro-getready")
  }

  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Top Div */}
        <div className="h-[5%] flex justify-between items-center">
          <div className="flex items-center absolute top-5 left-10">
            <div>접속 코드 : {accessCode} </div>
            <button onClick={handleClipBoard} className="w-[5%] h-[5%]">
              <img className="w-[100%] h-[100%]" src={clipboard} alt="" />
            </button>
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
        <div className="flex justify-center items-center mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] relative">
          <div className="flex-col flex items-center justify-center relative text-[#96A5FE]">
            <div className="text-[22px]">게임 설명</div>
            <WaitingRoomGameTurns sectionNumber={3} />
          </div>
          <div className="absolute bottom-3 right-5">
            <BasicBtn btnText={btnText} onClick={handleNextStep}/>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[rgba(255,255,255,0.95)] p-6 rounded-[30px] shadow-lg flex flex-col justify-center items-center gap-5">
            <div className="bg-custom-modal p-6 rounded-[30px] shadow-lg flex flex-col justify-center items-center gap-5">
              <p className="text-lg">접속코드가 클립보드에 복사되었습니다!</p>
              <BasicBtn btnText="확인" onClick={handleCloseModal}>
                확인
              </BasicBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
