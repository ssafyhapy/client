import React, { useEffect, useState } from "react";
import useGameStore from "../../store/useGameStore";
import WaitingRoomGameTurns from "../../components/Waiting_room/WaitingRoomGameTurns";
import ExitBtn from "../../components/Buttons/ExitBtn";
import Chatbox from "../../components/Common/Chatbox";
import BasicBtn from "../../components/Buttons/BasicBtn";
import clipboard from "../../assets/Waiting_room/clipboard.webp";
import check from "../../assets/Waiting_room/check.webp";
import webSocketService from "../../WebSocketService";
import useAuthStore from "../../store/useAuthStore";

const WaitingRoom = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const btnText = "시작";

  // 일단 그냥 박아두기
  const roomId = 1;
  const hostId = 4;
  // 멤버아이디는 로그인해서 받아오게만들고
  const { memberId } = useAuthStore();

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

  // UseEffect -> 바로 구독 (subscribe 함)
  useEffect(() => {
    // const handleGameStateMessageReceived = (message) => {
    //   console.log("Received message:", message);
    //   if (message.memberState === "intro") {
    //     setGameStep("self-introduction");
    //   }
    // };

    // console.log(`Subscribing to /api/sub/${roomId}/state`);
    // webSocketService.subscribe(
    //   `/api/sub/${roomId}/state`,
    //   handleGameStateMessageReceived
    // );

    webSocketService.subscribeToMemberState(roomId, (message) => {
      console.log("Received game state: ", message);
      if (message.memberState === "intro") {
        setGameStep("self-introduction");
      }
    });
  });

  //   return () => {
  //     webSocketService.unsubscribe(`/api/sub/${roomId}/state`);
  //   };
  // }, [roomId, setGameStep]);

  // 다음 버튼 누르면 다음에 가야할 state를 보내준다 (pub 한다는 뜻)
  const getNextGameStep = () => {
    webSocketService.sendMemberState(roomId, "intro");
  };

  // 다음 버튼에 붙어있는 함수
  const handleNextStep = () => {
    getNextGameStep();
    // setGameStep("self-introduction");
  };

  useEffect(() => {
    console.log("Member ID: ", memberId);
    console.log("Host ID: ", hostId);
  }, [memberId, hostId]);

  return (
    <div className="relative">
      <div className="flex-col flex items-center justify-center relative text-[#96A5FE]">
        <div className="text-[22px]">게임 설명</div>
        <WaitingRoomGameTurns sectionNumber={3} />
      </div>
      {/* 멤버아이디랑 호스트아이디랑 같을때만 다음버튼이보임 */}
      {memberId === hostId && (
        <div className="absolute bottom-3 right-5">
          <BasicBtn btnText={btnText} onClick={handleNextStep} />
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
