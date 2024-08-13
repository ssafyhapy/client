import React, { useState, useEffect, useRef } from "react";
import MainDescription from "../../components/Main_page/MainDescription";
import bgImage from "../../assets/bg/bgImage.jpg";
import WholeService from "../../components/Main_page/service/WholeService";
import PhotoService from "../../components/Main_page/service/PhotoService";
import ReportService from "../../components/Main_page/service/ReportService";
import MaskService from "../../components/Main_page/service/MaskService";
import GamesDescription from "../../components/Main_page/GamesDescription";
import MainFrame from "../../components/MainFrame";

const Home = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const containerRef = useRef(null);
  const sections = [
    { name: 'main-description', component: MainDescription },
    { name: 'whole-service', component: WholeService },
    { name: 'mask-service', component: MaskService },
    { name: 'photo-service', component: PhotoService },
    { name: 'report-service', component: ReportService },
    { name: 'games-description', component: GamesDescription },
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        setCurrentSectionIndex(prevIndex => prevIndex + 1);
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        setCurrentSectionIndex(prevIndex => prevIndex - 1);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentSectionIndex, sections.length]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-fixed bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <MainFrame>
          <div className="w-full h-full flex flex-col justify-center items-center p-6">
            {React.createElement(sections[currentSectionIndex].component)}
          </div>
        </MainFrame>
      </div>
    </div>
  );
};

export default Home;