import React from "react";

const MakeRoom = ({ closeMakeRoom }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeMakeRoom}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-50">
        <h2 className="text-2xl mb-4">방 만들기</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">방 제목</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded"
              placeholder="방 제목을 입력해주세요"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">인원 수</label>
            <input
              type="number"
              className="w-full mt-2 p-2 border rounded"
              defaultValue={2}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              방 만들기
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded ml-2"
              onClick={closeMakeRoom}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeRoom;
