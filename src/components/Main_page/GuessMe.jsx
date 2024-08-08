import React from "react";

const GuessMe = () => {
  return (
    <div className="flex gap-5">
      <p className="w-[350px] h-[300px] bg-white rounded-[30px] flex justify-center items-center">
        이미지
      </p>
      <div className="w-[350px] h-[300px] bg-white rounded-[30px] flex flex-col gap-3 items-center justify-center">
        <h1 className="text-base opacity-80">나를 맞춰봐</h1>
        <p className="text-black opacity-20">특이한 tmi, 공유하고 </p>
        <p className="text-black opacity-20">싶은 특별한 경험 등이 있나요?</p>
        <p className="text-black opacity-20">MBTI, 취미 등을 OX 문제로 내고 </p>
        <p className="text-black opacity-20">
          서로 맞춰보며 더 잘 알아갈 수 있게 될 거예요!
        </p>
        <p className="text-black opacity-20">OX 모양을 몸으로 직접 만들며 </p>
        <p className="text-black opacity-20">
          맞출 수 있기 때문에 더 재미있어요!
        </p>
      </div>
    </div>
  );
};

export default GuessMe;
