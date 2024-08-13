import React from "react";
import defaultImage from "../../assets/My_page/defaultImg.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Memory = ({ memorybox, roomId }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/room/${roomId}/report`);
  };
  return (
    <motion.div
      className="w-[240px] h-[350px] bg-white flex flex-col justify-between items-center p-4 gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        onClick={handleClick}
        className="w-[200px] h-[300px] cursor-pointer"
        src={memorybox.memberMemoryImageUrl || defaultImage}
        alt={memorybox.memberMemoryBoxName || "방 제목"}
      />
      <div className="w-full">
        <p className="text-left">{memorybox.memberMemoryBoxDate}</p>
        <p className="text-right">{memorybox.memberMemoryBoxName}</p>
      </div>
    </motion.div>
  );
};
export default Memory;
