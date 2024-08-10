import React, { useState, useEffect } from "react";
import Chatbox from "../../components/Common/Chatbox";
import BasicBtn from "../../components/Buttons/BasicBtn";
import ExitBtn from "../../components/Buttons/ExitBtn";
import GameTurns from "../../components/Common/GameTurns";
import WrapUpModal from "../../components/Wrap_up/WrapUpModal";
import { useNavigate } from "react-router-dom";

import useGameStore from "../../store/useGameStore";
import webSocketService from "../../WebSocketService";
import useRoomStore from "../../store/useRoomStore";
import useAuthStore from "../../store/useAuthStore";

const WrapUp = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const btnText = "종료";
  const userText =
    "섹션 별 소감이나 궁금했던 점 등을 자유롭게 이야기 나눠주세요.";

  const { roomId, hostId } = useRoomStore()
  const { memberId } = useAuthStore()


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

  const navigate = useNavigate();
  const handleNextStep = () => {
    const memberState = "photolast"
    webSocketService.sendMemberState(roomId, memberState)
    // setGameStep("photo-last");
  };

  useEffect(() => {
    webSocketService.subscribeToMemberState(roomId, (message) => {
      console.log("Message received: ", message)

      if (message.memberState === "photolast") {
        setGameStep("photo-last")
      }
    })

    return () => {
      webSocketService.unsubscribe(`/api/sub/${roomId}/state`)
    }
  }, [roomId, setGameStep])

  return (
    <>
      {/* Bottom Div */}
      <div className="flex-grow flex items-center justify-center relative">
        <span className="text-[rgb(85,181,236)]">{userText}</span>
      </div>
      {memberId === hostId &&
        (<div className="absolute bottom-3 right-5">
          <BasicBtn btnText={btnText} onClick={handleNextStep} />
        </div>)
      }
      {showModal && <WrapUpModal btnText="닫기" onClose={handleCloseModal} />}
    </>
  );
};

export default WrapUp;
