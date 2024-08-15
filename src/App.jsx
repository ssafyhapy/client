import React, { useEffect } from "react";
import { Routes, Route, } from "react-router-dom";

import Home from "./pages/Main/Home";
import Play from "./pages/Main/Play";
import Login from "./pages/Main/Login";
import MyPage from "./pages/Main/MyPage";
import Auth from "./pages/Main/Auth";
import Report from "./pages/Main/Report";
import MemberProfile from "./pages/Main/MemberProfile";

import NotFound from "./pages/Error/NotFound";

// 나를 맞춰봐 페이지들
import GuessMe from "./components/Guess_me/GuessMe";

// 로그인 알람 모달
import useAuthStore from "./store/useAuthStore";
import LoginAlert from "./pages/Main/LoginAlert";
import Games from "./pages/Games/Games";

function App() {
  const { message, isLoginAlert, setLoginAlert } = useAuthStore();
  console.log("[*] 배포 2");

  useEffect(() => {
    if (isLoginAlert) {
      // 3초 후 로그인 알람 모달 닫기
      const timer = setTimeout(() => {
        setLoginAlert();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoginAlert]);
  return (
    <>
      {isLoginAlert && <LoginAlert message={message} setLoginAlert={setLoginAlert}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/member/:memberId" element={<MemberProfile />} />
        <Route path="/login/oauth2/code/*" element={<Auth />} />
        <Route path="room/:roomId/report" element={<Report />} />
        {/* 잘못된 경로로 접근 시 NotFound 페이지 */}
        <Route path="*" element={<NotFound />} />

        <Route path="/guessme" element={<GuessMe />} />

        {/* 게임 합친 페이지 */}
        <Route path="/games" element={<Games />} />
      </Routes>
    </>
  );
}

export default App;
