// import React, {useEffect} from "react";
// import GuessMeAnswer from "./GuessMeAnswer";
// import GuessMeGetReady from "./GuessMeGetReady";
// import GuessMeAllPrepared from "./GuessMeAllPrepared";
// import { useState } from "react";
// import webSocketService from "../../WebSocketService";
// import { useWebSocket } from "../../WebSocketContext";

// const GuessMe = () => {
//   const [guessMeStep, setGuessMeStep] = useState("getready");

//   // 일단 룸아이디 박아둠
//   const roomId= 1

//   const webSocketService = useWebSocket()

//   // 여기서 구독하는중 (컴포넌트 바뀌어도 구독이 끊기지않게!)
//   useEffect(() => {
//     const handleGuessMeMessage = (message) => {
//       console.log("Received GuessMe message:", message);
//       if (message.memberState === "balance") {
//         // Move to the next game step when the final message is received
//         setGuessMeStep("balance-game");
//       } else {
//         setGuessMeStep("Answer")
//       }
//     };

//     webSocketService.subscribeToGuessMe(roomId, handleGuessMeMessage);

//     return () => {
//       webSocketService.unsubscribe(`/api/sub/ox/${roomId}/next`);
//     };
//   }, [roomId, webSocketService]);

//   return (
//     <>
//       {guessMeStep === "getready" && (
//         <GuessMeGetReady
//           guessMeStep={guessMeStep}
//           setGuessMeStep={setGuessMeStep}
//         />
//       )}
//       {guessMeStep === "allPrepared" && (
//         <GuessMeAllPrepared
//           guessMeStep={guessMeStep}
//           setGuessMeStep={setGuessMeStep}
//         />
//       )}
//       {guessMeStep === "Answer" && (
//         <GuessMeAnswer
//           guessMeStep={guessMeStep}
//           setGuessMeStep={setGuessMeStep}
//         />
//       )}
//     </>
//   );
// };

// export default GuessMe;

// ================================================================

// import React, { useState, useEffect } from "react";
// import webSocketService from "../../WebSocketService";
// import Chatbox from "./../Common/Chatbox";
// import ExitBtn from "./../Buttons/ExitBtn";
// import GameTurns from "./../Common/GameTurns";
// import BasicBtn from "../Buttons/BasicBtn";
// import GuessMeModal from "./GuessMeModal";
// import useGameStore from "../../store/useGameStore";
// import useAuthStore from "../../store/useAuthStore";
// import useRoomStore from "../../store/useRoomStore";

// const GuessMe = () => {
//   const snowingCloud = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/snowing_cloud.png";
//   const star = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/star.png";
//   const timerImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/timer.png";
//   const correctImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/correct_circle.png";
//   const wrongImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/wrong_x.png";
//   const questionmarkImg = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/questionmark.png";

//   const [dots, setDots] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [userStatus, setUserStatus] = useState("준비완료");
//   const [allPrepared, setAllPrepared] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [secondsLeft, setSecondsLeft] = useState(10);
//   const [showResult, setShowResult] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userQuestions, setUserQuestions] = useState([]);
//   const [timer, setTimer] = useState(null);
//   const [currentPresenterId, setCurrentPresenterId] = useState(null);
//   const [showReadyMessage, setShowReadyMessage] = useState(false);

//   const { memberId } = useAuthStore();
//   // const memberId = 4
//   const {roomId} = useRoomStore()
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const btnText = "다음";

//   // 준비중입니다 ... 계속 바뀌는거
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   // 처음 들어오면 sub 하고 있다가 데이터 들어오면 받아와!
//   useEffect(() => {
//     const handleMessageReceived = (message) => {
//       console.log("Received message:", message);
//     // 받은게 문제3개세트 데이터면
//     if (Array.isArray(message) && message.length > 0 && message[0].memberId) {
//       // 현재 발표자 id, 현재 발표자의 발표내용 (문제3개), 현재 발표데이터의 인덱스0으로 설정 (1번문제), 준비완료!! div 보여질수있게 true로 설정
//       setCurrentPresenterId(message[0].memberId);
//       setUserQuestions(message); // Load the new set of questions
//       setCurrentQuestionIndex(0);
//       setShowReadyMessage(true);
//       setSecondsLeft(10)
//       setShowResult(false)
//       startTimer()
//     }
//     // 받은게 memberId, nextIndex 면
//     // 현재인덱스 받아온 인덱스로 설정, 10초 남은걸로 다시 설정
//     else if (message.memberId && typeof message.nextIndex === 'number') {
//       setCurrentQuestionIndex(message.nextIndex);
//       setSecondsLeft(10)
//       setShowResult(false)
//       startTimer(); // Start the timer for the next question
//     }
//   };

