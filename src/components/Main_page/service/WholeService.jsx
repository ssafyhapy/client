import React from "react";
import NavBar from "../../NavBar";
import PlayBtn from "../../Buttons/PlayBtn";
import { motion } from "framer-motion";

const WholeService = () => {
  const slides = [
    "어떤 목적으로 모인 그룹이든 첫 만남이 어색하지 않도록",
    "다양한 게임으로 서로 알아가는 시간을 가지는",
    "온라인 아이스 브레이킹 서비스",
    "사르르의 게임들을",
    "하나 하나 따라가는 것만으로도",
    "서로를 더 잘 이해하게 될 거예요.",
  ];

  return (
    <div className="flex flex-col w-[80%] h-[80%] justify-between items-center">
      <NavBar />
        <div className="flex">
          <div className="w-full flex flex-col items-start gap-4 opacity-50">
            {slides.map((slide, index) => (
              <motion.p
                key={index}
                className="text-[30px] font-semibold whitespace-nowrap"
                whileHover={{ scale: 1.1, color: "#9400d3b0", opacity: 1 }}
              >
                {slide}
              </motion.p>
            ))}
          </div>
          <iframe src="https://lottie.host/embed/e61d9aab-2ad6-4958-9b92-59f308e61607/fzeD0O9H5M.json"></iframe>
        </div>
        <div className="self-end">
          <PlayBtn />
        </div>
      </div>
  );
};

export default WholeService;
