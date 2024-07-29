import React from "react";
import GameBackground from "../components/GameBackgound";
import GameDescriptionFrame from "./../components/GameDescriptionFrame";

const WaitingRoom = () => {
  return (
    <GameBackground>
      <div className="flex justify-center items-center">

        <div className="bg-white flex justify-center items-center flex-col">
          <div>화상 화면</div>
          <div>마이크, 가면 선택</div>
        </div>

        <GameDescriptionFrame></GameDescriptionFrame>
        
      </div>
    </GameBackground>
  );
};

export default WaitingRoom;
