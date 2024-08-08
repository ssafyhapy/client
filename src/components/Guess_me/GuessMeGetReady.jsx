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
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Top Div */}
        <div className="h-[5%] flex justify-between items-center mb-2">
          <div className="w-[90%] flex justify-center absolute top-3">
            <GameTurns sectionNumber={2} />
          </div>
          <div className="w-[10%] flex justify-center">
            <ExitBtn />
          </div>
        </div>

        {/* Middle Div */}
        <div className="flex-grow flex overflow-hidden h-[52vh]">
          <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
            <p className="m-5">camera background</p>
          </div>
          <div className="flex-[3] h-full ml-5 rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
            <Chatbox />
          </div>
        </div>

        {/* Bottom Div */}
        <div className="flex-none mt-3 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
          {!allPrepared ? (
            <div className="flex-grow flex items-center justify-center">
              <img src={snowingCloud} alt="star 그림" />
              <span className="text-transparent">&nbsp;&nbsp;</span>
              <span className="text-[rgba(85,181,236)]">
                나를 맞춰봐 문제가 만들어지고 있어요{dots}
              </span>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
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
        </div>
      </div>
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
    </div>
  );
};

export default GuessMeGetReady;
