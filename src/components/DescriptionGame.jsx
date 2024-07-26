import React from "react";

const DescriptionGame = ()=> {
  return (
    <div className="shadow-[0_4px_10px_rgba(66,72,81,0.5) rounded-[15px] w-[330px] h-[370px] bg-[rgba(255,255,255,0.8)]">
      <h1 className="text-[24px] text-[rgba(0,0,0,0.8)] text-center pt-[30px]">게임 이름</h1>
      <div className="text-[rgba(0,0,0,0.5)] text-center mt-[20px]">
        게임 설명
        <br />
        스스로를 어떻게 정의하시나요? 
        <br />
        남들에게 알려주고 싶은 
        <br />
        자신은 어떤 느낌인가요? 
        <br />
        자신을 한 줄로 정의할 만한 문구를 적고 
        <br />
        모두와 이야기해보세요. 
        <br />
        자신만의 독특한 문구를 생각해내서
        <br /> 
        대화를 나누면 더 재미있을 거예요!
      </div>
    </div>
  );
}

export default DescriptionGame