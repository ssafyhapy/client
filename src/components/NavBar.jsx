import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Main/Login";
import useAuthStore from "../store/useAuthStore";
import { axiosInstance } from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  // 로그인 모달 상태 추가
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const { isLogin, logout, setLoginAlert } = useAuthStore();

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

      // 메인 페이지로 이동
      navigate("/play");
      setLoginAlert();
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <>
      <nav className="flex flex-col items-center w-full">
        <ul className="flex justify-between w-[90%]">
          <div className="flex gap-8">
            <li className="text-[#4D98F7]">
              <Link to="/">Home</Link>
            </li>
            <li className="text-[#4D98F7]">
              <Link to="/play">Play</Link>
            </li>
            <li className="text-[#4D98F7]"></li>
          </div>
          {/*  로그인 상태에 따라 메뉴 변경 */}
          <div className="flex gap-8">
            {isLogin ? (
              <>
                <li className="text-[#4D98F7]">
                  <Link to="/mypage">Mypage</Link>
                  {/* 마이페이지 동적라우팅 */}
                  {/* <Link to={`/mypage/${memberName}`}>Mypage</Link> */}
                </li>
                <li className="text-[#4D98F7]" onClick={handleLogout}>
                  <button>Logout</button>
                </li>
              </>
            ) : (
              <li className="text-[#4D98F7]" onClick={openLogin}>
                <button>Login</button>
              </li>
            )}
          </div>
        </ul>
        <div className="relative w-[90%] mb-5">
          <div className="border-b-2 border-solid border-white w-full"></div>
        </div>
      </nav>

      {/* 로그인 모달 */}
      {loginOpen && <Login closeLogin={closeLogin} />}
    </>
  );
};
export default NavBar;
