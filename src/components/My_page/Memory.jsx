import React from "react";
import defaultImage from "../../assets/My_page/defaultImg.jpg";
import { Link } from "react-router-dom";

const Memory = ({ memorybox, roomId }) => {
  return (
    <Link to={`/room/${roomId}/report`} className="w-[240px] h-[350px] bg-white flex flex-col justify-between items-center p-4 gap-2">
      <img
        className="w-[200px] h-[300px]"
        src={memorybox.memberMemoryImageUrl || defaultImage}
        alt={memorybox.memberMemoryBoxName || "방 제목"}
      />
      <div className="w-full">
        <p className="text-left">{memorybox.memberMemoryBoxDate}</p>
        <p className="text-right">{memorybox.memberMemoryBoxName}</p>
      </div>
    </Link>
  );
};
export default Memory;
