import React from "react";
import NavBar from "../components/NavBar";
import MainGradientBackground from "../components/MainGradientBackground";
import MainHomeFrame from "../components/MainHomeFrame";

const Play = () => {
  return (
    <>
      <MainGradientBackground>
        <MainHomeFrame>
          <div className="flex flex-col items-center">
            <div className="w-[800px]">
              <NavBar />
            </div>
            <div className="w-[400px] h-[500px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] rounded-[30px] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col justify-between items-center p-5"></div>
          </div>
        </MainHomeFrame>
      </MainGradientBackground>
    </>
  );
};

export default Play;
