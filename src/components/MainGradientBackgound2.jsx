import React from "react";

const MainGradientBackground2 = ({ children }) => {
  return (
    <div className="relative w-full h-screen bg-custom-gradient-main2 overflow-hidden z-0">
      {/* 원6 - 세번째큰원 (보라원안에있음) */}
      <div
        className="absolute rounded-full w-[170px] h-[170px] bottom-[305px] right-[1058px]"
        style={{
          background: "linear-gradient(0deg, #B39DE7 0%, #FCE9FF 100%)",
          opacity: 0.56,
        }}
      ></div>
      {/* 원5 - 맨아래있는원 */}
      <div
        className="absolute rounded-full w-[100px] h-[100px] bottom-[487px] right-[194px]"
        style={{
          background: "linear-gradient(0deg, #B39DE7 0%, #FCE9FF 100%)",
          opacity: 0.56,
        }}
      ></div>
      {/* 원4 - 두번째큰원 (보라원안에있음) */}
      <div
        className="absolute rounded-full w-[120px] h-[120px] bottom-[209px] right-[680px]"
        style={{
          background: "linear-gradient(0deg, #B39DE7 0%, #FCE9FF 100%)",
          opacity: 0.56,
        }}
      ></div>
      {/* 원3 - 젤작은원 */}
      <div
        className="absolute rounded-full w-[80px] h-[80px] bottom-[78px] right-[450px]"
        style={{
          background: "linear-gradient(-30deg, #B39DE7 0%, #FCE9FF 70%)",
        }}
      ></div>
      {/* 원2 - 보라 블러원 */}
      <div className="absolute rounded-full w-[700px] h-[700px] bg-[rgba(195,173,246,0.98)] blur-[40px] bottom-[-150px] right-[620px]"></div>
      {/* 원1 - 왼쪽위 */}
      <div
        className="absolute rounded-full w-[1106px] h-[1106px] bg-[rgba(248,206,236,0.98)] blur-[50px] bottom-[-800px] right-[-680px]"
        style={{
          opacity: 0.98,
        }}
      ></div>
      {/* children을 배치할 위치 */}
      <div className="flex justify-center h-full items-center">{children}</div>
    </div>
  );
};

export default MainGradientBackground2;