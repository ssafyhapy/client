import React from "react";

const UserHistory = ({ memberHistoryList }) => {
  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl self-start">History</h1>
        <ul>
          {/* // 이력 리스트 출력 */}
          {memberHistoryList && memberHistoryList.length > 0 ? (
            memberHistoryList.map((history) => (
              <li key={history.memberHistoryId}>
                {/* //  날짜, 내용 출력 */}
                {history.memberHistoryDate} {history.memberHistoryContent}
              </li>
            ))
          ) : (
            <li>No content</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserHistory;