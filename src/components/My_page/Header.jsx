import React from "react";
import { EditIcon } from "./EditIcon";
import { PublicIcon } from "./PublicIcon";
import { motion } from "framer-motion";

const Header = ({ isEditMode, handleEditMode, onSubmit }) => {
  return (
    <div className="flex justify-between w-full mb-2">
      <div className="w-[33%]"></div>
      <div className="w-[33%">
        <h1 className="text-4xl text-[#9400d3b0]">My Page</h1>
      </div>
      <div className="flex justify-end items-center gap-5 w-[33%]">
        {isEditMode ? (
          <motion.button
            onClick={onSubmit}
            className="px-4 py-2 bg-gradient-to-br from-[#FFFFFF] to-[rgba(30,144,255,0.3)] shadow-[0_4px_10px_rgba(66,72,81,0.5)] text-[#9400d3b0] font-semibold rounded-lg"
            animate={{ scale: [1, 1.05, 1] }} // 펄스 효과
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} // 반복 설정
          >
            수정 완료
          </motion.button>
        ) : (
          <EditIcon onClick={handleEditMode} />
        )}
        <PublicIcon />
      </div>
    </div>
  );
};
export default Header;
