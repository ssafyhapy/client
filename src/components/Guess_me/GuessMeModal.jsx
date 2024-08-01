import React, { useState } from "react";
import BasicBtn from "../Buttons/BasicBtn";

const GuessMeModal = ({ userName, readyPeople, btnText, onClose, onReady }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({ 1: null, 2: null, 3: null });

  const handleAnswerClick = (questionNumber, answer) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionNumber]: answer,
    }));
  };

  const handleSave = () => {
    onReady()
    onClose()
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-[rgba(255,255,255,0.95)] w-[50%] h-[75%] flex rounded-2xl shadow-lg">
        <div className="bg-custom-modal m-10 p-8 flex flex-col justify-center items-center relative rounded-2xl w-full">
          <div className="p-3 flex flex-col items-center">
            <div className="flex flex-col items-center w-full">
              <p className="font-bold text-[32px] text-[rgba(87,136,208)] text-center mb-5">
                OX 문제 작성
              </p>
              <p className="text-[rgba(220,89,100)] text-[14px] text-center">
                *현재 {readyPeople}명이 {userName}님을 기다리고 있어요!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full flex-grow">
            {[1, 2, 3].map(questionNumber => (
              <div key={questionNumber} className="p-2 mb-5 flex items-center w-full justify-center">
                <span className="mr-2 text-xl text-[rgba(87,136,208)]">{questionNumber}. </span>
                <input className="w-[70%] text-xl border rounded p-1" type="text" />
                <span>
                  <button
                    onClick={() => handleAnswerClick(questionNumber, 'O')}
                    className={`text-white text-[28px] bg-[rgba(141,179,235)] px-2 py-1 ml-10 rounded-lg ${
                      selectedAnswers[questionNumber] === 'O' ? 'border-2 border-black' : ''
                    }`}
                  >
                    O
                  </button>
                </span>
                <span>
                  <button
                    onClick={() => handleAnswerClick(questionNumber, 'X')}
                    className={`text-white text-[28px] bg-[rgba(244,167,167)] px-2 py-1 ml-5 rounded-lg ${
                      selectedAnswers[questionNumber] === 'X' ? 'border-2 border-black' : ''
                    }`}
                  >
                    X
                  </button>
                </span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-5 right-5">
            <BasicBtn btnText={btnText} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessMeModal;
