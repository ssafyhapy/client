import React from "react";
import WaitingRoomGameTurns from "../components/WaitingRoomGameTurns";
import ExitBtn from "../components/btn/ExitBtn";
import Chatbox from "../components/Chatbox";
import BasicBtn from "../components/btn/BasicBtn";

const WaitingRoom = () => {
  const btnText = "다음";
  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[75%] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Middle Div */}
        <div className="flex-grow flex overflow-hidden mt-5 h-[52vh]">
          <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-[52vh] mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
            <p className="m-5">camera background</p>
          </div>
          <div className="flex-[3] h-[52vh] ml-5 rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
            <Chatbox />
          </div>
        </div>

        {/* Bottom Div */}
        <div className="flex flex-col mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] relative flex items-center">
            <p>게임 설명</p>
          <div className="flex-grow flex items-center justify-center">
            <WaitingRoomGameTurns sectionNumber={3} />
          </div>
          <div className="absolute bottom-3 right-5">
            <BasicBtn btnText={btnText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
