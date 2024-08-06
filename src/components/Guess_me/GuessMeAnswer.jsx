import React, { useState, useEffect } from "react";
import ExitBtn from "../Buttons/ExitBtn";
import BasicBtn from "../Buttons/BasicBtn";
import Chatbox from "../Common/Chatbox";
import GameTurns from "../Common/GameTurns";
import axios from "axios";
import useGameStore from "../../store/useGameStore";

const GuessMeAnswer = ({ guessMeStep, setGuessMeStep }) => {
  const { roomId } = useGameStore();
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [userQuestions, setUserQuestions] = useState([]);
  const [timer, setTimer] = useState(null);

  const btnText = "다음";
  const timerImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/timer.png";
  const correctImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/correct_circle.png";
  const wrongImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/wrong_x.png";
  const questionmarkImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/questionmark.png"

  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  const handleNextStep = () => {
    if (userQuestions.length > 1) {
      const newQuestions = userQuestions.slice(1);
      setUserQuestions(newQuestions);
      setSecondsLeft(10);
      setShowResult(false);
      if (timer) clearInterval(timer);
      startTimer();
    } else if (userQuestions.length === 1) {
      // setGuessMeStep("Answer");
      setGameStep("balance-game")

    }
  };

  const startTimer = () => {
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
    }, 1000);
    setTimer(newTimer);
  };

  const handleGetAll = async () => {
    try {
      const response = await axios.get(
        `https://i11c209.p.ssafy.io/api/result/ox/${roomId}/all`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
          },
        }
      );
      console.log("전체 조회 성공", response.data.data[0].oxResponseDtos);
      const newQuestions = response.data.data[0].oxResponseDtos.map(
        (oneQuestion) => {
          return {
            content: oneQuestion.content,
            answer: oneQuestion.answer,
          };
        }
      );
      console.log("questions", newQuestions);
      setUserQuestions(newQuestions);
    } catch (error) {
      console.error("Error in handleGetAll:", error);
    }
  };

  useEffect(() => {
    const rerenderingQuestion = async () => {
      await handleGetAll();
    };
    rerenderingQuestion();

    return () => {
      if (timer) clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, []);

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
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Top Div */}
        <div className="h-[5%] flex justify-between items-center">
          <div className="w-[90%] flex justify-center absolute top-3">
            <GameTurns sectionNumber={2} />
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
            {showResult && (
              <BasicBtn btnText={btnText} onClick={handleNextStep} />
            )}
          </div>
          <img
            src={questionmarkImg}
            alt="물음표 두개 그림"
            className="absolute bottom-0 left-0 mb-3 ml-3"
          />
        </div>
      </div>
    </div>
  );
};

export default GuessMeAnswer;
