import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PlayBtn = () => {
  return (
    <motion.button
      animate={{ scale: [1, 1.05, 1] }} // 펄스 효과
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} // 반복 설정
      className="w-[150px] h-[50px] rounded-[30px] text-[#458EF7] text-[20px] bg-gradient-to-br from-[#FFFFFF] to-[rgba(30,144,255,0.3)] shadow-[0_4px_10px_rgba(66,72,81,0.5)]"
    >
      <Link to="/play">PLAY NOW</Link>
    </motion.button>
  );
};

export default PlayBtn;