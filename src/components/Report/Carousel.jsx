import React from "react";
import LeftBtn from "./LeftBtn";
import RightBtn from "./RightBtn";
import IntroSlide from "./IntroSlider";
import OxSlide from "./OxSlide";
import BalanceSlide from "./BalanceSlide";

const Carousel = ({ slides, type }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  // 슬라이드 없을 때 처리
  if (!slides || slides.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p>No contents...</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  const renderSlideContent = () => {
    switch (type) {
      case "intro":
        return <IntroSlide slide={currentSlide} />;
      case "ox":
        return <OxSlide slide={currentSlide} />;
      case "balance":
        return <BalanceSlide slide={currentSlide} />;
      default:
        return <p>No content available</p>;
    }
  };

  return (
    <div className="flex justify-between w-full h-full items-center">
      {/* Left Button */}
      <LeftBtn onClick={prevSlide} />

      {/* Slide Content */}
      <div className="flex-grow mx-4 flex flex-col justify-center items-center">
        {renderSlideContent()}
      </div>

      {/* Right Button */}
      <RightBtn onClick={nextSlide} />
    </div>
  );
};

export default Carousel;
