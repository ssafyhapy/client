import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import webSocketService from "../../WebSocketService";
// import axios from "axios";

// 필요한 컴포넌트 import
import Chatbox from "./../Common/Chatbox";
import ExitBtn from "./../Buttons/ExitBtn";
import GameTurns from "./../Common/GameTurns";
// import BasicBtn from "../Buttons/BasicBtn";
import GuessMeModal from "./GuessMeModal";

import useGameStore from "../../store/useGameStore";
import useAuthStore from "../../store/useAuthStore";
import useRoomStore from "../../store/useRoomStore";

const GuessMeGetReady = ({ guessMeStep, setGuessMeStep }) => {
  const snowingCloud = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/snowing_cloud.png"
  const star = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/star.png"

  // const { roomId } = useGameStore();
  const [dots, setDots] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userStatus, setUserStatus] = useState("준비완료");
  const [allPrepared, setAllPrepared] = useState(false);
  // const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // const [isGamePhase, setIsGamePhase] = useState(false)

  // memberId 받아와
  const {memberId} = useAuthStore()
  // hostid roomid 일단 박아둠
  const hostId = 4
  const roomId = 1
  // hostid roomid 가져오기
  // const {hostId, roomId} = useRoomStore()

  const gameStep = useGameStore((state) => state.gameStep)
  const setGameStep = useGameStore((state) => state.setGameStep)


  // 준비중 ... (점들 계속 움직이게 만드는거)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMessageReceived = (message) => {
      console.log("Received message:", message)

      // 다들 모달 적어서 내서 이제 첫번째 사람 response 가 왔다!! 하면
      if (message.length > 0 && message[0].memberId) {
        // setGuessMeStep("allPrepared")
        setAllPrepared(true)
      }
    }


    webSocketService.subscribeToGuessMe(roomId, handleMessageReceived)

    return () => {
      webSocketService.unsubscribe(`/api/sub/ox/${roomId}/next`)
    }
  }, [roomId])

  const handleSave = () => {
    const questionsArray = Object.keys(questions).map((key) => ({
      memberId,
      content: questions[key],
      answer: selectedAnswers[key],
    }))

    webSocketService.sendGuessMe(roomId, questionsArray)
  }

  // 2초뒤 모달띄우기
  useEffect(() => {
    // Show the modal after some time or based on a condition
    const timer = setTimeout(() => {
      // searchOneSelfIntro();
      setShowModal(true);
      setUserStatus("준비중"); // Set status to "준비중" when modal opens
    }, 250); // Show modal after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // 모두 준비완료되면 3초 뒤에 guess-me 본게임으로 페이지 바뀜
  // useEffect(() => {
  //   if (allPrepared) {
  //     const timer = setTimeout(() => {
  //       setGuessMeStep("Answer");
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [allPrepared, setGuessMeStep]);

  // const handleOpenModal = () => {
  //   setShowModal(true);
  //   setUserStatus("준비중");
  // };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserStatus("준비완료");
    handleSave();
  };

  const handleReady = () => {
    setShowModal(false)
    setUserStatus("준비완료");
    // setAllPrepared(true); // For demonstration, set this to true when ready
  };

  // 모두 준비완료되면 준비완료 div가 보여진 후 2초 뒤에 guess-me 본게임으로 페이지 바뀜
  useEffect(() => {
    if (allPrepared) {
      setTimeout(() => {
        setGuessMeStep("Answer");
      }, 2000);
    }
  }, [allPrepared, setGuessMeStep]);

  return (
    <>
      {/* Bottom Div */}

      {!allPrepared ? (
        <div className="flex-grow flex items-center justify-center">
          <img src={snowingCloud} alt="star 그림" />
          <span className="text-transparent">&nbsp;&nbsp;</span>
          <span className="text-[rgba(85,181,236)]">
            나를 맞춰봐 문제가 만들어지고 있어요{dots}
          </span>
        </div>
      ) : (
        <div className="flex-grow w-[95%] flex items-center justify-center">
          <img src={star} alt="star 그림" />
          <span className="text-transparent">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-[rgba(85,181,236)]">전원 준비 완료!!</span>
          <span className="text-transparent">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <img src={star} alt="star 그림" />
        </div>
      )}
      <div className="flex justify-end"></div>
      {showModal && (
        <GuessMeModal
          btnText="저장"
          onClose={handleCloseModal}
          onReady={handleReady}
          questions={questions}
          setQuestions={setQuestions}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
        />
      )}
    </>
  );
};

export default GuessMeGetReady;
