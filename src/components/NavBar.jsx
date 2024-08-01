import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../pages/Main/Login";
import useAuthStore from "../store/useAuthStore";

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;

  const [loginOpen, setLoginOpen] = useState(false);
  const openLogin = () => {
    setLoginOpen(true);
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };

  const {isLogin, logout} = useAuthStore();

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
            <div className="flex gap-8">
              {isLogin ? (
                <>
                  <li className="text-[#4D98F7]">
                    <Link to="/mypage">Mypage</Link>
                  </li>
                  <li className="text-[#4D98F7]">
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
        {loginOpen && <Login closeLogin={closeLogin} />}
      </>
    );
  }
};
export default NavBar;