//     webSocketService.subscribeToGuessMe(roomId, handleMessageReceived);
//     webSocketService.subscribeToMemberState(roomId, (message) => {
//       console.log("Received game state: ", message);
//       if (message.memberState === "balance") {
//         setGameStep("balance-game")
//       }
//     })

//     return () => {
//       webSocketService.unsubscribe(`/api/sub/ox/${roomId}/next`);
//     };
//   }, [roomId, setGameStep]);

//   // 모달에 썼던 데이터들 저장해서 백으로 보냄
//   const handleSave = () => {
//     const questionsArray = Object.keys(questions).map((key) => ({
//       memberId,
//       content: questions[key],
//       answer: selectedAnswers[key],
//     }));

//     webSocketService.sendGuessMe(roomId, questionsArray);
//   };

//   // Guessme 컴포넌트 띄워지고 아주조금뒤에 바로 모달 띄우기
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowModal(true);
//       setUserStatus("준비중");
//     }, 250);
//     return () => clearTimeout(timer);
//   }, []);

//   // 모달 닫음 + 닫음과 동시에 데이터 저장된것 백으로 보내는 함수 호출
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setUserStatus("준비완료");
//     handleSave();
//   };

//   // 준비완료 함수 - 모달 닫음
//   const handleReady = () => {
//     setShowModal(false);
//     setUserStatus("준비완료");
//   };

//   // 2초 동안 준비완료!! 보여주기
//   useEffect(() => {
//     if (showReadyMessage) {
//       const timer = setTimeout(() => {
//         setShowReadyMessage(false);
//         setAllPrepared(true);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [showReadyMessage]);

//   // 타이머 10초 시작
//   const startTimer = () => {
//     // 타이머 도는거 있으면 리셋
//     if (timer) clearInterval(timer);
//     // 타이머 10초 시작
//     const newTimer = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev > 1) {
//           return prev - 1;
//         } else {
//           clearInterval(newTimer);
//           // 10초 지났으면 정답 공개!
//           setShowResult(true);
//           return 0;
//         }
//       });
//     }, 1000);
//     setTimer(newTimer);
//   };

//   // 다음 버튼과  연결된 함수
//   const handleNextStep = () => {
//     // 다음 버튼을 누를때마다 pub 요청 보냄
//     webSocketService.sendGuessMeNext(roomId, memberId, currentQuestionIndex)

//     // 다음문제가면
//     // setSecondsLeft(10)
//     // setShowResult(false)

//     // // 아직 첫번째 타자 발표할 내용 남았어? 그럼 보여줘
//     // if (currentQuestionIndex < userQuestions.length - 1) {
//     //   // setCurrentQuestionIndex(currentQuestionIndex + 1);
//     //   setSecondsLeft(10);
//     //   setShowResult(false);
//     //   startTimer();
//     // } else {
//     //   // 첫타자 발표끝났으면 (인덱스가 3번째면) 다시 pub 요청 보냄
//     //   // webSocketService.sendGuessMeNext(roomId);
//     //   setSecondsLeft(10);
//     //   setShowResult(false);
//     //   setUserQuestions([]);
//     //   if (timer) clearInterval(timer);
//     // }
//   };

//   // 타이머 관련 - 새 질문데이터들 들어오면 타이머 재시작
//   useEffect(() => {
//     if (userQuestions.length > 0) {
//       if (timer) clearInterval(timer);
//       const delayTimer = setTimeout(() => {
//         startTimer();
//       }, 500);
//       return () => clearTimeout(delayTimer);
//     }
//   }, [userQuestions]);

//   // 타이머 10초 끝났으면 정답 공개!!
//   useEffect(() => {
//     if (secondsLeft === 0) {
//       setShowResult(true);
//     }
//   }, [secondsLeft]);

//   return (
// <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
//   <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">

