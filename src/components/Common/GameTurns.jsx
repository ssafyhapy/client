import React from "react";
import checkedCircle from "../../assets/Game_turns/checked.png";
import circle from "../../assets/Game_turns/circle.png";
import arrow from "../../assets/Game_turns/arrow.png";

const GameTurns = ({gameStep}) => {
  console.log("[*]gamestep",gameStep);
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
              gameStep === "balance-game"||
              gameStep === "wrap-up"||
              gameStep === "photo-first"
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
              gameStep !== "balance-game" &&
              gameStep !== "wrap-up" &&
              gameStep !== "photo-first"
                ? null
                : "hidden"
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
              gameStep === "guess-me" || gameStep === "balance-game"||gameStep === "wrap-up"
                ? null
                : "hidden"
            }`}
          />
          <img
            src={circle}
            alt=""
            className={`${
              (gameStep !== "guess-me") & (gameStep !== "balance-game") &(gameStep !== "wrap-up")
                ? null
                : "hidden"
            }`}
          />
          <div>나를 맞춰봐</div>
        </div>
        <img src={arrow} alt="" />
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={checkedCircle}
            alt=""
            className={`${gameStep === "balance-game" ||gameStep === "wrap-up" ? null : "hidden"}`}
          />
          <img
            src={circle}
            alt=""
            className={`${gameStep !== "balance-game" && gameStep !== "wrap-up"? null : "hidden"}`}
          />
          <div>밸런스 게임</div>
        </div>
      </div>
    </>
  );
};

export default GameTurns;
