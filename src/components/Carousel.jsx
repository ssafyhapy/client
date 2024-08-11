import React from "react";
import LeftBtn from "./Report/LeftBtn";
import RightBtn from "./Report/RightBtn";

const Carousel = ({ slides, type }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };
  
  const currentSlide = slides[currentIndex];

  // 슬라이드 없을 때 처리
  if (!slides || slides.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p>No contents...</p>
      </div>
    );
  }


  return (
    <div className="flex justify-between w-full h-full items-center">
      {/* Left Button */}
      <LeftBtn onClick={prevSlide} />

      {/* Slide Content */}
      <div className="flex-grow mx-4">
        <div className="flex flex-col justify-center items-center">
          {type === "intro" && (
            <div>
              <p>Member Name: {currentSlide.memberName}</p>
              <p>Content: {currentSlide.content}</p>
            </div>
          )}

          {type === "ox" && (
            <div>
              <p>Member Name: {currentSlide.memberName}</p>
              {currentSlide.oxResponseDtos.map((response, index) => (
                <div key={index}>
                  <p>{response.content}</p>
                  <p>Answer: {response.answer ? "True" : "False"}</p>
                </div>
              ))}
            </div>
          )}

          {type === "balance" && (
            <div>
              <p>Option 1: {currentSlide.balanceQuestionOptionFirst}</p>
              <p>Option 2: {currentSlide.balanceQuestionOptionSecond}</p>
              {currentSlide.balanceResultResponseDtos.map((response, index) => (
                <p key={index}>
                  {response.memberName} chose{" "}
                  {response.balanceResultSelectedOption}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Button */}
      <RightBtn onClick={nextSlide} />
    </div>
  );
};

export default Carousel;
