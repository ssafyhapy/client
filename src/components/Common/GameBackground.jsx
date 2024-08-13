import React from "react";
import ExitBtn from "../../components/Buttons/ExitBtn";
import useGameStore from "../../store/useGameStore";

const GameBackground = ({ children, session }) => {
  const gameStep = useGameStore((state) => state.gameStep);
  return (
    <div className="bg-custom-gradient-game w-full flex justify-center items-center min-h-[100vh]">
      <div className="w-[90vw] h-[98vh] bg-[rgba(255,255,255,0.3)] rounded-[40px] flex flex-col relative items-center justify-center ">
        {gameStep !== "photo-first" && gameStep !== "photo-last" ? <ExitBtn session={session}/> : null}
        {children}
      </div>
    </div>
  );
};

export default GameBackground;
