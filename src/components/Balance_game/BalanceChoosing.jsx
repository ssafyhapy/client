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

  const { setBalanceGamePeopleChoiceInfo } =
    usePresenterStore();

  const handlePickedChoice = (choice) => {
    setPickedChoice(choice);
  }

  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (currentStep) {
      // Clear any existing timer to prevent overlapping timers
      let timer;
  
      const startTimer = () => {
        timer = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else {
              clearInterval(timer);
  
              // Pub the choice to the server
              webSocketService.sendBalancePersonChoice(
                roomId,
                topicId,
                memberId,
                pickedChoice
              );
  
              const personInfo = {
                memberId,
                choice: pickedChoice,
              };
  
              // 자기가 고른건 zustand에 안들어가는것같아서...?? 추가해줌 (이게맞나?)
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
              onTimerEnd();
              return 0;
            }
          });
        }, 1000); // Adjusting the timer interval to 1000ms for consistency
      };
  
      // Introduce a slight delay before starting the timer
      const delayStart = setTimeout(() => {
        startTimer();
      }, 500);
  
      return () => {
        clearInterval(timer); // Clear the interval on cleanup
        clearTimeout(delayStart); // Clear the timeout if the effect is cleaned up
      };
    }
  }, [currentStep, pickedChoice, onTimerEnd]);


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

  //             // console.log("타이머 끝! 그리고 멤버가 보낸 선택지도 pub 해줌!!!")

  //             // if (pickedChoice === "FIRST" && !blueMembers.includes(memberId)) {
  //             //   console.log("[*] Blue team confirmed");
  //             //   addBlueMember(memberId);
  //             // } else if (pickedChoice === "SECOND" && !redMembers.includes(memberId)) {
  //             //   console.log("[*] Red team confirmed");
  //             //   addRedMember(memberId);
  //             // }

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
