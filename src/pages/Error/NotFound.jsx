import React from "react";
import bgImage from "../../assets/bg/bgImage.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div
      className="flex flex-col justify-center items-center gap-10 h-screen w-full bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-[156px] text-[#9400d3b0]">Oops!</h1>
      <motion.button
        className="w-fit h-fit px-5 py-3 rounded-[30px] text-[#9400d3b0] text-[30px] bg-gradient-to-br from-[#FFFFFF] to-[rgba(30,144,255,0.3)] shadow-[0_4px_10px_rgba(66,72,81,0.5)]"
        animate={{ scale: [1, 1.05, 1] }} // 펄스 효과
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} // 반복 설정
      >
        <Link to="/">Back To Home</Link>
      </motion.button>
    </div>
  );
}

export default NotFound;