//     {/* top div */}
//     <div className="h-[5%] flex justify-between items-center mb-2">
//       <div className="w-[90%] flex justify-center absolute top-3">
//         <GameTurns sectionNumber={2} />
//       </div>
//       <div className="w-[10%] flex justify-center">
//         <ExitBtn />
//       </div>
//     </div>

//     {/* middle div */}
//     <div className="flex-grow flex overflow-hidden h-[52vh]">
//       <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
//         <p className="m-5">camera background</p>
//       </div>
//       <div className="flex-[3] h-full ml-5 rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
//         <Chatbox />
//       </div>
//     </div>

//     {/* bottom div */}
//     <div className="flex-none mt-3 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
//       {!allPrepared ? (
//         showReadyMessage ? (
//           <div className="flex-grow flex items-center justify-center">
//             <img src={star} alt="star 그림" />
//             <span className="text-transparent">
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             </span>
//             <span className="text-[rgba(85,181,236)]">전원 준비 완료!!</span>
//             <span className="text-transparent">
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             </span>
//             <img src={star} alt="star 그림" />
//           </div>
//         ) : (
//           <div className="flex-grow flex items-center justify-center">
//             <img src={snowingCloud} alt="star 그림" />
//             <span className="text-transparent">&nbsp;&nbsp;</span>
//             <span className="text-[rgba(85,181,236)]">
//               나를 맞춰봐 문제가 만들어지고 있어요{dots}
//             </span>
//           </div>
//         )
//       ) : (
//         <div className="flex-grow flex items-center justify-center relative">
//           <span className="text-[rgba(85,181,236)]">
//             {userQuestions.length > 0 ? userQuestions[currentQuestionIndex].content : null}
//           </span>
//           {showResult && userQuestions.length > 0 && (
//             <img
//               src={userQuestions[currentQuestionIndex].answer ? correctImg : wrongImg}
//               alt={userQuestions[currentQuestionIndex].answer ? "Correct" : "Wrong"}
//               className="absolute w-[50px] h-[50px]"
//               style={{
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             />
//           )}
//           <div className="absolute bottom-3 right-5 flex flex-col items-center">
//             <div className="flex items-center mb-2">
//               <img src={timerImg} alt="Timer" className="w-5 h-5 mr-2" />
//               <span className="text-red-500">{secondsLeft}</span>
//             </div>
//             {memberId === currentPresenterId && showResult && (
//               <BasicBtn btnText={btnText} onClick={handleNextStep} />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
//   {showModal && (
//     <GuessMeModal
//       btnText="저장"
//       onClose={handleCloseModal}
//       onReady={handleReady}
//       questions={questions}
//       setQuestions={setQuestions}
//       selectedAnswers={selectedAnswers}
//       setSelectedAnswers={setSelectedAnswers}
//     />
//   )}
// </div>
//   );
// };

// export default GuessMe;

import React, { useState, useEffect } from "react";
import webSocketService from "../../WebSocketService";
import Chatbox from "./../Common/Chatbox";
import ExitBtn from "./../Buttons/ExitBtn";
import GameTurns from "./../Common/GameTurns";
import BasicBtn from "../Buttons/BasicBtn";
import GuessMeModal from "./GuessMeModal";
import useGameStore from "../../store/useGameStore";
import useAuthStore from "../../store/useAuthStore";
import useRoomStore from "../../store/useRoomStore";
import usePresenterStore from "../../store/usePresenterStore";

