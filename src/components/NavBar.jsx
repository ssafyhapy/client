import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;

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
      <nav className="flex flex-col items-center">
      <ul className="flex gap-8 w-[90%]">
        <li className="text-[#4D98F7]">
          <Link to="/">Home</Link>
        </li>
        <li className="text-[#4D98F7]">
          <Link to="/play">Play</Link>
        </li>
        <li className="text-[#4D98F7]">
          <Link to="/login">Login</Link>
        </li>
        <li className="text-[#4D98F7]">
          <Link to="/mypage">Mypage</Link>
        </li>
      </ul>
      <div className="relative w-[90%] mb-5">
        <div className="border-b-2 border-solid border-white w-full"></div>
      </div>
    </nav>
    );
  }
};
export default NavBar;
