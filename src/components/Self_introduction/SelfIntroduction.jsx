import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGameStore from "./../../store/useGameStore";
import Chatbox from "./../Common/Chatbox";
import BasicBtn from "./../Buttons/BasicBtn";
import ExitBtn from "./../Buttons/ExitBtn";
import GameTurns from "./../Common/GameTurns";
import SelfIntroductionModal from "./../Self_introduction/SelfIntroductionModal"; // Adjust the import path based on your project structure
import BottomDiv from "../Common/BottomDiv";

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
  const [showModal, setShowModal] = useState(true); // Set to true to show modal initially
  const [userStatus, setUserStatus] = useState("준비완료");
  const [allPrepared, setAllPrepared] = useState(false);
  const [initialContent, setInitialContent] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true); // Track if it is the first time saving content
  const [isGamePhase, setIsGamePhase] = useState(false); // Track if we are in the game phase
  const [introductions, setIntroductions] = useState([]);
  const [userText, setUserText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  const readyPeople = 3; // Example number of people waiting, you can replace it with actual data
  const btnText = "작성 문구 수정"; // Example button text, you can replace it with actual data
  const roomId = 1;
  const memberId = 4;

  // 준비중 ... (점들 계속 움직이게 만드는거)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Fetch initial content when component mounts
  useEffect(() => {
    const fetchInitialContent = async () => {
      try {
        const response = await axios.get(
          `https://i11c209.p.ssafy.io/api/result/intro/${roomId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w`,
            },
          }
        );
        const userIntro = response.data.data.find(
          (intro) => intro.memberId === memberId
        );
        if (userIntro) {
          setInitialContent(userIntro.content);
          setIsFirstTime(false); // It is not the first time if content exists
        } else {
          setIsFirstTime(true); // Set to true if no content exists
        }
      } catch (error) {
        console.error("Error fetching initial content:", error);
      }
    };
    fetchInitialContent();
  }, [roomId]);

  // Fetch all introductions when entering the game phase
  useEffect(() => {
    if (isGamePhase) {
      const fetchIntroductions = async () => {
        try {
          const response = await axios.get(
            `https://i11c209.p.ssafy.io/api/result/intro/${roomId}/all`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w`,
              },
            }
          );
          console.log(response.data);
          setIntroductions(response.data.data);
          if (response.data.data.length > 0) {
            setUserText(response.data.data[0].content);
          }
        } catch (error) {
          console.error("Error fetching introductions:", error);
        }
      };
      fetchIntroductions();
    }
  }, [isGamePhase, roomId]);

  const handleOpenModal = () => {
    setShowModal(true);
    setUserStatus("준비중");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserStatus("준비완료");
  };

  const handleReady = (updatedContent, isFirstTimeStatus) => {
    setInitialContent(updatedContent);
    setIsFirstTime(isFirstTimeStatus); // Update isFirstTime status
    setUserStatus("준비완료");
    setAllPrepared(true); // Set to true to show "준비 완료!"
  };

  // Move to the game phase if allPrepared is true
  useEffect(() => {
    if (allPrepared) {
      const timer = setTimeout(() => {
        setIsGamePhase(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [allPrepared]);

  const handleNextStep = async () => {
    if (currentIndex < introductions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setUserText(introductions[nextIndex].content);
    } else {
      try {
        await axios.delete(
          `https://i11c209.p.ssafy.io/api/result/intro/${roomId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w`,
            },
          }
        );
        console.log("Redis data deleted and saved to the actual database");
        setGameStep("photo-first");
        // navigate("/photo-first");
      } catch (error) {
        console.error("Error deleting Redis data:", error);
      }
    }
  };

  return (
    <>
      {/* Bottom Div */}
      {!isGamePhase ? (
        <>
          {!allPrepared ? (
            <div className="flex-grow flex items-center justify-center">
              <img src="src/assets/common/snowing_cloud.png" alt="구름 그림" />
              <span className="text-transparent">&nbsp;&nbsp;</span>
              <span className="text-[rgba(85,181,236)]">
                한 줄 자기소개 문제가 만들어지고 있어요{dots}
              </span>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <img src="src/assets/common/star.png" alt="star 그림" />
              <span className="text-transparent">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-[rgba(85,181,236)]">전원 준비 완료!!</span>
              <span className="text-transparent">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <img src="src/assets/common/star.png" alt="star 그림" />
            </div>
          )}
          <div className="flex justify-end"></div>
        </>
      ) : (
        <>
          <div className="flex-grow flex items-center justify-center">
            <span>나는</span>
            <span className="text-transparent">&nbsp;</span>
            <span className="text-[rgb(129,109,255)] border-solid border-b-4 border-[rgb(129,109,255)]">
              {userText}
            </span>
            <span className="text-transparent">&nbsp;</span>
            <span>다.</span>
          </div>
          <div className="absolute bottom-3 right-5">
            <BasicBtn btnText="다음" onClick={handleNextStep} />
          </div>
          <img
            src="src/assets/Self_introduction/thinking_character.png"
            alt="생각하는 캐릭터 그림"
            className="absolute bottom-0 left-0 mb-3 ml-3 max-w-[100px] max-h-[100px]"
          />
        </>
      )}
      {showModal && (
        <SelfIntroductionModal
          readyPeople={readyPeople}
          btnText="저장"
          onClose={handleCloseModal}
          onReady={handleReady}
          initialContent={initialContent}
          roomId={roomId}
          isFirstTime={isFirstTime} // Pass the isFirstTime prop
        />
      )}
    </>
  );
};

export default SelfIntroduction;
