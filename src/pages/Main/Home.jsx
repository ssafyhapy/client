import React from "react";
import MainHomeFrame from "../../components/Main_page/MainHomeFrame";
import MainDescription from "../../components/Main_page/MainDescription";
import bgImage from "../../assets/bg/bgImage5.jpg";
import FirstService from "../../components/Main_page/service/FirstService";
import SecondService from "../../components/Main_page/service/SecondService";
import ThirdService from "../../components/Main_page/service/ThirdService";
import LastService from "../../components/Main_page/service/LastService";
import SelfIntroduction from "../../components/Main_page/games/SelfIntroduction";
import GuessMe from "../../components/Main_page/games/GuessMe";
import BalanceGame from "../../components/Main_page/games/BalanceGame";
import GamesDescription from "../../components/Main_page/GamesDescription";

const Home = () => {
  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-fixed bg-cover bg-center scrollbar-hide"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainDescription />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <FirstService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <SecondService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <ThirdService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <LastService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <SelfIntroduction />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <GuessMe />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <BalanceGame />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <GamesDescription />
      </div>
    </div>
  );
};

export default Home;
