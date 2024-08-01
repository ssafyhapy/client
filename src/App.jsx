import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Main/Home";
import Play from "./pages/Main/Play";
import Login from "./pages/Main/Login";
import MyPage from "./pages/Main/MyPage";
import Auth from "./pages/Main/Auth";
import Report from "./pages/Main/Report";

// 게임 공통 페이지(기반)
import WaitingRoom from "./pages/Games/WaitingRoom";
import CamCheck from "./pages/Games/CamCheck";

// 한 줄 자기소개 페이지들
import SelfIntroduction from "./pages/Games/Self_introduction/SelfIntroduction";
import SelfIntroductionGetReady from "./pages/Games/Self_introduction/SelfIntroductionGetReady";
import SelfIntroductionAllPrepared from "./pages/Games/Self_introduction/SelfIntroductionAllPrepared";

// 나를 맞춰봐 페이지들
import GuessMeGetReady from "./pages/Games/Guess_me/GuessMeGetReady";
import GuessMeAllPrepared from "./pages/Games/Guess_me/GuessMeAllPrepared";
import GuessMe from "./pages/Games/Guess_me/GuessMe";

// 밸런스 페이지들
import BalanceGetReady from "./pages/Games/Balance_game/BalanceGetReady";
import BalanceChangeChoices from "./pages/Games/Balance_game/BalanceChangeChoices";
import BalanceChoosing from "./pages/Games/Balance_game/BalanceChoosing";

// 기념사진 촬영 페이지
import PhotographFirst from "./pages/Games/Photo/PhotographFirst";
import PhotographLast from "./pages/Games/Photo/PhotographLast";
import TakePhotoModal from "./components/Photo/TakePhotoModal";

// 렙업 페이지들
import WrapUp from "./pages/Games/WrapUp";
import WrapUpModal from "./components/Wrap_up/WrapUpModal";

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
        <Route
          path="/selfintro-getready"
          element={<SelfIntroductionGetReady />}
        />
        <Route
          path="/selfintro-allprepared"
          element={<SelfIntroductionAllPrepared />}
        />
        <Route path="/self-introduction" element={<SelfIntroduction />} />

        {/* 나를 맞춰봐 페이지랑 관련된 Route */}
        <Route path="/guessme" element={<GuessMe />} />
        <Route path="/guessme-getready" element={<GuessMeGetReady />} />
        <Route path="/guessme-allprepared" element={<GuessMeAllPrepared />} />

        {/* 밸런스 게임과 관련된 Route */}
        <Route path="/balance-getready" element={<BalanceGetReady />} />
        <Route path="/balance-choosing" element={<BalanceChoosing />} />
        <Route
          path="/balance-change-choices"
          element={<BalanceChangeChoices />}
        />

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
