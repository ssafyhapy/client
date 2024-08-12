import React, { useState } from "react";
import { useMypageStore } from "../../store/useMypageStore";
import Memory from "./Memory";

const MemoryBox = () => {
  const { memberMemoryboxList } = useMypageStore();

  // 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지에 보여줄 항목 수

  // 현재 페이지에 따라 보여줄 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = memberMemoryboxList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 수 계산
  const totalPages = Math.ceil(memberMemoryboxList.length / itemsPerPage);

  // 페이지 이동 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full h-auto bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col p-5 gap-5 relative">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl">추억 상자</h1>
      </div>
      <div className="flex gap-3">
      {/* 현재 페이지에 해당하는 Memory 컴포넌트를 출력 */}
      {currentItems.map((memorybox) => (
        <Memory key={memorybox.roomId} memorybox={memorybox} roomId={memorybox.roomId}/>
      ))}
      </div>
      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryBox;

  {/* {memberMemoryboxList?.map((memorybox) => (
    <Memory key={memorybox.roomId} memorybox={memorybox} />
  ))} */}
  {/* {memberMemoryboxList && 
    memberMemoryboxList.map((memorybox) => (
      <Memory key={memorybox.roomId} memorybox={memorybox} />
  ))} */}