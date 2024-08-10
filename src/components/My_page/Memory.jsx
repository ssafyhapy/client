import React from "react";
import defaultImage from "../../assets/My_page/defaultImage.svg";

const Memory = ({ memorybox }) => {
  return (
    <div className="w-[240px] h-[350px] bg-white flex flex-col justify-between items-center">
      <img
        className="w-[200px] h-[300px]"
        src={memorybox.memberMemoryImageUrl || { defaultImage }}
        alt={memorybox.memberMemoryBoxName || "방 제목 "}
      />
      <div>
        <p className="text-left">{memorybox.memberMemoryBoxDate}</p>
        <p className="text-right">{memorybox.memberMemoryBoxName}</p>
      </div>
    </div>
  );
};
export default Memory;
