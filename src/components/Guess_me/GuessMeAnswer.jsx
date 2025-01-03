import React, { useState, useEffect } from "react";
import ExitBtn from "../Buttons/ExitBtn";
import BasicBtn from "../Buttons/BasicBtn";
import Chatbox from "../Common/Chatbox";
import GameTurns from "../Common/GameTurns";
// import axios from "axios";

import useGameStore from "../../store/useGameStore";
import webSocketService from "../../WebSocketService";
import useAuthStore from "../../store/useAuthStore";
import useRoomStore from "../../store/useRoomStore";

const GuessMeAnswer = ({ guessMeStep, setGuessMeStep }) => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userQuestions, setUserQuestions] = useState([]);
  const [timer, setTimer] = useState(null);

  const [currentPresenterId, setCurrentPresenterId] = useState(null);

  const btnText = "다음";
  const timerImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/timer.png";
  const correctImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/correct_circle.png";
  const wrongImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/wrong_x.png";
  const questionmarkImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/questionmark.png";

  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  // 일단 박아둠
  const {roomId} = useRoomStore()
  // const { roomId } = useGameStore();
  const { memberId } = useAuthStore();
  // const memberId = 4
  // const hostId = 4

  useEffect(() => {
    const handleMessageReceived = (message) => {
      console.log("Received message:", message);
      if (message === "balance") {
        setGameStep("balance-game");
      } else {
        setCurrentPresenterId(message[0].memberId);
        setUserQuestions(message);
        setCurrentQuestionIndex(0);
      }
      // if (message.memberId && message.content && message.answer !== undefined) {
      //   setUserQuestions(message.content.map(q => ({content:q.content, answer:q.answer})))
      // }
    };

    webSocketService.subscribeToGuessMe(roomId, handleMessageReceived);

    return () => {
      webSocketService.unsubscribe(`/api/sub/ox/${roomId}/next`);
    };
  }, [roomId]);

  // const handleNextStep = () => {
  //   if (userQuestions.length > 1) {
  //     const newQuestions = userQuestions.slice(1);
  //     setUserQuestions(newQuestions);
  //     setSecondsLeft(10);
  //     setShowResult(false);
  //     if (timer) clearInterval(timer);
  //     startTimer();
  //   } else if (userQuestions.length === 1) {
  //     // setGuessMeStep("Answer");
  //     setGameStep("balance-game")

  //   }
  // };

  useEffect(() => {
    console.log("Member ID:", memberId);
    console.log("Current Presenter ID:", currentPresenterId);
  }, [memberId, currentPresenterId]);

  const startTimer = () => {
    if (timer) clearInterval(timer);
    const newTimer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(newTimer);
          setShowResult(true);
          return 0;
        }
      });
    }, 500);
    setTimer(newTimer);
  };

  // const handleNextStep = () => {
  //   if (userQuestions.length > 1) {
  //     const newQuestions = userQuestions.slice(1);
  //     setUserQuestions(newQuestions);
  //     setSecondsLeft(10);
  //     setShowResult(false);
  //     if (timer) clearInterval(timer);
  //     startTimer();
  //   } else if (userQuestions.length === 1) {
  //     webSocketService.sendGuessMeNext(roomId);
  //     setSecondsLeft(10);
  //     setShowResult(false);
  //     setUserQuestions([]);
  //     if (timer) clearInterval(timer);
  //   }
  // };

  const handleNextStep = () => {
    if (currentQuestionIndex < userQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSecondsLeft(10);
      setShowResult(false);
      startTimer();
    } else {
      webSocketService.sendGuessMeNext(roomId);
      setSecondsLeft(10);
      setShowResult(false);
      setUserQuestions([]);
      if (timer) clearInterval(timer);
    }
  };

  // const handleGetAll = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://i11c209.p.ssafy.io/api/result/ox/${roomId}/all`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
  //         },
  //       }
  //     );
  //     console.log("전체 조회 성공", response.data.data[0].oxResponseDtos);
  //     const newQuestions = response.data.data[0].oxResponseDtos.map(
  //       (oneQuestion) => {
  //         return {
  //           content: oneQuestion.content,
  //           answer: oneQuestion.answer,
  //         };
  //       }
  //     );
  //     console.log("questions", newQuestions);
  //     setUserQuestions(newQuestions);
  //   } catch (error) {
  //     console.error("Error in handleGetAll:", error);
  //   }
  // };

  // useEffect(() => {
  //   const rerenderingQuestion = async () => {
  //     await handleGetAll();
  //   };
  //   rerenderingQuestion();

  //   return () => {
  //     if (timer) clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  //   };
  // }, []);

  useEffect(() => {
    if (userQuestions.length > 0) {
      if (timer) clearInterval(timer); // 기존 타이머 정리
      const delayTimer = setTimeout(() => {
        startTimer();
      }, 500); // 1초 후 타이머 시작

      return () => clearTimeout(delayTimer); // 컴포넌트 언마운트 시 지연 타이머 정리
    }
  }, [userQuestions]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setShowResult(true);
    }
  }, [secondsLeft]);

  return (
    <>
      {/* Bottom Div */}
      <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
        <div className="flex-grow flex items-center justify-center relative">
          {/* 문제와 답 보여주기 */}
          <span className="text-[rgba(85,181,236)]">
            {userQuestions.length > 0 ? userQuestions[0].content : null}
          </span>
          {showResult && userQuestions.length > 0 && (
            <img
              src={userQuestions[0].answer ? correctImg : wrongImg}
              alt={userQuestions[0].answer ? "Correct" : "Wrong"}
              className="absolute w-[50px] h-[50px]"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          {/* 문제와 답 보여주기 */}
        </div>
        <div className="absolute bottom-3 right-5 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <img src={timerImg} alt="Timer" className="w-5 h-5 mr-2" />
            <span className="text-red-500">{secondsLeft}</span>
          </div>
          {memberId === currentPresenterId && showResult && (
            <BasicBtn btnText={btnText} onClick={handleNextStep} />
          )}
        </div>
        <img
          src={questionmarkImg}
          alt="물음표 두개 그림"
          className="absolute bottom-0 left-0 mb-3 ml-3"
        />
      </div>
    </>
  );
};

export default GuessMeAnswer;
