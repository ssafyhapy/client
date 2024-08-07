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
    <div className="relative">
      <div className="flex-col flex items-center justify-center relative text-[#96A5FE]">
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
