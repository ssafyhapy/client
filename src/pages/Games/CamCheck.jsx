import React, { useState } from "react";
import GameBackground from "../../components/Common/GameBackground";
import BasicBtn from "../../components/Buttons/BasicBtn";
import CameraCheckVideoView from "../../components/Camera_check/CameraCheckVideoView";
import MicBtn from "../../components/Buttons/MicBtn";
import MaskBtn from "../../components/Buttons/MaskBtn";
import SelectMask from "../../components/Waiting_room/SelectMask";
import { useNavigate } from "react-router-dom";

const CamCheck = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
  const btnText = "완료";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate()

  const handleNextStep = ()=>{
    navigate("/waiting-room")
  }

  return (
    <GameBackground>
      <div className="flex flex-col justify-center items-center p-[2rem] w-full max-h-[90vh] relative">
        <div className="w-[80%] relative ">
          <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px] max-h-[60vh]">
            <div className="h-[28rem] flex justify-center items-center">
              <CameraCheckVideoView data={{ name: "someone", mic: false, ready: true }} />
            </div>
            <div className="flex justify-between">
              <span className="mr-20">
                <MicBtn />
              </span>
              <span className="relative">
                <MaskBtn onClick={handleOpenModal} />
                {isModalOpen && (
                  <div className="absolute top-0 left-full ml-4">
                    <SelectMask handleCloseModal={handleCloseModal} />
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
            <div className="flex-grow flex items-center justify-center">
              {text}
            </div>
            <div className="absolute bottom-4 right-4">
              <BasicBtn btnText={btnText} onClick={handleNextStep} />
            </div>
          </div>
        </div>
      </div>
    </GameBackground>
  );
};

export default CamCheck;