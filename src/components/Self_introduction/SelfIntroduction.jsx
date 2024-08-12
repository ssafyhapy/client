import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "./../../store/useGameStore";
import useAuthStore from "./../../store/useAuthStore";
import useRoomStore from "../../store/useRoomStore";
import Chatbox from "./../Common/Chatbox";
import BasicBtn from "./../Buttons/BasicBtn";
import ExitBtn from "./../Buttons/ExitBtn";
import GameTurns from "./../Common/GameTurns";
import SelfIntroductionModal from "./../Self_introduction/SelfIntroductionModal";
import webSocketService from "./../../WebSocketService";
import BottomDiv from "../Common/BottomDiv";

import usePresenterStore from "../../store/usePresenterStore";

const SelfIntroduction = () => {
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
  } = useGameStore();
  const [dots, setDots] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [userStatus, setUserStatus] = useState("준비완료");
  const [allPrepared, setAllPrepared] = useState(false);
  const [initialContent, setInitialContent] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isGamePhase, setIsGamePhase] = useState(false);
  const [introductions, setIntroductions] = useState([]);
  const [userText, setUserText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [currentPresenterId, setCurrentPresenterId] = useState(null);
  const navigate = useNavigate();

  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  const setCurrentPresenterId = usePresenterStore((state) => state.setCurrentPresenterId)

  // 멤버아이디는 로그인하면 받아오게하기
  const { memberId } = useAuthStore();
  // const memberId = 4
  // 호스트아이디는 일단 박아두기
  // const hostId = 4;
  // const {roomId} = useGameStore()

  // 호스트아이디 룸아이디 받아오기
  const { roomId, hostId } = useRoomStore();

  // 준비중... 점들 계속 움직이게 만드는거
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 백에서 보내준 메시지 받으면!!
  useEffect(() => {
    const handleMessageReceived = (message) => {
      console.log("Received message:", message);

      // if (message.content === "photofirst") {
      //   setGameStep("photo-first");
      //   return;
      // }

      setIntroductions((prev) => [...prev, message]);
      setCurrentPresenterId(message.memberId);
      setUserText(message.content);
      setAllPrepared(true);
      setTimeout(() => {
        setIsGamePhase(true);
      }, 2000);
    };

    // webSocketService.connect(() => {
    // webSocketService.subscribe(
    //   `/api/sub/intro/${roomId}/next`,
    //   handleMessageReceived
    // );
    webSocketService.subscribeToIntro(roomId, handleMessageReceived);
    webSocketService.subscribeToMemberState(roomId, (message) => {
      console.log("Received game state: ", message);
      if (message.memberState === "photofirst") {
        setGameStep("photo-first");
      }
    });
    // });

    return () => {
      console.log(`Unsubscribing from /api/sub/intro/${roomId}/next`);
      webSocketService.unsubscribe(`/api/sub/intro/${roomId}/next`);
      webSocketService.unsubscribe(`/api/sub/${roomId}/state`);
      // webSocketService.deactivate();
    };
  }, [roomId, setGameStep, webSocketService]);

  const fetchNextIntroduction = () => {
    webSocketService.sendIntroNext(roomId);
  };

  const handleIntroSubmit = (content) => {
    setShowModal(false);
    setUserStatus("준비완료");
  };

  const handleNextStep = () => {
    fetchNextIntroduction();
  };

  useEffect(() => {
    console.log("Member ID:", memberId);
    console.log("Current Presenter ID:", currentPresenterId);
  }, [memberId, currentPresenterId]);

  return (
    <>
      {/* Bottom Div */}
      {!isGamePhase ? (
        <>
          {!allPrepared ? (
            <div className="flex-grow flex items-center justify-center">
              <img
                src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/snowing_cloud.png"
                alt="구름 그림"
              />
              <span className="text-transparent">&nbsp;&nbsp;</span>
              <span className="text-[rgba(85,181,236)]">
                한 줄 자기소개 문제가 만들어지고 있어요{dots}
              </span>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <img
                src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/star.png"
                alt="star 그림"
              />
              <span className="text-transparent">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-[rgba(85,181,236)]">전원 준비 완료!!</span>
              <span className="text-transparent">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <img
                src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/star.png"
                alt="star 그림"
              />
            </div>
          )}
          <div className="flex justify-end"></div>
        </>
      ) : (
        <>
          <div className="flex-grow flex items-center justify-center relative">
            <span>나는</span>
            <span className="text-transparent">&nbsp;</span>
            <span className="text-[rgb(129,109,255)] border-solid border-b-4 border-[rgb(129,109,255)]">
              {userText}
            </span>
            <span className="text-transparent">&nbsp;</span>
            <span>다.</span>
          </div>
          {memberId === currentPresenterId && (
            <div className="absolute bottom-3 right-5">
              <BasicBtn btnText="다음" onClick={handleNextStep} />
            </div>
          )}
          <img
            src="https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/thinking_character.png"
            alt="생각하는 캐릭터 그림"
            className="absolute bottom-0 left-0 mb-3 ml-3 max-w-[100px] max-h-[100px]"
          />
        </>
      )}
      {showModal && (
        <SelfIntroductionModal
          readyPeople={3}
          btnText="저장"
          onClose={() => setShowModal(false)}
          onReady={handleIntroSubmit}
          initialContent={initialContent}
          roomId={roomId}
          memberId={memberId}
          isFirstTime={isFirstTime}
        />
      )}
    </>
  );
};

export default SelfIntroduction;
