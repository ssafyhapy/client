import React from "react";
import NavBar from "../components/NavBar";
import MainGradientBackground from "../components/MainGradientBackground";
import MyPageFrame from "../components/MyPageFrame";

const MyPage = () => {
  return (
    <>
      <MainGradientBackground>
        <MyPageFrame>
          <div className="flex flex-col items-center gap-5">
            <div className="w-[800px]">
              <NavBar />
            </div>
            <div className="flex gap-5">
              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)]"></div>
              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)]"></div>
            </div>
            <div className="flex gap-5">
              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)]"></div>
              <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)]"></div>
            </div>
            <div className="flex">
              <div className="w-[820px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)]"></div>
            </div>
          </div>
        </MyPageFrame>
      </MainGradientBackground>
    </>
  );
};

export default MyPage;
