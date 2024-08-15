import React from "react";
import { EditIcon } from "./EditIcon";
import { PublicIcon } from "./PublicIcon";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ isEditMode, handleEditMode, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full mb-2">
      <div className="flex-1 flex justify-start">
        <FaArrowLeft
          className="h-6 w-6 text-[#9400d3b0] cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="flex-1 flex justify-center">
        <h1 className="text-4xl text-[#9400d3b0] text-center font-bold">My Page</h1>
      </div>
      <div className="flex justify-end items-center gap-5 flex-1">
        {isEditMode ? (
          <motion.button
            onClick={onSubmit}
            className="px-4 py-2 bg-gradient-to-br from-[#FFFFFF] to-[rgba(30,144,255,0.3)] shadow-[0_4px_10px_rgba(66,72,81,0.5)] text-[#9400d3b0] font-semibold rounded-lg"
            animate={{ scale: [1, 1.05, 1] }} // 펄스 효과
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }} // 반복 설정
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
