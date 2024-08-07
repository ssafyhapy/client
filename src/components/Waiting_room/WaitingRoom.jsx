import React from "react";
import useGameStore from "../../store/useGameStore";
import WaitingRoomGameTurns from "../../components/Waiting_room/WaitingRoomGameTurns";
import BasicBtn from "../../components/Buttons/BasicBtn";

const WaitingRoom = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const btnText = "시작";

  const handleNextStep = () => {
    setGameStep("self-introduction");
  };

  return (
      <div className="w-[95%] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] relative flex flex-col items-center">
        <div className="flex-col flex items-center justify-center relative text-[#96A5FE] mt-4">
          <div className="text-[22px]">게임 설명</div>
          <WaitingRoomGameTurns sectionNumber={3} />
        </div>
        <div className="absolute bottom-3 right-5">
          <BasicBtn btnText={btnText} onClick={handleNextStep} />
        </div>
      </div>
  );
};

export default WaitingRoom;
