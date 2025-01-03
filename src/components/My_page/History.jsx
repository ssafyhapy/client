import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useMypageStore } from "../../store/useMypageStore";

const History = ({ isEditMode }) => {
  const { memberHistoryList } = useMypageStore();
  const { register, watch, control, setValue } = useFormContext();
  // useFieldArray 훅을 사용하여 필드 배열 다루기
  const { fields, append, remove } = useFieldArray({
    // 필드 배열 이름 설정
    control,
    name: "memberHistoryList",
  });

  // 삭제된 이력 리스트
  const deletedHistoryList = watch("deletedHistoryList");

  // 이력 삭제 핸들러
  const handleDelete = (index, id) => {
    if (id !== -1) {
      // 삭제된 이력 리스트에 추가
      setValue("deletedHistoryList", [...deletedHistoryList, id]);
    }
    // 필드 배열에서 삭제
    remove(index);
  };

  useEffect(() => {
    // 수정 모드일 때
    if (isEditMode) {
      // 폼 데이터 초기화
      setValue("memberHistoryList", memberHistoryList);
      setValue("deletedHistoryList", []);
    }
  }, [isEditMode, memberHistoryList, setValue]);

  return (
    <div className="w-full h-full bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5">
      <div className="w-full flex flex-col justify-center items-start gap-5">
        <h1 className="text-3xl text-[#9400d3b0]">Experience</h1>
        {isEditMode ? (
          <>
            {/* 필드 배열을 순회하며 이력 입력 폼 생성 */}
            {fields.map((item, index) => (
              <div key={item.id} className="history-item">
                {/* // 이력 아이디를 hidden으로 설정 */}
                <input
                  {...register(`memberHistoryList.${index}.memberHistoryId`)}
                  type="hidden"
                />
                {/* // 날짜, 내용 입력 폼 */}
                <div className="flex gap-2">
                  <input
                    {...register(
                      `memberHistoryList.${index}.memberHistoryDate`
                    )}
                    type="date"
                    placeholder="날짜"
                  />
                  <input
                    {...register(
                      `memberHistoryList.${index}.memberHistoryContent`
                    )}
                    placeholder="내용"
                  />
                  {/* // 삭제 버튼 */}
                  <button
                    type="button"
                    className="text-[#C2ACF4]"
                    onClick={() => handleDelete(index, item.memberHistoryId)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
            {/* // 이력 추가 버튼 */}
            {fields.length < 5 && (
              <button
                type="button"
                className="text-[#9400d3b0]"
                onClick={() =>
                  // 필드 배열에 새로운 이력 추가
                  append({
                    memberHistoryId: -1,
                    memberHistoryDate: "",
                    memberHistoryContent: "",
                  })
                }
              >
                이력 추가
              </button>
            )}
          </>
        ) : (
          <ul className="flex flex-col gap-2">
            {/* // 이력 리스트 출력 */}
            {(memberHistoryList || []).map((history) => (
              <li key={history.memberHistoryId} className="text-2xl flex flex-row gap-5 whitespace-nowrap">
                {/* //  날짜, 내용 출력 */}
                <p>{history.memberHistoryDate}</p>
                <p>{history.memberHistoryContent}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
