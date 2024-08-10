import React from "react";
import { useMypageStore } from "../../store/useMypageStore";
import Memory from "./Memory";

const MemoryBox = () => {
  const { memberMemoryboxList } = useMypageStore();
  return (
    <div className="w-full h-auto bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col p-5 gap-5 relative">
      <h1 className="text-2xl">추억 상자</h1>
      {/* // Memory 컴포넌트를 사용하여 memberMemoryboxList를 순회하며 출력 */}
      <div className="flex gap-4 overflow-x-auto flex-nowrap">
        {memberMemoryboxList?.map((memorybox) => (
          <Memory key={memorybox.roomId} memorybox={memorybox} />
        ))}
      </div>
    </div>
  );
};
export default MemoryBox;
