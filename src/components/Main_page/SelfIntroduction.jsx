import React from "react";

const SelfIntroduction = () => {
  return (
    <div className="flex gap-5">
      <p className="w-[350px] h-[300px] bg-white rounded-[30px] flex justify-center items-center ">
        이미지
      </p>
      <div className="w-[350px] h-[300px] bg-white rounded-[30px] flex flex-col gap-3 items-center justify-center">
        <h1 className="text-base opacity-80">한 줄 자기소개</h1>
        <p className="text-black opacity-20">스스로를 어떻게 정의하시나요? </p>
        <p className="text-black opacity-20">남들에게 알려주고 싶은 </p>
        <p className="text-black opacity-20">자신은 어떤 느낌인가요?</p>
        <p className="text-black opacity-20">
          자신을 한 줄로 정의할 만한 문구를 적고
        </p>
        <p className="text-black opacity-20">모두와 이야기해보세요.</p>
        <p className="text-black opacity-20">
          자신만의 독특한 문구를 생각해내서
        </p>
        <p className="text-black opacity-20">
          대화를 나누면 더 재미있을 거예요!
        </p>
      </div>
    </div>
  );
};

export default SelfIntroduction;
