import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;
  if (path === "/") {
    return (
      <nav>
        <ul className="flex">
          <li>
            <Link to="/">홈 | </Link>
          </li>
          <li>
            <Link to="/play">플레이 | </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul className="flex">
          <li>
            <Link to="/">홈 | </Link>
          </li>
          <li>
            <Link to="/play">플레이 | </Link>
          </li>
          <li>
            <Link to="/login">로그인 | </Link>
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
        </ul>
      </nav>
    );
  }
};
export default NavBar;
