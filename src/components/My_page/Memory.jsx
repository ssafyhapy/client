import React from "react";

const Memory = ({ memorybox }) => {
  return (
    <div className="flex flex-col">
      <img src={memorybox.memberMemoryImageUrl} alt={memorybox.memberMemoryBoxName || "추억 상자 이미지"} />
      <p>{memorybox.memberMemoryBoxName}</p>
    </div>
  );
};
export default Memory;
