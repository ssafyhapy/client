import React from "react";
import MainGradientBackground from "../../components/Common/MainGradientBackground";
import MainHomeFrame from "../../components/Main_page/MainHomeFrame";
import Home2 from "./Home2";
import MainGradientBackground2 from "../../components/Common/MainGradientBackgound2";
import MainDescription from "../../components/Main_page/MainDescription";

const Home = () => {

  return (
    <>
      <MainGradientBackground>
        <MainHomeFrame>
          {/* 메인페이지 설명 */}
          <MainDescription />
        </MainHomeFrame>
      </MainGradientBackground>
      <MainGradientBackground2>
        <MainHomeFrame>
          {/* 하단 페이지 */}
          <Home2 />
        </MainHomeFrame>
      </MainGradientBackground2>
    </>
  );
};

export default Home;