const GuessMe = () => {
  const {
    finalResults,
    setFinalResult,
    startPredictionFlag,
    setStartPredictionFlag,
  } = useGameStore();
  const snowingCloud =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/snowing_cloud.png";
  const star = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/star.png";
  const timerImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/timer.png";
  const correctImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/correct_circle.png";
  const wrongImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/wrong_x.png";
  const questionmarkImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/questionmark.png";

  const [dots, setDots] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userStatus, setUserStatus] = useState("준비완료");
  const [allPrepared, setAllPrepared] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userQuestions, setUserQuestions] = useState([]);
  const [timer, setTimer] = useState(null);
  // const [currentPresenterId, setCurrentPresenterId] = useState(null);
  const [showReadyMessage, setShowReadyMessage] = useState(false);

  const setCurrentPresenterId = usePresenterStore(
    (state) => state.setCurrentPresenterId
  );
  const { currentPresenterId } = usePresenterStore();

  const { memberId } = useAuthStore();
  // const memberId = 4
  const { roomId } = useRoomStore();
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const btnText = "다음";

  // 준비중입니다 ... 계속 바뀌는거
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 처음 들어오면 sub 하고 있다가 데이터 들어오면 받아와!
  useEffect(() => {
    const handleMessageReceived = (message) => {
      console.log("Received message:", message);
      // 받은게 문제3개세트 데이터면
      if (Array.isArray(message) && message.length > 0 && message[0].memberId) {
        // 현재 발표자 id, 현재 발표자의 발표내용 (문제3개), 현재 발표데이터의 인덱스0으로 설정 (1번문제), 준비완료!! div 보여질수있게 true로 설정
        setCurrentPresenterId(message[0].memberId);
        setUserQuestions(message); // Load the new set of questions
        setCurrentQuestionIndex(0);
        setShowReadyMessage(true);
        setSecondsLeft(10);
        setShowResult(false);
        // // 이때 모션인식 시작
        // setStartPredictionFlag(true);
        // // 타이머 시작
        // startTimer();
        setTimeout(() => {
          console.log("[*] 모션 인식 시작");
          setStartPredictionFlag(true);
          // 타이머 시작
          startTimer();
        }, 1000); // 1000ms = 1초
      }
      // 받은게 memberId, nextIndex 면
      // 현재인덱스 받아온 인덱스로 설정, 10초 남은걸로 다시 설정
      else if (message.memberId && typeof message.nextIndex === "number") {
        setCurrentQuestionIndex(message.nextIndex);
        setSecondsLeft(10);
        setShowResult(false);
        // 이때 모션 인식 시작
        console.log("[*] 모션 인식 시작");
        setStartPredictionFlag(true);
        console.log("[*] 타이머 시작");
        startTimer(); // Start the timer for the next question
      }
    };

    webSocketService.subscribeToGuessMe(roomId, handleMessageReceived);
    webSocketService.subscribeToMemberState(roomId, (message) => {
      console.log("Received game state: ", message);
      if (message.memberState === "balance") {
        setCurrentPresenterId(null);
        setGameStep("balance-game");
      }
    });

    return () => {
      webSocketService.unsubscribe(`/api/sub/ox/${roomId}/next`);
    };
  }, [roomId, setGameStep]);

  // 모달에 썼던 데이터들 저장해서 백으로 보냄
  const handleSave = () => {
    const questionsArray = Object.keys(questions).map((key) => ({
      memberId,
      content: questions[key],
      answer: selectedAnswers[key],
    }));

    webSocketService.sendGuessMe(roomId, questionsArray);
  };

  // Guessme 컴포넌트 띄워지고 아주조금뒤에 바로 모달 띄우기
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
      setUserStatus("준비중");
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // 모달 닫음 + 닫음과 동시에 데이터 저장된것 백으로 보내는 함수 호출
  const handleCloseModal = () => {
    setShowModal(false);
    setUserStatus("준비완료");
    handleSave();
  };

  // 준비완료 함수 - 모달 닫음
  const handleReady = () => {
    setShowModal(false);
    setUserStatus("준비완료");
  };

  // 2초 동안 준비완료!! 보여주기
  useEffect(() => {
    if (showReadyMessage) {
      const timer = setTimeout(() => {
        setShowReadyMessage(false);
        setAllPrepared(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showReadyMessage]);

  // 타이머 10초 시작
  // const startTimer = () => {
  //   // 타이머 도는거 있으면 리셋
  //   if (timer) clearInterval(timer);
  //   // 타이머 10초 시작
  //   const newTimer = setInterval(() => {
  //     setSecondsLeft((prev) => {
  //       if (prev > 1) {
  //         return prev - 1;
  //       } else {
  //         clearInterval(newTimer);
  //         // 10초 지났으면 정답 공개!
  //         setShowResult(true);
  //         // 정답 공개할 때 모션 인식 시작 플래그 false로 바꿈
  //         return 0;
  //       }
  //     });
  //   }, 500);
  //   setTimer(newTimer);
  // };

  const startTimer = () => {
    const startTime = Date.now(); // 타이머 시작 시간 기록
    const targetTime = startTime + 5000; // 목표 시간 5초 후

    // 기존 타이머가 있다면 제거
    if (timer) clearInterval(timer);

    const newTimer = setInterval(() => {
      const currentTime = Date.now(); // 현재 시간
      const timeLeft = Math.max(
        0,
        Math.ceil((targetTime - currentTime) / 1000)
      ); // 남은 시간 계산

      setSecondsLeft(timeLeft); // 남은 시간 업데이트

      if (currentTime >= targetTime) {
        // 목표 시간에 도달하면 타이머 종료
        clearInterval(newTimer);
        setShowResult(true); // 10초 경과 시 결과를 보여줌
        setStartPredictionFlag(false); // 모션 인식 플래그 false로 설정
      }
    }, 100); // 짧은 간격으로 타이머를 갱신

    setTimer(newTimer); // 타이머 상태를 업데이트
  };

  // 다음 버튼과  연결된 함수
  const handleNextStep = () => {
    // 다음 버튼을 누를때마다 pub 요청 보냄
    webSocketService.sendGuessMeNext(roomId, memberId, currentQuestionIndex);

    // 다음문제! 10초로 타이머 다시설정
    // 정답보여주는거 닷미 false로 설정
    // setSecondsLeft(10)
    setShowResult(false);
    // startTimer()
  };

  const { setGuessMeGamePeopleSelection, guessMeGamePeopleSelection } =
    usePresenterStore();

  // 모션인식 결과 구독하기
  useEffect(() => {
    webSocketService.subscribeToSelections(roomId, (message) => {
      console.log("[*] 모션인식 결과", message);
      // 개인별 결과 저장하기
      // "/api/sub/ox/{roomId}/selection"
      // 받아오는 데이터
      // {
      //      "memberId" : 1,
      //      "answer" : "true"
      // }
      const personInfo = {
        memberId: message.memberId,
        selection: message.answer,
      };

      setGuessMeGamePeopleSelection((prev) => {
        const existing = prev.find(
          (info) => info.memberId === personInfo.memberId
        );
        if (existing) {
          return prev.map((info) =>
            info.memberId === personInfo.memberId
              ? { ...info, selection: personInfo.selection }
              : info
          );
        } else {
          return [...prev, personInfo];
        }
      });
    });
  }, []);

  useEffect(() => {
    console.log("[*] guessMeGamePeopleSelection", guessMeGamePeopleSelection);
  }, [guessMeGamePeopleSelection]);

  // 타이머 시작하기 전에 약간의 delay
  useEffect(() => {
    if (userQuestions.length > 0) {
      if (timer) clearInterval(timer);
      const delayTimer = setTimeout(() => {
        startTimer();
      }, 500);
      return () => clearTimeout(delayTimer);
    }
  }, [userQuestions]);

  // 타이머 10초 끝났으면 정답 공개!!
  useEffect(() => {
    if (secondsLeft === 0) {
      setShowResult(true);
    }
  }, [secondsLeft]);

  return (
    <>
      {/* bottom div */}
      {!allPrepared ? (
        showReadyMessage ? (
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
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <img src={snowingCloud} alt="star 그림" />
            <span className="text-transparent">&nbsp;&nbsp;</span>
            <span className="text-[rgba(85,181,236)]">
              나를 맞춰봐 문제가 만들어지고 있어요{dots}
            </span>
          </div>
        )
      ) : (
        <div className="flex-grow flex items-center justify-center relative">
          <span className="text-[rgba(85,181,236)]">
            {userQuestions.length > 0
              ? userQuestions[currentQuestionIndex].content
              : null}
          </span>
          {showResult && userQuestions.length > 0 && (
            <img
              src={
                userQuestions[currentQuestionIndex].answer
                  ? correctImg
                  : wrongImg
              }
              alt={
                userQuestions[currentQuestionIndex].answer ? "Correct" : "Wrong"
              }
              className="absolute w-[50px] h-[50px]"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          <div className="absolute bottom-3 right-5 flex flex-col items-center">
            <div className="flex items-center mb-2">
              <img src={timerImg} alt="Timer" className="w-5 h-5 mr-2" />
              <span className="text-red-500">{secondsLeft}</span>
            </div>
            {memberId === currentPresenterId && showResult && (
              <BasicBtn btnText={btnText} onClick={handleNextStep} />
            )}
          </div>
        </div>
      )}
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

export default GuessMe;
