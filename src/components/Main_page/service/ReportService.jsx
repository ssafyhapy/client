import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import { motion } from "framer-motion";

const ThirdService = () => {
  const slides = [
    "게임이 모두 끝나면 오늘 한 플레이에",
    "대한 레포트를 받아보실 수 있어요.",
    "각자 했던 한줄 자기소개나 나를 맞춰봐",
    "문항들을 다시 확인할 수 있어요.",
  ];

  return (
    <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
      <NavBar />

      <div className="flex gap-12">
        <iframe src="https://lottie.host/embed/aab4cb28-19fa-4f9a-a135-7c9dd3051300/3AdT1jVKUW.json"></iframe>

        <div className="w-full flex flex-col items-start gap-4 opacity-50">
          {slides.map((slide, index) => (
            <motion.p
              key={index}
              className="text-[40px] font-semibold whitespace-nowrap"
              whileHover={{ scale: 1.1, color: "#9400d3b0", opacity: 1 }}
            >
              {slide}
            </motion.p>
          ))}
        </div>
      </div>
      <div className="self-end">
        <PlayBtn />
      </div>
    </div>
  );
};

export default ThirdService;
