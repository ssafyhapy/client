import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Play from "./pages/Play";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";
import Report from "./pages/Report";

// 게임 공통 페이지(기반)
import CommonGamePage from "./components/CommonGamePage";
import WaitingRoom from "./pages/WaitingRoom";
import CamCheck from "./pages/CamCheck";

// 한 줄 자기소개 페이지들
import SelfIntroduction from "./pages/SelfIntroduction";
import SelfIntroductionGetReady from "./pages/SelfIntroductionGetReady";
import SelfIntroductionAllPrepared from "./pages/SelfIntroductionAllPrepared";

// 나를 맞춰봐 페이지들
import GuessMeGetReady from "./pages/GuessMeGetReady";
import GuessMeAllPrepared from "./pages/GuessMeAllPrepared";
import GuessMe from "./pages/GuessMe";

// 밸런스 페이지들
import BalanceGetReady from "./pages/BalanceGetReady";
import BalanceChangeChoices from "./pages/BalanceChangeChoices";
import BalanceChoosing from "./pages/BalanceChoosing";
import BalanceGameModal from "./components/BalanceGameModal";

// 기념사진 촬영 페이지
import PhotographFirst from "./pages/PhotographFirst";
import PhotographLast from "./pages/PhotographLast";
import TakePhotoModal from "./components/TakePhotoModal";

// 렙업 페이지들
import WrapUp from "./pages/WrapUp";
import WrapUpModal from "./components/WrapUpModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/auth/kakao/callback" element={<Auth />} />
        <Route path="/report" element={<Report />} />

        {/* 대기실 */}
        <Route path="/waiting-room" element={<WaitingRoom />} />
        <Route path="/camera-check" element={<CamCheck />} />

        {/* 한줄 자기소개 페이지랑 관련된 Route */}
        <Route path="/common" element={<CommonGamePage />} />
        <Route path="/selfintro-getready" element={<SelfIntroductionGetReady />} />
        <Route path="/selfintro-allprepared" element={<SelfIntroductionAllPrepared />} />
        <Route path="/self-introduction" element={<SelfIntroduction />} />

        {/* 나를 맞춰봐 페이지랑 관련된 Route */}
        <Route path="/guessme" element={<GuessMe />} />
        <Route path="/guessme-getready" element={<GuessMeGetReady />} />
        <Route path="/guessme-allprepared" element={<GuessMeAllPrepared />} />

        {/* 밸런스 게임과 관련된 Route */}
        <Route path="/balance-getready" element={<BalanceGetReady />} />
        <Route path="/balance-choosing" element={<BalanceChoosing />} />
        <Route path="/balance-change-choices" element={<BalanceChangeChoices />} />
        <Route path="/balance-modal" element={<BalanceGameModal />} />

        {/* 기념사진촬영과 관련된 Route */}
        <Route path="/photo-first" element={<PhotographFirst />} />
        <Route path="/photo-last" element={<PhotographLast />} />
        <Route path="/photomodal" element={<TakePhotoModal />} />

        {/* 렙업 페이지랑 관련된 Route */}
        <Route path="/wrap-up" element={<WrapUp />} />
        <Route path="/wrapup-modal" element={<WrapUpModal />} />
      </Routes>
    </>
  );
}

export default App;
