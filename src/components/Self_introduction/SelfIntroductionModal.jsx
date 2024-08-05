import React, { useState } from "react";
import BasicBtn from "../Buttons/BasicBtn";
import writingCharacter from "../../assets/Self_introduction/writing_character.png";
import axios from "axios";

const SelfIntroductionModal = ({
  readyPeople,
  btnText,
  onClose,
  onReady,
  initialContent,
  roomId,
  isFirstTime,
}) => {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState(""); // Error state for empty input

  const handleInputChange = (event) => {
    setContent(event.target.value);
    if (event.target.value.trim() === "") {
      setError("내용을 입력하세요."); // Show error if input is empty
    } else {
      setError("");
    }
  };

  const handleSave = async () => {
    if (content.trim() === "") {
      setError("내용을 입력하세요."); // Show error if input is empty
      return;
    }

    const url = isFirstTime
      ? `https://i11c209.p.ssafy.io/api/result/intro`
      : `https://i11c209.p.ssafy.io/api/result/intro/${roomId}/modify`;

    const requestData = isFirstTime
      ? { roomId: roomId, content: content }
      : { content: content };

    try {
      const response = await axios.post(
        url,
        requestData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w`,
          },
        }
      );
      console.log("Response:", response.data);
      onReady(response.data.data.content, false); // Always set isFirstTime to false after saving
    } catch (error) {
      console.error("Error:", error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-[rgba(255,255,255,0.95)] w-[50%] h-[40%] flex rounded-2xl shadow-lg justify-center">
        <div className="bg-custom-modal m-10 p-8 flex flex-col justify-center items-center relative rounded-2xl w-full">
          <div className="p-3 flex items-center justify-center">
            <div className="flex flex-col items-center mr-2 relative">
              <p className="font-bold text-[24px] text-[rgba(87,136,208)] text-center mb-5">
                스스로를 정의할 수 있는 문구를 작성해보세요!
              </p>
              <p className="text-[rgba(220,89,100)] text-xs text-center absolute left-0 bottom-0">
                *현재 {readyPeople}명이 기다리고 있어요!
              </p>
            </div>
            <img
              src={writingCharacter}
              alt="뭔갈 쓰고 있는 캐릭터 그림"
              className="w-14 h-14"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs mb-2">{error}</p>
          )}
          <div className="p-3 mb-5 flex items-center justify-center">
            <span className="mr-2 text-xl">나는</span>
            <input
              className="text-xl border rounded p-1"
              type="text"
              value={content}
              onChange={handleInputChange}
            />
            <span className="ml-2 text-xl">다.</span>
          </div>
          <div className="absolute bottom-5 right-5">
            <BasicBtn btnText={btnText} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfIntroductionModal;