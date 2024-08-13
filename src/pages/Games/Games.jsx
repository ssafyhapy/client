import React from "react";
import { useState, useEffect } from "react";
import GameBackground from "../../components/Common/GameBackground";
import CamCheck from "./../../components/Camera_check/CamCheck";
import WaitingRoom from "./../../components/Waiting_room/WaitingRoom";
import SelfIntroduction from "./../../components/Self_introduction/SelfIntroduction";
import BalanceGame from "./../../components/Balance_game/BalanceGame";
import WrapUp from "./../../components/Wrap_up/WrapUp";
import PhotographFirst from "./../../components/Photo/PhotographFirst";
import PhotographLast from "./../../components/Photo/PhotographLast";
import useGameStore from "./../../store/useGameStore";
import GuessMe from "./../../components/Guess_me/GuessMe";
import TopDiv from "../../components/Common/TopDiv";
import MiddleDiv from "../../components/Common/MiddleDiv";
import BottomDiv from "../../components/Common/BottomDiv";
import { WebSocketProvider } from "../../WebSocketContext";
import useRoomStore from "../../store/useRoomStore";
import useOpenViduSession from "../../hooks/useOpenViduSession";

const Games = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  const { session } = useOpenViduSession();

  return (
    <WebSocketProvider>
      <GameBackground session={session}>
        {/* TopDiv */}
        {gameStep !== "camera-check" &&
        gameStep !== "photo-first" &&
        gameStep !== "photo-last" ? (
          <TopDiv gameStep={gameStep} setGameStep={setGameStep}></TopDiv>
        ) : null}

        {/* MiddleDiv */}
        {gameStep !== "camera-check" &&
        gameStep !== "photo-first" &&
        gameStep !== "photo-last" ? (
          <MiddleDiv></MiddleDiv>
        ) : null}

        {/* 자체 UI */}
        {gameStep === "camera-check" && <CamCheck />}
        {gameStep === "photo-first" && <PhotographFirst />}
        {gameStep === "photo-last" && <PhotographLast />}

        {/* BottomDiv - 게임 로직 */}
        {gameStep !== "camera-check" &&
        gameStep !== "photo-first" &&
        gameStep !== "photo-last" ? (
          <BottomDiv>
            {gameStep === "waiting-room" && <WaitingRoom />}
            {gameStep === "self-introduction" && <SelfIntroduction />}
            {gameStep === "guess-me" && <GuessMe />}
            {gameStep === "balance-game" && <BalanceGame />}
            {gameStep === "wrap-up" && <WrapUp />}
          </BottomDiv>
        ) : null}
      </GameBackground>
    </WebSocketProvider>
  );
};

export default Games;
