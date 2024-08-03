import React from "react";

const History = ({ memberHistoryList }) => {
  return (
    <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
      <div className="flex flex-col justify-center gap-2">
        <h1 className="text-2xl">History</h1>
        <ul>
          {memberHistoryList?.memberHistoryList.map((history) => (
            <li key={history.memberHistoryId}>
              {history.memberHistoryDate} {history.memberHistoryContent}
            </li>
          ))}
        </ul>
        {/* {isEditMode ? (
          <textarea
            {...register("memberHistory")}
            defaultValue={memberHistoryList}
            className="bg-blue-100 border-2 border-blue-500 shadow-md p-4 rounded-lg resize-y min-h-[120px] text-lg w-[360px]"
          />
        ) : (
          <ul>
          {memberHistoryList?.memberHistoryList.map((history) => (
            <li key={history.memberHistoryId}>
              {history.memberHistoryDate} {history.memberHistoryContent}
            </li>
          ))}
        </ul>
        )} */}

      </div>
    </div>
  );
};
export default History;
