import React, { useState, useEffect } from "react";
import useBalanceStore from "../../store/useBalanceStore";
import Chatbox from "../../components/Common/Chatbox";
import ExitBtn from "../../components/Buttons/ExitBtn";
import GameTurns from "../../components/Common/GameTurns";
// import timerImg from "./../../assets/Common/timer.png"
import useAuthStore from "../../store/useAuthStore";
import webSocketService from "../../WebSocketService";

import usePresenterStore from "../../store/usePresenterStore";

const BalanceChoosing = ({
  roomId,
  topicId,
  optionFirst,
  optionSecond,
  onTimerEnd,
  currentStep,
  discussedNum,
}) => {
  const timerImg =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/timer.png";

  const { memberId } = useAuthStore();

  const { pickedChoice, setPickedChoice } = useBalanceStore();
  // const { discussedNum } = useBalanceStore();

  const [first, setOptionFirst] = useState("");
  const [second, setOptionSecond] = useState("");

  const { setBalanceGamePeopleChoiceInfo, resetBalanceGamePeopleChoiceInfo } = usePresenterStore();

  const handlePickedChoice = (choice) => {
    setPickedChoice(choice);
  };

  const [secondsLeft, setSecondsLeft] = useState(10);

  // date() 사용해서 10초 타이머 컨트롤하기...
  const [startTime, setStartTime] = useState(null);

  // 이제 시간 date.now()로 실제 시간가지고 10초 카운트다운 관리함!!!
  useEffect(() => {
    if (currentStep && !startTime) {
      setStartTime(Date.now());
    }
  }, [currentStep, startTime]);

  useEffect(() => {
    if (currentStep && startTime) {
      const timer = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        const remainingSeconds = Math.max(10 - elapsedSeconds, 0);

        setSecondsLeft(remainingSeconds);

        if (remainingSeconds <= 0) {
          clearInterval(timer);

          // 그 사람이 고른 선택지 뭔지 백에 보냄
          webSocketService.sendBalancePersonChoice(
            roomId,
            topicId,
            memberId,
            pickedChoice
          );

          const personInfo = {
            memberId: memberId,
            choice: pickedChoice,
          };

          console.log("personInfo: ", personInfo);

          // 해당 memberId의 사람이 보낸 info 저장
          setBalanceGamePeopleChoiceInfo((prev) => {
            const existing = prev.find(
              (info) => info.memberId === personInfo.memberId
            );
            if (existing) {
              return prev.map((info) =>
                info.memberId === personInfo.memberId
                  ? { ...info, choice: personInfo.choice }
                  : info
              );
            } else {
              return [...prev, personInfo];
            }
          });

          setPickedChoice(null);
          onTimerEnd(); // Call the timer end handler
        }
      }, 100); // Update every 100ms for smoother transitions

      return () => {
        clearInterval(timer);
      };
    }
  }, [currentStep, startTime, pickedChoice, onTimerEnd]);

  // =================================================================================

  // useEffect(() => {
  //   if (currentStep) {
  //     // Clear any existing timer to prevent overlapping timers
  //     let timer;

  //     const startTimer = () => {
  //       timer = setInterval(() => {
  //         setSecondsLeft((prev) => {
  //           if (prev > 1) {
  //             return prev - 1;
  //           } else {
  //             clearInterval(timer);

  //             webSocketService.sendBalancePersonChoice(
  //               roomId,
  //               topicId,
  //               memberId,
  //               pickedChoice
  //             );

  //             // 자기가 고른건 안보이는 모양...? 이니까 자기가 고른것 추가해줘라...
  //             const personInfo = {
  //               memberId,
  //               choice: pickedChoice,
  //             };

  //             // Update the store with the new choice information
  //             setBalanceGamePeopleChoiceInfo((prev) => {
  //               const existing = prev.find(
  //                 (info) => info.memberId === personInfo.memberId
  //               );
  //               if (existing) {
  //                 return prev.map((info) =>
  //                   info.memberId === personInfo.memberId
  //                     ? { ...info, choice: personInfo.choice }
  //                     : info
  //                 );
  //               } else {
  //                 return [...prev, personInfo];
  //               }
  //             });

  //             setPickedChoice(null);
  //             onTimerEnd();
  //             return 0;
  //           }
  //         });
  //       }, 500); // Timer interval set to 1000ms (1 second)
  //     };

  //     startTimer();

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }
  // }, [currentStep, pickedChoice, onTimerEnd]);

  // =================================================================================

  // 선택지 1 2 바꾸자
  useEffect(() => {
    setOptionFirst(optionFirst);
    setOptionSecond(optionSecond);
  });

  return (
    <>
      {/* Bottom Div */}
      <div
        className={`text-[14px] text-[rgba(0,0,0,0.5)] absolute right-5 top-2 ${
          discussedNum === null ? "hidden" : ""
        }`}
      >
        현재 토론 완료 : {discussedNum}/5
      </div>
      <div className="flex-grow flex items-center justify-center relative gap-5">
        <button
          onClick={() => handlePickedChoice("FIRST")}
          className={`text-[rgba(85,181,236)] px-2 py-3 rounded-[15px] ${
            pickedChoice === "FIRST"
              ? "border-solid border-4 border-[#64B8FF]"
              : "border-transparent"
          } text-[14px]`}
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(30, 144, 255, 0.3))",
          }}
        >
          {first}
        </button>
        <span className="text-[#FF607F]">VS</span>
        <button
          onClick={() => handlePickedChoice("SECOND")}
          className={`text-[#FF6A89] px-2 py-3 rounded-[15px] ${
            pickedChoice === "SECOND"
              ? "border-solid border-4 border-[rgba(254,176,207)]"
              : "border-transparent"
          } text-[14px]`}
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(255,96,127,0.5))",
          }}
        >
          {second}
        </button>
      </div>
      <div className="flex items-center mb-2 absolute top-3 left-10">
        <img src={timerImg} alt="Timer" className="w-5 h-5 mr-2" />
        <span className="text-red-500">{secondsLeft}</span>
      </div>
    </>
  );
};

export default BalanceChoosing;
