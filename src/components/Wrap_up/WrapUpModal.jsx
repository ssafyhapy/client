import React from "react";
import BasicBtn from "../Buttons/BasicBtn";

const WrapUpModal = ({ btnText, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.5)]">
      <div className="bg-[rgba(255,255,255,0.95)] w-[43%] h-[50%] rounded-2xl flex justify-center">
        <div className="bg-custom-modal m-10 p-8 rounded-2xl relative flex flex-col justify-center">
          <div className="flex flex-col justify-center p-3 m-3 text-[rgba(85,181,236)]">
            <p>서로와 친밀감은 좀 쌓이셨나요?</p>
            <br />
            <p>
              이제부터는 모두 가면을 벗고 함께 자유롭게 대화를 나눌 수 있는
              시간이 주어집니다.
            </p>
            <br />
            <p>
              각 섹션 별로 소감과 서로에 대해 궁금했던 점에 대해 자유롭게 이야기
              나눠주세요.
            </p>
            <br />
          </div>
          <div className="absolute bottom-5 right-5">
            <BasicBtn btnText={btnText} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapUpModal;
