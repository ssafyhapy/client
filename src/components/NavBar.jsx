import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Play from "../pages/Play";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";

const NavBar = () => {
  return(
    <Router>
    <div>
    <nav>
      <ul className="flex" >
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
    <hr/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  </Router>
  )
}
export default NavBar;