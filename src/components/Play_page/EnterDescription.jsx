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
    <p className="text-gray-400">함께 하기로 한 사람들이 있나요?</p>
    <p className="text-gray-400">
      알고 있는 접속코드를 입력해 방에 입장하세요.
    </p>
  </motion.div>
  );
};

export default EnterDescription;