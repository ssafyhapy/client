import React from "react";
import { useVisibilityStore } from "../../store/useMypageStore";
import { axiosInstance } from "../../api/apiClient";

export const PublicIcon = () => {
  const { isVisibility, setVisibility } = useVisibilityStore();

  const handlePublic = async () => {
    try {
      const response = await axiosInstance.put("/member/mypage/visibility", {
        visibility: "PUBLIC",
      });
      console.log("공개 설정 성공", response);
      setVisibility();
    } catch (error) {
      console.error("공개 설정 실패", error);
    }
  };
  const handlePrivate = async () => {
    try {
      const response = await axiosInstance.put("/member/mypage/visibility", {
        visibility: "PRIVATE",
      });
      console.log("비공개 설정 성공", response);
      setVisibility();
    } catch (error) {
      console.error("비공개 설정 실패", error);
    }
  };

  return (
    <div>
      {isVisibility ? (
        <div className="flex">
          <div
            onClick={handlePrivate} // 공개 상태일 때 비공개로 전환
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
            >
              <path
                d="M9.78949 12.8534H23.0082V9.88194C23.0082 8.64385 22.5799 7.59146 21.7231 6.7248C20.8663 5.85813 19.8259 5.4248 18.602 5.4248C17.378 5.4248 16.3377 5.85813 15.4809 6.7248C14.6241 7.59146 14.1957 8.64385 14.1957 9.88194H11.2582C11.2582 7.8267 11.9745 6.07505 13.407 4.62697C14.8395 3.17889 16.5712 2.45436 18.602 2.45337C20.6328 2.45238 22.3649 3.17691 23.7984 4.62697C25.2319 6.07703 25.9477 7.82868 25.9457 9.88194V12.8534H27.4145C28.2223 12.8534 28.9141 13.1446 29.4898 13.727C30.0656 14.3094 30.353 15.0086 30.352 15.8248V30.6819C30.352 31.4991 30.0646 32.1989 29.4898 32.7813C28.9151 33.3637 28.2233 33.6544 27.4145 33.6534H9.78949C8.98168 33.6534 8.29039 33.3627 7.71561 32.7813C7.14084 32.1998 6.85297 31.5001 6.85199 30.6819V15.8248C6.85199 15.0077 7.13986 14.3084 7.71561 13.727C8.29136 13.1456 8.98266 12.8544 9.78949 12.8534ZM9.78949 30.6819H27.4145V15.8248H9.78949V30.6819ZM18.602 26.2248C19.4098 26.2248 20.1016 25.9341 20.6773 25.3527C21.2531 24.7713 21.5405 24.0715 21.5395 23.2534C21.5385 22.4352 21.2511 21.736 20.6773 21.1555C20.1035 20.5751 19.4118 20.2839 18.602 20.2819C17.7922 20.28 17.1009 20.5712 16.5281 21.1555C15.9553 21.7399 15.6674 22.4392 15.6645 23.2534C15.6616 24.0675 15.9494 24.7673 16.5281 25.3527C17.1068 25.9381 17.7981 26.2288 18.602 26.2248Z"
                fill="black"
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div
          onClick={handlePublic} // 비공개 상태일 때 공개로 전환
          className="cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
              fill="black"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
