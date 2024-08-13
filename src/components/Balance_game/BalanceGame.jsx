import React, { useState, useEffect } from "react";
import useGameStore from "../../store/useGameStore";
import BalanceGetReady from "./BalanceGetReady";
import BalanceChangeChoices from "./BalanceChangeChoices";
import BalanceChoosing from "./BalanceChoosing";

import useAuthStore from "../../store/useAuthStore";
import useRoomStore from "../../store/useRoomStore";
import useBalanceStore from "../../store/useBalanceStore";
import webSocketService from "../../WebSocketService";
import usePresenterStore from "../../store/usePresenterStore";

const Balance = () => {
  const { memberId } = useAuthStore();
  const { roomId, hostId } = useRoomStore();

  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState("getReady");
  const [dots, setDots] = useState("");

  const { discussedNum, setDiscussedNum } = useBalanceStore();

  // 밸런스 게임 사람들이 고른 선택지 저장하는 함수
  const {
    setBalanceGamePeopleChoiceInfo,
    balanceGamePeopleChoiceInfo,
    resetBalanceGamePeopleChoiceInfo,
  } = usePresenterStore();

  // 방장이 적은 text
  const [purpose, setPurpose] = useState("");
  // 추천받은 주제
  const [optionFirst, setOptionFirst] = useState("");
  const [optionSecond, setOptionSecond] = useState("");

  // 주제확정되면 주제 id 들고다녀
  const [topicId, settopicId] = useState("");

  // purpose 값이 빈 값이 아닐때만!! pub을 보내도록 바꿈 (중복이라 주석처리)
  useEffect(() => {
    if (purpose !== "") {
      webSocketService.sendBalancePurpose(roomId, purpose);
    }
  }, [purpose]);

  // 준비중 ... component
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSubjectSaveModal = () => {
    // 모달 닫을때 purpose pub 해줘야함
    setShowModal(false);

    // purpose가 빈값이 아닐때만!!
    if (purpose !== "") {
      webSocketService.sendBalancePurpose(roomId, purpose);
    }
    // setCurrentStep("changeChoices");
  };

  // 주제확정버튼과 연결되어있음
  // 주제확정될때 pub
  const handleSubjectConfirm = () => {
    // BalanceChangeChoices handleConfirmChoices 에 pub 이미 해주는거 있어서 밑의 건 주석처리
    // webSocketService.sendBalanceChosenTopic(roomId, optionFirst, optionSecond)
    // setCurrentStep("choosing");
    // 주제 확정되고 나면 discussedNum 도 + 1
    // setDiscussedNum((prevNum) => prevNum + 1);
  };

  const handleTimerEnd = () => {
    setCurrentStep("changeChoices");
  };

  // 내가 이제부터 쭉~~ 구독해야하는 애들
  useEffect(
    () => {
      // 다음 단계로 넘어갈때 되면 알려줌
      webSocketService.subscribeToMemberState(roomId, (message) => {
        console.log("Received message:", message);

        if (message.memberState === "wrapup") {
          resetBalanceGamePeopleChoiceInfo([]);
          setGameStep("wrap-up");
        }
      });

      // 밸런스 게임 주제추천해준거 받아온다!!
      webSocketService.subscribeToBalanceTopic(roomId, (message) => {
        console.log("Received Topic : ", message);

        setOptionFirst(message.optionFirst);
        setOptionSecond(message.optionSecond);

        // 주제 받아왔으면 그때 그다음 changeChoices로 넘어가
        setCurrentStep("changeChoices");
      });

      // 받아오는 데이터
      // { "optionFirst" : "산", "optionSecond" : "바다"}

      // 밸런스 게임 주제확정된거 id와 함께 다시 받음
      webSocketService.subscribeToBalanceChosenTopic(roomId, (message) => {
        console.log("Topic is Chosen: ", message);

        settopicId(message.id);
        // console.log(topicId)

        // 주제 확정된거 메시지로 다시 받으면 호스트 아닌사람들도 choosing으로 넘어가
        setCurrentStep("choosing");

        // 주제 확정되고 나면 discussedNum 도 + 1
        setDiscussedNum((prevNum) => prevNum + 1);
      });

      // 받아오는 데이터
      // { "id" : "어쩌구", "roomId":1, "optionFirst":"산", "optionSecond":"바다"}

      // 밸런스 게임 사람들이 고른 선택지 받음
      webSocketService.subscribeToBalancePersonChoice(roomId, (message) => {
        console.log("What the member chose: ", message);

        // Extract the relevant information
        const personInfo = {
          memberId: message.memberId,
          choice: message.balanceResultSelectedOption,
        };

        // Update the store with the new choice information
        setBalanceGamePeopleChoiceInfo((prev) => {
          const existing = prev
            ? prev.find((info) => info.memberId === personInfo.memberId)
            : null;
          if (existing) {
            return prev.map((info) =>
              info.memberId === personInfo.memberId
                ? { ...info, choice: personInfo.choice }
                : info
            );
          } else {
            return [...(prev || []), personInfo];
          }
        });
      });

      // 받아오는 데이터
      // { "memberId":1, "balanceResultSelectedOption":"First" 아니면 "Second"}

      return () => {
        webSocketService.unsubscribe(`/api/sub/${roomId}/state`);
        webSocketService.unsubscribe(`/api/sub/balance/${roomId}/get-question`);
        webSocketService.unsubscribe(
          `/api/sub/balance/${roomId}/save-question`
        );
        // webSocketService.unsubscribe(`/api/sub/balance/${roomId}/selection`);
      };
      // dependency array 추가 (아마도 constant subscribing 의 원인...)
    },
    [
      // roomId,
      // topicId,
      // setGameStep,
      // currentStep,
      // purpose,
    ]
  );

  // topic id 뭔지 출력
  useEffect(() => {
    console.log("Topic Id: ", topicId);
  }, [topicId]);

  // 밸런스게임 사람들이 뭐 골랐는지 제대로 배열에 들어가는지 확인
  useEffect(() => {
    console.log("What people chose: ", balanceGamePeopleChoiceInfo);
  }, [balanceGamePeopleChoiceInfo]);

  return (
    <>
      {showModal && currentStep === "getReady" && (
        <BalanceGetReady
          setPurpose={setPurpose}
          onClose={handleSubjectSaveModal}
          dots={dots}
        />
      )}
      {currentStep === "changeChoices" && (
        <BalanceChangeChoices
          discussedNum={discussedNum}
          memberId={memberId}
          hostId={hostId}
          topicId={topicId}
          roomId={roomId}
          purpose={purpose}
          onConfirm={handleSubjectConfirm}
          optionFirst={optionFirst}
          optionSecond={optionSecond}
        />
      )}
      {currentStep === "choosing" && (
        <BalanceChoosing
          discussedNum={discussedNum}
          optionFirst={optionFirst}
          optionSecond={optionSecond}
          hostId={hostId}
          roomId={roomId}
          memberId={memberId}
          topicId={topicId}
          purpose={purpose}
          onTimerEnd={handleTimerEnd}
          currentStep={`${currentStep === "choosing" ? true : false}`}
        />
      )}
    </>
  );
};

export default Balance;
