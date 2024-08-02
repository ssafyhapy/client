import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 필요한 컴포넌트 import
import Chatbox from "../../../components/Common/Chatbox";
import ExitBtn from "../../../components/Buttons/ExitBtn";
import GameTurns from "../../../components/Common/GameTurns";
import BasicBtn from "../../../components/Buttons/BasicBtn";
import GuessMeModal from "../../../components/Guess_me/GuessMeModal";

import snowingCloud from "../../../assets/Common/snowing_cloud.png";
import star from "../../../assets/Common/star.png";
import useGameStore from "../../../store/useGameStore";

const GuessMeGetReady = () => {
  const { roomId } = useGameStore();
  const [dots, setDots] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userStatus, setUserStatus] = useState("준비완료");
  const [allPrepared, setAllPrepared] = useState(false);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState({ 1: "", 2: "", 3: "" });
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: null,
    2: null,
    3: null,
  });

  const userName = "김남숙"; // Example user name, you can replace it with actual data
  const readyPeople = 3; // Example number of people waiting, you can replace it with actual data
  const btnText = "작성 문구 수정"; // Example button text, you can replace it with actual data

  const handleSave = () => {
    const postSelfIntro = async () => {
      try {
        const data = Object.keys(questions).map((key) => ({
          roomId: roomId,
          memberRoomId: 2,
          content: questions[key],
          answer: selectedAnswers[key],
        }));

        const response = await axios.post(
          "https://i11c209.p.ssafy.io/api/result/ox",
          data,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
            },
          }
        );
        console.log(response.data); // Handle the response data
      } catch (error) {
        console.error("Error in handleSave:", error);
      }
    };
    postSelfIntro();
  };

  // const handleEdit = () => {
  //   const modifySelfIntro = async () => {
  //     try {
  //       const data = Object.keys(questions).map((key) => ({
  //         roomId: roomId,
  //         memberRoomId: 1,
  //         content: questions[key],
  //         answer: selectedAnswers[key],
  //       }));

  //       const response = await axios.patch(
  //         "https://i11c209.p.ssafy.io/api/result/ox/modify",
  //         data,
  //         {
  //           headers: {
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
  //           },
  //         }
  //       );
  //       console.log(response.data); // Handle the response data
  //     } catch (error) {
  //       console.error("Error in handleSave:", error);
  //     }
  //   };
  //   modifySelfIntro();
  // };

  // 준비중 ... (점들 계속 움직이게 만드는거)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // 2초뒤 모달띄우기
  useEffect(() => {
    // Show the modal after some time or based on a condition
    const timer = setTimeout(() => {
      setShowModal(true);
      setUserStatus("준비중"); // Set status to "준비중" when modal opens
    }, 250); // Show modal after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // 모두 준비완료되면 3초 뒤에 guess-me 본게임으로 페이지 바뀜
  useEffect(() => {
    if (allPrepared) {
      const timer = setTimeout(() => {
        navigate("/guessme");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allPrepared, navigate]);

  const handleOpenModal = () => {
    setShowModal(true);
    setUserStatus("준비중");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserStatus("준비중");
    handleSave();
  };

  const handleReady = () => {
    setUserStatus("ready");
    setAllPrepared(true); // For demonstration, set this to true when ready
  };

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

        {/* Mid-Bottom Between Div */}
        <div className="text-xs mt-3 flex justify-start">
          {!allPrepared ? (
            <BasicBtn btnText={btnText} onClick={handleOpenModal} fontSize={12} />
          ) : (
            <div className="invisible">
              <BasicBtn btnText={"Hey"} fontSize={12} />
            </div>
          )}
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
          userName={userName}
          readyPeople={readyPeople}
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
