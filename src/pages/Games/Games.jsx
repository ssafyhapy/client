import React from "react";
import CamCheck from "./../../components/Camera_check/CamCheck";
import WaitingRoom from "./../../components/Waiting_room/WaitingRoom";
import SelfIntroduction from "./../../components/Self_introduction/SelfIntroduction";
import BalanceGame from "./../../components/Balance_game/BalanceGame";
import WrapUp from "./../../components/Wrap_up/WrapUp";
import useGameStore from "../../store/useGameStore";

const Games = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  return (
    <>
      {gameStep === "camera-check" && <CamCheck />}
      {gameStep === "waiting-room" && <WaitingRoom />}
      {gameStep === "self-introduction" && <SelfIntroduction />}
      {gameStep === "balance-game" && <BalanceGame />}
      {gameStep === "wrap-up" && <WrapUp />}
    </>
  );
};

export default Games;
