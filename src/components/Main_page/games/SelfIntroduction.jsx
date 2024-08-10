import React from "react";

const SelfIntroduction = () => {
  return (
    <div className="flex">
      <iframe src="https://lottie.host/embed/181499d8-6df1-44a1-94b7-f592ea5fdbe9/Lvh01c4yqz.json"></iframe>
      <div className="w-[350px] h-[300px] bg-white rounded-[30px] flex flex-col gap-3 items-center justify-center ">
        <p className="text-[#4D98F7]">스스로를 어떻게 정의하시나요? </p>
        <p className="text-black opacity-50">남들에게 알려주고 싶은 </p>
        <p className="text-black opacity-50">자신은 어떤 느낌인가요?</p>
        <p className="text-[#4D98F7]">
          자신을 한 줄로 정의할 만한 문구를 적고
        </p>
        <p className="text-[#4D98F7]">모두와 이야기해보세요.</p>
        <p className="text-black opacity-50">
          자신만의 독특한 문구를 생각해내서
        </p>
        <p className="text-black opacity-50">
          대화를 나누면 더 재미있을 거예요!
        </p>
      </div>
    </div>
  );
};

export default SelfIntroduction;
