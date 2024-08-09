import React from "react";
import MainDescription from "../../components/Main_page/MainDescription";
import bgImage from "../../assets/bg/bgImage.jpg";
import WholeService from "../../components/Main_page/service/WholeService";
import PhotoService from "../../components/Main_page/service/PhotoService";
import ReportService from "../../components/Main_page/service/ReportService";
import MaskService from "../../components/Main_page/service/MaskService";
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
        <WholeService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <MaskService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <PhotoService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <ReportService />
      </div>
      <div className="w-full h-full snap-start flex justify-center items-center">
        <GamesDescription />
      </div>
    </div>
  );
};

export default Home;
