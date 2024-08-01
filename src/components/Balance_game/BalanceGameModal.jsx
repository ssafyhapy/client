import React, { useState, useEffect } from "react";
import BasicBtn from "./../../components/btn/BasicBtn";

const BalanceGameModal = ({ btnText, onClose }) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-[rgba(255,255,255,0.95)] w-[50%] h-[65%] flex rounded-2xl shadow-lg">
        <div className="bg-custom-modal m-10 p-8 justify-center items-center relative rounded-2xl w-full">
          <div className="p-3 flex items-center">
            <div className="flex flex-col mr-2 w-full justify-center">
              <p className="font-bold text-[32px] text-[rgba(87,136,208)] text-center">
                이 모임에서는 누구와
              </p>
              <p className="font-bold text-[32px] text-[rgba(87,136,208)] text-center mb-5">
                어떤 활동을 하나요?
              </p>
              <p className="text-[rgba(220,89,100)] text-[14px]">
                *제출 이후 수정은 불가능합니다.
              </p>
            </div>
          </div>
          <div className="p-2 mb-5 flex items-center">
            <textarea className="w-[90%] text-xl border rounded p-1 resize-none" />
          </div>
          <p className="text-[rgba(0,0,0,0.45)] text-[14px]">
            *밸런스 게임을 위해 받는 질문으로
          </p>
          <p className="text-[rgba(0,0,0,0.45)] text-[14px]">
            현 대답과 연관된 밸런스 게임의 주제 혹은 기타 흥미로운 주제가
            랜덤으로 공개됩니다.
          </p>
          <div className="absolute bottom-5 right-5">
            <BasicBtn btnText={btnText} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceGameModal;
