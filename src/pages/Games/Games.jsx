import React from "react";
import CamCheck from "./../../components/Camera_check/CamCheck";
import WaitingRoom from "./../../components/Waiting_room/WaitingRoom";
import SelfIntroduction from "./../../components/Self_introduction/SelfIntroduction"
import BalanceGame from "./../../components/Balance_game/BalanceGame";
import WrapUp from "./../../components/Wrap_up/WrapUp";
import PhotographFirst from "./../../components/Photo/PhotographFirst";
import PhotographLast from "./../../components/Photo/PhotographLast";
import useGameStore from "./../../store/useGameStore";
import GuessMe from "./../../components/Guess_me/GuessMe"

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
      {gameStep === "guess-me" && <GuessMe />}
      {gameStep === "photo-first" && <PhotographFirst />}
      {gameStep === "photo-last" && <PhotographLast />}
    </>
  );
};

export default Games;
