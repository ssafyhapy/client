import React, { useEffect, useState } from "react";
import { useMypageStore } from "../../store/useMypageStore";
import Memory from "./Memory";
import { useLocation, useNavigate } from "react-router-dom";

const MemoryBox = () => {
  const { memberMemoryboxList } = useMypageStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page"), 10) || 1;
    setCurrentPage(page);
  }, [location.search]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      navigate(`?page=${pageNumber}`, { replace: true });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = memberMemoryboxList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(memberMemoryboxList.length / itemsPerPage);

  return (
    <div className="w-full h-auto bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col p-5 gap-5 relative">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl">추억 상자</h1>
      </div>
      <div className="flex justify-evenly">
        {currentItems.map((memorybox) => (
          <Memory key={memorybox.roomId} memorybox={memorybox} roomId={memorybox.roomId} />
        ))}
      </div>
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