import React from "react";
import { useState } from "react";
import GameTurns from "./GameTurns";
import BasicBtn from "../Buttons/BasicBtn";
import useRoomStore from "../../store/useRoomStore";
import useGameStore from "../../store/useGameStore";
import ExitBtn from "../Buttons/ExitBtn";

const TopDiv = ({ session }) => {
  // const [copyState, setCopyState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { gameStep } = useGameStore();
  const { roomCode, roomName, roomPersonCount } = useRoomStore();

  const handleClipBoard = () => {
    if (roomCode) {
      navigator.clipboard
        .writeText(roomCode)
        .then(() => {
          // setCopyState(true);
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

  return (
    <div className="flex items-center justify-between">
      {gameStep === "waiting-room" ? (
        <div className="flex flex-col items-center justify-center ">
          <div className="flex">
            <div>접속 코드 : {roomCode} </div>
            <button onClick={handleClipBoard} className="w-[30%] h-[30%]">
              <img
                className="w-[15%] h-[15%]"
                src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/clipboard.webp"
                alt=""
              />
            </button>
          </div>
          <div> 방 이름 : {roomName}</div>
          {/* <div> 방 설정 인원 : {roomPersonCount}</div> */}
        </div>
      ) : null}

      <div className="flex justify-center items-center ms">
        {gameStep == "camera-check" ||
        gameStep == "waiting-room" ||
        gameStep == "photo-first" ||
        gameStep == "photo-last" ? null : (
          <GameTurns gameStep={gameStep}></GameTurns>
        )}
      </div>

      {gameStep !== "photo-first" && gameStep !== "photo-last" ? (
        <ExitBtn session={session} className="mr-3" />
      ) : null}

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

export default TopDiv;
