import React, { useState } from "react";
import { useMypageStore } from "../../store/useMypageStore";
import Memory from "./Memory";

const MemoryBox = () => {
  const { memberMemoryboxList } = useMypageStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지에 보여줄 아이템 수

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 해당하는 데이터만 필터링
  const paginatedMemoryboxList = memberMemoryboxList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 버튼 생성
  const pageCount = Math.ceil(memberMemoryboxList.length / itemsPerPage);
  const pageButtons = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="w-full h-auto bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col p-5 gap-5 relative">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl">추억 상자</h1>
      </div>
      <div className="flex justify-evenly flex-wrap gap-4">
        {paginatedMemoryboxList.map((memorybox) => (
          <Memory key={memorybox.roomId} memorybox={memorybox} roomId={memorybox.roomId} />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {pageButtons.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 ${currentPage === page ? 'bg-[#9400d3b0] text-white' : 'bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryBox;
