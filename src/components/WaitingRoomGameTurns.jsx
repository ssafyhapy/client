import React, { useState } from "react";
import checkedCircle from "./../assets/checked.png";
import circle from "./../assets/circle.png";
import arrow from "./../assets/arrow.png";

const WaitingRoomGameTurns = ({ sectionNumber }) => {
  const [hoveredSection, setHoveredSection] = useState(null);

  const handleMouseEnter = (section) => {
    setHoveredSection(section);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  return (
    <>
      <div className="flex justify-center gap-5 w-[60vw] h-[50%]">
        <div
          className="flex flex-col items-center justify-center h-full relative"
          onMouseEnter={() => handleMouseEnter("self-introduction")}
          onMouseLeave={handleMouseLeave}
        >
          <img src={checkedCircle} alt="" />
          <div className="text-[18px]">한 줄 자기소개</div>
          {hoveredSection === "self-introduction" && (
            <div
              className="absolute bottom-full w-[20vw] h-[35vh] mt-2 p-2 bg-white shadow-lg rounded flex flex-col justify-center items-center gap-3 rounded-[15px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(221, 229, 249, 0.7), rgba(142, 210, 255, 0.7))",
              }}
            >
              <div className="flex justify-center items-center text-[1.3rem] bg-[rgba(255,255,255,0.7)] text-[rgba(0,0,0,0.5)] w-full rounded-[15px]">
                한 줄 자기소개
              </div>
              <div className="flex flex-col gap-3 justify-center items-center text-[16px] p-2 bg-[rgba(255,255,255,0.7)] text-center text-[rgba(0,0,0,0.5)] w-full rounded-[15px] min-h-[75%]">
                <div>
                  <div className="text-[#96A5FE]">“나는 ________이다.”</div>
                  <div>
                    한 문장으로 자신을
                    <br />
                    소개할 수 있는 문구를
                    <br />
                    적어 보세요.
                  </div>
                </div>
                <div className="text-left w-full text-[12px]">
                  예상 소요 시간 : 10분
                </div>
              </div>
            </div>
          )}
        </div>
        <img src={arrow} alt="" />
        <div
          className="flex flex-col items-center justify-center h-full relative"
          onMouseEnter={() => handleMouseEnter("guess")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={checkedCircle}
            alt=""
            className={`${sectionNumber < 2 ? "hidden" : ""}`}
          />
          <img
            src={circle}
            alt=""
            className={`${sectionNumber >= 2 ? "hidden" : ""}`}
          />
          <div className="text-[18px]">나를 맞춰봐</div>
          {hoveredSection === "guess" && (
            <div
              className="absolute bottom-full w-[20vw] h-[35vh] mt-2 p-2 bg-white shadow-lg rounded flex flex-col justify-center items-center gap-3 rounded-[15px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(221, 229, 249, 0.7), rgba(142, 210, 255, 0.7))",
              }}
            ><div>
              
            </div>
              <div className="flex justify-center items-center text-[1.3rem] bg-[rgba(255,255,255,0.7)] text-[rgba(0,0,0,0.5)] w-full rounded-[15px]">
                나를 맞춰봐
              </div>
              <div className="flex flex-col gap-3 justify-center items-center text-[16px] p-2 bg-[rgba(255,255,255,0.7)] text-center text-[rgba(0,0,0,0.5)] w-full rounded-[15px] min-h-[75%]">

                <div>
                  스스로에 대해알려주고 싶은 정보(MBTI, 고향, 취미 등)를
                  진실과 거짓을 섞어 3가지의 OX 문제를 내고 맞춰보며 서로에 대해 
                  알아가는 시간을 가져요
                </div>
                <div className="text-left w-full text-[12px]">
                  예상 소요 시간 : 20분
                </div>
              </div>
            </div>
          )}
        </div>
        <img src={arrow} alt="" />
        <div
          className="flex flex-col items-center justify-center h-full relative"
          onMouseEnter={() => handleMouseEnter("balance")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={checkedCircle}
            alt=""
            className={`${sectionNumber < 3 ? "hidden" : ""}`}
          />
          <img
            src={circle}
            alt=""
            className={`${sectionNumber >= 3 ? "hidden" : ""}`}
          />
          <div className="text-[18px]">밸런스 게임</div>
          {hoveredSection === "balance" && (
            <div
              className="absolute bottom-full w-[20vw] h-[35vh] mt-2 p-2 bg-white shadow-lg rounded flex flex-col justify-center items-center gap-3 rounded-[15px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(221, 229, 249, 0.7), rgba(142, 210, 255, 0.7))",
              }}
            >
              <div className="flex justify-center items-center text-[1.3rem] bg-[rgba(255,255,255,0.7)] text-[rgba(0,0,0,0.5)] w-full rounded-[15px]">
                밸런스 게임
              </div>
              <div className="flex flex-col justify-center items-center gap-3 text-[16px] p-2 bg-[rgba(255,255,255,0.7)] text-center text-[rgba(0,0,0,0.5)] w-full rounded-[15px] min-h-[75%]">
                <div>
                  밸런스 게임 시작 전 방장에게서 입력받은 모임 주제를 기반으로
                  랜덤하게 밸런스 게임 선택지를 추천해드려요. 두 가지 선택지 중
                  하나를 선택하고 열띤 대화를 나누며 더 친밀해져보아요.
                </div>
                <div className="text-left w-full text-[12px]">
                  예상 소요 시간 : 15분
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WaitingRoomGameTurns;
