import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 필요한 컴포넌트 import
import Chatbox from "./../Common/Chatbox";
import ExitBtn from "./../Buttons/ExitBtn";
import GameTurns from "./../Common/GameTurns";
import BasicBtn from "../Buttons/BasicBtn";
import GuessMeModal from "./GuessMeModal";

import snowingCloud from "../../assets/Common/snowing_cloud.png";
import star from "../../assets/Common/star.png";
import useGameStore from "../../store/useGameStore";

const GuessMeGetReady = ({ guessMeStep, setGuessMeStep }) => {
  const { roomId } = useGameStore();
  const [dots, setDots] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userStatus, setUserStatus] = useState("준비완료");
  const [allPrepared, setAllPrepared] = useState(false);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const userName = "김남숙"; // Example user name, you can replace it with actual data
  const readyPeople = 3; // Example number of people waiting, you can replace it with actual data
  const btnText = "작성 문구 수정"; // Example button text, you can replace it with actual data

  const handleSave = async () => {
    const oneSearch = await searchOneSelfIntro();
    if (oneSearch.length > 0) {
      modifySelfIntro();
    } else {
      postSelfIntro();
    }
  };

  const postSelfIntro = () => {
    const data = Object.keys(questions).map((key) => ({
      roomId: roomId,
      content: questions[key],
      answer: selectedAnswers[key],
    }));

    axios
      .post("https://i11c209.p.ssafy.io/api/result/ox", data, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
        },
      })
      .then((response) => {
        console.log("postSelfIntro 성공", response.data);
      })
      .catch((error) => {
        console.error("Error in postSelfIntro:", error);
      });
  };

  const searchOneSelfIntro = async () => {
    try {
      const response = await axios.get(
        `https://i11c209.p.ssafy.io/api/result/ox/${roomId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
          },
        }
      );
      console.log("단건 조회", response.data);
      const oneSearch = response.data.data;

      if (oneSearch.length > 0) {
        const newQuestions = {};
        const newSelectedAnswers = {};

        oneSearch.forEach((question, index) => {
          newQuestions[index + 1] = question.content;
          newSelectedAnswers[index + 1] = question.answer;
        });
        setQuestions(newQuestions);
        setSelectedAnswers(newSelectedAnswers);
      }

      return oneSearch;
    } catch (error) {
      console.log("Error in searchOneSelfIntro:", error);
      return [];
    }
  };

  const modifySelfIntro = async () => {
    const data = Object.keys(questions).map((key) => ({
      content: questions[key],
      answer: selectedAnswers[key],
    }));

    try {
      const response = await axios.patch(
        `https://i11c209.p.ssafy.io/api/result/ox/${roomId}/modify`,
        data,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w",
          },
        }
      );
      console.log("수정 성공", response.data);
    } catch (error) {
      console.log("Error in modifySelfIntro:", error);
    }
  };

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
      searchOneSelfIntro();
      setShowModal(true);
      setUserStatus("준비중"); // Set status to "준비중" when modal opens
    }, 250); // Show modal after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // 모두 준비완료되면 3초 뒤에 guess-me 본게임으로 페이지 바뀜
  useEffect(() => {
    if (allPrepared) {
      const timer = setTimeout(() => {
        setGuessMeStep("Answer");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allPrepared, setGuessMeStep]); // useEffect 의존성 배열에 setGuessMeStep 추가

  const handleOpenModal = () => {
    setShowModal(true);
    setUserStatus("준비중");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserStatus("준비완료");
    handleSave();
  };

  const handleReady = () => {
    setUserStatus("ready");
    setAllPrepared(true); // For demonstration, set this to true when ready
  };

  useEffect(() => {
    if (allPrepared) {
      setTimeout(() => {
        setGuessMeStep("Answer");
      }, 2000);
    }
  }, [allPrepared, setGuessMeStep]); // useEffect 의존성 배열에 setGuessMeStep 추가

  return (
    <>
      {/* Bottom Div */}

      {!allPrepared ? (
        <div className="flex-grow flex items-center justify-center">
          <img src={snowingCloud} alt="star 그림" />
          <span className="text-transparent">&nbsp;&nbsp;</span>
          <span className="text-[rgba(85,181,236)]">
            나를 맞춰봐 문제가 만들어지고 있어요{dots}
          </span>
        </div>
      ) : (
        <div className="flex-grow w-[95%] flex items-center justify-center">
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
    </>
  );
};

export default GuessMeGetReady;
