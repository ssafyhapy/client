import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import { motion } from "framer-motion";

const LastService = () => {
  const slides = [
    "온라인에서의 첫 만남이",
    "조금 덜 어색하고, 조금 더 재미있도록!",
    "가면을 쓰고 게임을 하며",
    "알아가는 시간을 가져요.",
  ];

  return (
    <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
      <NavBar />
      <div className="flex gap-12">
        <iframe src="https://lottie.host/embed/c924990c-7e15-4888-948c-ab88b111c16a/9bCc8fUiES.json"></iframe>

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

export default LastService;
