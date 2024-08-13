import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import MainFrame from "../../MainFrame";
import ScrollDownBtn from "../ScrollDownBtn";
import RotateDescription from "../RotateDescription";

const WholeService = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const slides = [
    "어떤 목적으로 모인 그룹이든",
    "첫 만남이 어색하지 않도록",
    "다양한 게임으로",
    "서로 알아가는 시간을 가지는",
    "온라인 아이스 브레이킹 서비스",
    "사르르의 게임들을",
    "하나 하나 따라가는 것만으로도",
    "서로를 더 잘 이해하게 될 거예요.",
  ];

  return (
    <MainFrame>
      <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
        <NavBar />
        <div className=" w-full h-full flex flex-col justify-between items-center gap-20">
            <div/>
            <p className="opacity-50 text-[84px] font-semibold whitespace-nowrap">
              {slides[currentIndex]}
            </p>

            <div className="flex gap-10 items-center">
              <button
                onClick={prevSlide}
                className="px-2 py-1 bg-[#9400d354] rounded"
              >
                prev
              </button>
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`block w-2 h-2 rounded-full cursor-pointer ${
                      index === currentIndex
                        ? "bg-[#9400d3b0]"
                        : "bg-[#9400d354]"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="px-2 py-1 bg-[#9400d354] rounded"
              >
                next
              </button>
            </div>

        </div>
        <div className="flex justify-between w-full">
          <div className="w-[33%]"></div>
          {/* <ScrollDownBtn text="사르르 서비스 확인하기" color="#000000" /> */}
          <div className="w-[33%] flex justify-end">
            <PlayBtn />
          </div>
        </div>
      </div>
    </MainFrame>
  );
};

export default WholeService;
