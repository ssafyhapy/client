import React from "react";
import BasicBtn from "./btn/BasicBtn";

const SelfIntroductionModal = ({ userName, readyPeople, btnText, onClose }) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-[rgba(255,255,255,0.80)] w-[50%] h-[40%] flex rounded-2xl shadow-lg">
        <div className="bg-custom-modal m-10 p-8 justify-center items-center relative rounded-2xl w-full">
          <div className="p-3 flex items-center">
            <div className="flex flex-col mr-2">
              <p className="font-bold text-sm">
                *스스로를 정의할 수 있는 문구를 작성해보세요!
              </p>
              <p className="text-[rgba(220,89,100)] text-xs">
                *현재 {readyPeople}명이 {userName}님을 기다리고 있어요!
              </p>
            </div>
            <img
              src="src/assets/writing_character.png"
              alt="뭔갈 쓰고 있는 캐릭터 그림"
              className="w-14 h-14"
            />
          </div>
          <div className="p-3 mb-5 flex items-center">
            <span className="mr-2 text-xl">{userName} 은 (는)</span>
            <input className="text-xl border rounded p-1" type="text" />
            <span className="ml-2 text-xl">이다.</span>
          </div>
          <div className="absolute bottom-5 right-5">
            <BasicBtn btnText={btnText} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfIntroductionModal;