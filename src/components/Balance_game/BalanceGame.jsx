import React, { useState, useEffect } from "react";
import useGameStore from "../../store/useGameStore";
import BalanceGetReady from "./BalanceGetReady";
import BalanceChangeChoices from "./BalanceChangeChoices";
import BalanceChoosing from "./BalanceChoosing";

import useAuthStore from "../../store/useAuthStore";
import useRoomStore from "../../store/useRoomStore";
import webSocketService from "../../WebSocketService";

const Balance = () => {
  const { memberId } = useAuthStore()
  const { roomId, hostId } = useRoomStore()

  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const [showModal, setShowModal] = useState(true);
  const [currentStep, setCurrentStep] = useState("getReady");
  const [dots, setDots] = useState("");

  // 방장이 적은 text
  const [purpose, setPurpose] = useState("")
  // 추천받은 주제
  const [optionFirst, setOptionFirst] = useState("")
  const [optionSecond, setOptionSecond] = useState("")

  // 주제확정되면 주제 id 들고다녀
  const [topicId, settopicId] = useState("")


  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSubjectSaveModal = () => {
    // 모달 닫을때 purpose pub 해줘야함
    webSocketService.sendBalancePurpose(roomId, purpose)
    setShowModal(false);
    // setCurrentStep("changeChoices");
  };

  const handleSubjectConfirm = () => {
    setCurrentStep("choosing");
  };

  const handleTimerEnd = () => {
    setCurrentStep("changeChoices");
  };

  // 내가 이제부터 쭉~~ 구독해야하는 애들
  useEffect(() => {

    // 다음 단계로 넘어갈때 되면 알려줌
    webSocketService.subscribeToMemberState(roomId, (message) => {
      console.log("Received message:", message)

      if (message.memberState === "wrapup") {
        setGameStep("wrap-up")
      }
    })

    // 밸런스 게임 주제추천해준거 받아온다!!
    webSocketService.subscribeToBalanceTopic(roomId, (message) => {
      console.log("Received Topic : ", message)

      setOptionFirst(message.optionFirst)
      setOptionSecond(message.optionSecond)

      // 주제 받아왔으면 그때 그다음 changeChoices로 넘어가
      setCurrentStep("changeChoices");
    })

    // 받아오는 데이터
    // { "optionFirst" : "산", "optionSecond" : "바다"}

    // 밸런스 게임 주제확정된거 id와 함께 다시 받음
    webSocketService.subscribeToBalanceChosenTopic(roomId, (message) => {
      console.log("Topic is Chosen: ", message)

      settopicId(message.id)
      // console.log(topicId)

      // 주제 확정된거 메시지로 다시 받으면 호스트 아닌사람들도 choosing으로 넘어가
      setCurrentStep("choosing")
    })

    // 받아오는 데이터
    // { "id" : "어쩌구", "roomId":1, "optionFirst":"산", "optionSecond":"바다"}

    // 밸런스 게임 사람들이 고른 선택지 받음
    webSocketService.subscribeToBalancePersonChoice(roomId, (message) => {
      console.log("What the member chose: ", message)
    })

    // 받아오는 데이터
    // { "memberId":1, "balanceResultSelectedOption":"First" 아니면 "Second"}

    return () => {
      webSocketService.unsubscribe(`/api/sub/${roomId}/state`)
      webSocketService.unsubscribe(`/api/sub/balance/${roomId}/get-question`)
      webSocketService.unsubscribe(`/api/sub/balance/${roomId}/save-question`)
      webSocketService.unsubscribe(`/api/sub/balance/${roomId}/selection`)
    }
    // dependency array 추가 (아마도 constant subscribing 의 원인...)
  }, [roomId, topicId, setGameStep, currentStep])

  useEffect(() => {
    console.log("Topic Id: ", topicId)
  }, [topicId])

  return (
    <>
      {showModal && currentStep === "getReady" && (
        <BalanceGetReady setPurpose={setPurpose} onClose={handleSubjectSaveModal} dots={dots} />
      )}
      {currentStep === "changeChoices" && (
        <BalanceChangeChoices memberId={memberId} hostId={hostId} topicId={topicId} roomId={roomId} purpose={purpose} onConfirm={handleSubjectConfirm} optionFirst={optionFirst} optionSecond={optionSecond} />
      )}
      {currentStep === "choosing" && <BalanceChoosing optionFirst={optionFirst} optionSecond={optionSecond} hostId={hostId} roomId={roomId} memberId={memberId} topicId={topicId} purpose={purpose} onTimerEnd={handleTimerEnd} currentStep={`${currentStep==="choosing"?true:false}`}/>}
    </>
  );
};

export default Balance;
