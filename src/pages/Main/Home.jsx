import React from "react";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MainHomeFrame from "../../components/Main_page/MainHomeFrame";
import Home2 from "./Home2";
import MainGradientBackground2 from "../../components/Common/MainGradientBackgound2";
import MainDescription from "../../components/Main_page/MainDescription";
import bgImage from "../../assets/bg/bgImage5.jpg";
import SecondDescription from "../../components/Main_page/SecondDescription";

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
          <SecondDescription />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
        <Home2 />
        </MainHomeFrame>
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MainHomeFrame>
        </MainHomeFrame>
      </div>
    </div>
  );
};

export default Home;
