import React from "react";
import VideochatButton from "./VideochatButton";

const GameGradientBackground = () => {
  return (
    <div className="relative w-full h-screen bg-custom-gradient-game overflow-hidden z-0">
        <VideochatButton />
    </div>
  );
};

export default GameGradientBackground;
