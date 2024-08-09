import React from "react";
import { motion } from "framer-motion";

const EnterDescription = () => {
  return (
    <motion.div
      animate={{ opacity: [1, 0, 1] }} // opacity를 변경하여 깜빡이는 효과
      transition={{
        duration: 3, // 깜빡이는 속도
        repeat: Infinity, // 무한 반복
        repeatType: "reverse", // 반복 시 역방향으로 실행
      }}
    >
      <p className="text-gray-400">사람들을 초대하고 싶나요?</p>
      <p className="text-gray-400">방을 만들어 보세요.</p>
    </motion.div>
  );
};

export default EnterDescription;
