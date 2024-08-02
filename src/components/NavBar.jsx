import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../pages/Main/Login";
import useAuthStore from "../store/useAuthStore";
import { axiosInstance } from "../api/apiClient";

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;

  // 로그인 모달 상태 추가
  const [loginOpen, setLoginOpen] = useState(false);
  // 로그아웃 메시지 상태 추가
  const [logoutMessage, setLogoutMessage] = useState("");

  const openLogin = () => {
    setLoginOpen(true);
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const { isLogin, logout, memberName } = useAuthStore();

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await axiosInstance.post("/member/logout", null, {
        withCredentials: true,
      });

      // 세션 스토리지에서 액세스 토큰 삭제
      sessionStorage.removeItem("accessToken");

      // 로그아웃 상태 업데이트
      logout();

      // 로그아웃 메시지 설정
      setLogoutMessage("로그아웃 되었습니다.");

      // 3초 후 로그아웃 메시지 숨김
      setTimeout(() => {
        setLogoutMessage("");
      }, 3000);

    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  // zustand store 변경 시 로그인 상태 확인
  useEffect(() => {
    console.log("zustand", memberName, isLogin);
  }, [memberName, isLogin]);

  // navBar의 path에 따라 다른 메뉴 출력(메인)
  if (path === "/") {
    return (
      <nav className="flex flex-col items-center">
        <ul className="flex gap-8 w-[90%]">
          <li className="text-[#4D98F7]">
            <Link to="/">Home</Link>
          </li>
          <li className="text-[#4D98F7]">
            <Link to="/play">Play</Link>
          </li>
        </ul>
        <div className="relative w-[90%] mb-5">
          <div className="border-b-2 border-solid border-white w-full"></div>
        </div>
      </nav>
    );

  // navBar의 path에 따라 다른 메뉴 출력(메인 외)
  } else {
    return (
      <>
        <nav className="flex flex-col items-center">
          <ul className="flex justify-between w-[90%]">
            <div className="flex gap-8">
              <li className="text-[#4D98F7]">
                <Link to="/">Home</Link>
              </li>
              <li className="text-[#4D98F7]">
                <Link to="/play">Play</Link>
              </li>
            </div>
            {/*  로그인 상태에 따라 메뉴 변경 */}
            <div className="flex gap-8">
              {isLogin ? (
                <>
                  <li className="text-[#4D98F7]">
                    <Link to="/mypage">Mypage</Link>
                  </li>
                  <li className="text-[#4D98F7]" onClick={handleLogout}>
                    <button>Logout</button>
                  </li>
                </>
              ) : (
                <li className="text-[#4D98F7]" onClick={openLogin}>
                  {/* <Link to="/login">Login</Link> */}
                  {/* 페이지 변경 막기 위해서 버튼으로! */}
                  <button>Login</button>
                </li>
              )}
            </div>
          </ul>
          <div className="relative w-[90%] mb-5">
            <div className="border-b-2 border-solid border-white w-full"></div>
          </div>
        </nav>

        {/* 로그아웃 메시지 출력 */}
        {logoutMessage && (
          <div className="fixed top-1/2 left-1/2 bg-custom-gradient-main text-white p-2 rounded">
            {logoutMessage}
          </div>
        )}

        {/* 로그인 모달 */}
        {loginOpen && <Login closeLogin={closeLogin} />}
      </>
    );
  }
};
export default NavBar;
