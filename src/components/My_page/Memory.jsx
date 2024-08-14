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
      className="w-[240px] h-[350px] bg-white flex flex-col justify-between items-center p-4 gap-2 shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        className="w-[200px] h-[260px] bg-white flex justify-center items-center"
        style={{
          padding: "10px",
          // border: "1px solid #ccc", // 흰색 테두리
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // 그림자 추가
        }}
      >
        <img
          onClick={handleClick}
          className="cursor-pointer"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
          src={memorybox.memberMemoryImageUrl || defaultImage}
          alt={memorybox.memberMemoryBoxName || "방 제목"}
        />
      </div>
      <div className="w-full">
        <p className="text-left">{memorybox.memberMemoryBoxDate}</p>
        <p className="text-right">{memorybox.memberMemoryBoxName}</p>
      </div>
    </motion.div>
  );
};
export default Memory;
