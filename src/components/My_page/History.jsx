import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const History = ({ memberHistoryList = [], isEditMode, onDelete }) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "memberHistoryList",
  });

  return (
    <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
      <div className="flex flex-col justify-center gap-2">
        <h1 className="text-2xl">History</h1>
        {isEditMode ? (
          <>
            {fields.map((item, index) => (
              <div key={item.id} className="history-item">
                <input
                  {...register(`memberHistoryList.${index}.memberHistoryId`)}
                  type="hidden"
                />
                <div className="flex gap-2">
                  <input
                    {...register(`memberHistoryList.${index}.memberHistoryDate`)}
                    type="date"
                    placeholder="날짜"
                  />
                  <input
                    {...register(`memberHistoryList.${index}.memberHistoryContent`)}
                    placeholder="내용"
                  />
                  <button type="button" onClick={() => remove(index)}>
                    삭제
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({
                  memberHistoryId: -1,
                  memberHistoryDate: "",
                  memberHistoryContent: "",
                })
              }
            >
              이력 추가
            </button>
          </>
        ) : (
          <ul>
            {(memberHistoryList || []).map((history) => (
              <li key={history.memberHistoryId}>
                {history.memberHistoryDate} {history.memberHistoryContent}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
