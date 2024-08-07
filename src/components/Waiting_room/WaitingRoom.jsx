import React, { useEffect, useState } from "react";
import useGameStore from "../../store/useGameStore";
import WaitingRoomGameTurns from "../../components/Waiting_room/WaitingRoomGameTurns";
import ExitBtn from "../../components/Buttons/ExitBtn";
import Chatbox from "../../components/Common/Chatbox";
import BasicBtn from "../../components/Buttons/BasicBtn";
import clipboard from "../../assets/Waiting_room/clipboard.webp";
import check from "../../assets/Waiting_room/check.webp";
import { useNavigate } from "react-router-dom";
import GameBackground from "../Common/GameBackground";

const WaitingRoom = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
  } = useGameStore();
  const btnText = "시작"

  // const handleClipBoard = () => {
  //   if (accessCode) {
  //     navigator.clipboard
  //       .writeText(accessCode)
  //       .then(() => {
  //         setCopyState(true);
  //         setShowModal(true);
  //       })
  //       .catch((err) => {
  //         console.error("클립보드에 복사 실패:", err);
  //       });
  //   }
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const navigate = useNavigate();
  const handleNextStep = () => {
    setGameStep("self-introduction");
  };

  return (
<>
<div>

      {/* Top Div */}
      {/* <div className="h-[5%] flex justify-between items-center">
        <div className="flex items-center absolute top-5 left-10">
          <div>접속 코드 : {accessCode} </div>
          <button onClick={handleClipBoard} className="w-[5%] h-[5%]">
            <img className="w-[100%] h-[100%]" src={clipboard} alt="" />
          </button>
        </div>
        <div className="w-[10%] flex justify-center">
          <ExitBtn />
        </div>
      </div> */}

      {/* Middle Div */}
      <div className="flex-grow flex overflow-hidden mt-5 h-[52vh]">
        <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
          <p className="m-5">
            {/* 화면 나오기 */}
            {mainStreamManager && mainStreamManager?.addVideoElement && (
              <div id="publisher">
                <video
                  autoPlay={true}
                  ref={(video) =>
                    video && mainStreamManager.addVideoElement(video)
                  }
                />
              </div>
            )}
            {subscribers &&
              subscribers?.length > 0 &&
              subscribers.map((sub, index) => {
                console.log("[*] subcribe.map", sub);
                return (
                  <div key={index} id="subscriber">
                    <video
                      autoPlay={true}
                      ref={(video) => video && sub.addVideoElement(video)}
                    />
                  </div>
                );
              })}
          </p>
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
          <BasicBtn btnText={btnText} onClick={handleNextStep} />
        </div>
      </div>
      </div>

     </>
  );
};

export default WaitingRoom;
