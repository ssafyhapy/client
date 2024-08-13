import React from "react";

const GuessMe = () => {
  return (
    <div className="flex">
      <div className="w-[350px] h-[300px] bg-white rounded-[30px] flex flex-col gap-3 items-center justify-center">
        <p className="text-black opacity-50">특이한 tmi, 공유하고 </p>
        <p className="text-black opacity-50">싶은 특별한 경험 등이 있나요?</p>
        <p className="text-[#9400d3b0]">MBTI, 취미 등을 OX 문제로 내고 </p>
        <p className="text-black opacity-50">
          서로 맞춰보며 더 잘 알아갈 수 있게 될 거예요!
        </p>
        <p className="text-[#9400d3b0]">OX 모양을 몸으로 직접 만들며 </p>
        <p className="text-black opacity-50">
          맞출 수 있기 때문에 더 재미있어요!
        </p>
      </div>
      <iframe src="https://lottie.host/embed/bea1f6ba-db0e-4fc7-8aa2-3da11e69ec2f/RwY6a3zApc.json"></iframe>
    </div>
  );
};

export default GuessMe;
