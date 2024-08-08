import React from "react";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MainHomeFrame from "../../components/Main_page/MainHomeFrame";
import Home2 from "./Home2";
import MainGradientBackground2 from "../../components/Common/MainGradientBackgound2";
import MainDescription from "../../components/Main_page/MainDescription";
import bgImage from "../../assets/bg/bgImage5.jpg";
import FirstService from "../../components/Main_page/service/FirstService";
import SecondService from "../../components/Main_page/service/SecondService";
import ThirdService from "../../components/Main_page/service/ThirdService";
import LastService from "../../components/Main_page/service/LastService";
import SelfIntroduction from "../../components/Main_page/SelfIntroduction";
import GuessMe from "../../components/Main_page/GuessMe";
import BalanceGame from "../../components/Main_page/BalanceGame";

const Home = () => {
  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-fixed bg-cover bg-center scrollbar-hide"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <MainDescription />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <FirstService />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <SecondService />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <ThirdService />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <LastService />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <SelfIntroduction />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <GuessMe />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
          <BalanceGame />
        </MainHomeFrame>
      </div>
    </div>
  );
};

export default Home;
