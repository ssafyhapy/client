import React from "react";
import checkedCircle from "../../assets/Game_turns/checked.png";
import circle from "../../assets/Game_turns/circle.png";
import arrow from "../../assets/Game_turns/arrow.png";
import useGameStore from "../../store/useGameStore";
const GameTurns = ({}) => {
  const { gameStep } = useGameStore();

  return (
    <>
      <div className="flex justify-around w-[555px] h-[54px]">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={checkedCircle}
            alt=""
            className={`${
              gameStep === "self-introduction" ||
              gameStep === "guess-me" ||
              gameStep === "balance-game"
                ? null
                : "hidden"
            }`}
          />
          <img
            src={circle}
            alt=""
            className={`${
              gameStep !== "self-introduction" &&
              gameStep !== "guess-me" &&
              gameStep !== "balance-game"
                ? "hidden"
                : null
            }`}
          />
          <div>한 줄 자기소개</div>
        </div>
        <img src={arrow} alt="" />
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={checkedCircle}
            alt=""
            className={`${
              gameStep === "self-introduction" || gameStep === "guess-me"
                ? null
                : "hidden"
            }`}
          />
          <img
            src={circle}
            alt=""
            className={`${
              (gameStep !== "self-introduction") & (gameStep !== "guess-me")
                ? "hidden"
                : null
            }`}
          />
          <div>나를 맞춰봐</div>
        </div>
        <img src={arrow} alt="" />
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={checkedCircle}
            alt=""
            className={`${gameStep === "balance-game" ? null : "hidden"}`}
          />
          <img
            src={circle}
            alt=""
            className={`${gameStep !== "balance-game" ? "hidden" : null}`}
          />
          <div>밸런스 게임</div>
        </div>
      </div>
    </>
  );
};

export default GameTurns;
