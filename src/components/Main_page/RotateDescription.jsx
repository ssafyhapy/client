import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RotateDescription = ({ sentences, fontsize="64px", time=2000 }) => {
  const [index, setIndex] = useState(0);
  // const sentences = [
  //   "오프라인에서의 어색한 첫 만남, 걱정되지는 않으신가요?",
  //   "오프라인에서 처음 만나 대화를 나누고 서로에 대해 알아가고",
  //   "친밀도를 올리기에는 시간도 체력도 부족한 당신을 위해",
  // ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, time); // (time)초마다 문장 변경
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{fontSize: fontsize}}
          className="font-bold text-center text-[rgba(0,0,0,0.5)] whitespace-nowrap"
        >
          {sentences[index]}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default RotateDescription;
