import React, { useEffect } from "react";
import { Routes, Route, } from "react-router-dom";

import Home from "./pages/Main/Home";
import Play from "./pages/Main/Play";
import Login from "./pages/Main/Login";
import MyPage from "./pages/Main/MyPage";
import Auth from "./pages/Main/Auth";
import Report from "./pages/Main/Report";

// 게임 공통 페이지(기반)
// import CamCheck from "./pages/Games/CamCheck";

// 한 줄 자기소개 페이지들
// 다 합쳤음
// import SelfIntroductionOld from "./pages/Games/Self_introduction/SelfIntroductionOld";
// import SelfIntroductionAllPrepared from "./pages/Games/Self_introduction/SelfIntroductionAllPrepared";
// import SelfIntroduction from "./pages/Games/Self_introduction/SelfIntroduction";

// 나를 맞춰봐 페이지들
// import GuessMeGetReady from "./components/Guess_me/GuessMeGetReady";
// import GuessMeAllPrepared from "./components/Guess_me/GuessMeAllPrepared";
// import GuessMeAnswer from "./components/Guess_me/GuessMeAnswer";
import GuessMe from "./components/Guess_me/GuessMe";


// 밸런스 페이지들
// import BalanceGetReady from "./components/Balance_game/BalanceGetReady";
// import BalanceChangeChoices from "./components/Balance_game/BalanceChangeChoices";
// import BalanceChoosing from "./components/Balance_game/BalanceChoosing";
// import BalanceGameModal from "./components/BalanceGameModal";
// import Balance from "./pages/Games/Balance_game/BalanceGame";

// 기념사진 촬영 페이지
// import PhotographFirst from "./components/Photo/PhotographFirst";
// import PhotographLast from "./pages/Games/Photo/PhotographLast";
// import TakePhotoModal from "./components/Photo/TakePhotoModal";

// 렙업 페이지들
// import WrapUp from "./pages/Games/WrapUp";
// import WrapUpModal from "./components/Wrap_up/WrapUpModal";

// 로그인 알람 모달
import useAuthStore from "./store/useAuthStore";
import LoginAlert from "./pages/Main/LoginAlert";
import Games from "./pages/Games/Games";

function App() {
  const { message, isLoginAlert, setLoginAlert } = useAuthStore();

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
        {/* 마이페이지 동적 라우팅 */}
        {/* <Route path="/mypage/:memberName" element={<MyPage />} /> */}
        <Route path="/login/oauth2/code/*" element={<Auth />} />
        <Route path="/report" element={<Report />} />

        {/* 대기실 */}
        {/* <Route path="/waiting-room" element={<WaitingRoom />} /> */}
        {/* <Route path="/camera-check" element={<CamCheck />} /> */}

        {/* 한줄 자기소개 페이지랑 관련된 Route */}
        {/* <Route
          path="/selfintro-getready"
          element={<SelfIntroductionGetReady />}
        />
        <Route
          path="/selfintro-allprepared"
          element={<SelfIntroductionAllPrepared />}
        /> */}
        {/* <Route path="/self-introduction" element={<SelfIntroduction />} /> */}

        {/* 나를 맞춰봐 페이지랑 관련된 Route */}
        <Route path="/guessme" element={<GuessMe />} />
        {/* <Route path="/guessme-getready" element={<GuessMeGetReady />} />
        <Route path="/guessme-allprepared" element={<GuessMeAllPrepared />} /> */}

        {/* 밸런스 게임과 관련된 Route */}
        {/* <Route path="/balance" element={<Balance />} /> */}
        {/* <Route path="/balance-getready" element={<BalanceGetReady />} />
        <Route path="/balance-choosing" element={<BalanceChoosing />} />
        <Route path="/balance-change-choices" element={<BalanceChangeChoices />} /> */}
        {/* <Route path="/balance-modal" element={<BalanceGameModal />} /> */}

        {/* 기념사진촬영과 관련된 Route */}
        {/* <Route path="/photo-first" element={<PhotographFirst />} /> */}
        {/* <Route path="/photo-last" element={<PhotographLast />} /> */}
        {/* <Route path="/photomodal" element={<TakePhotoModal />} /> */}

        {/* 렙업 페이지랑 관련된 Route */}
        {/* <Route path="/wrap-up" element={<WrapUp />} /> */}
        {/* <Route path="/wrapup-modal" element={<WrapUpModal />} /> */}

        {/* 게임 합친 페이지 */}
        <Route path="/games" element={<Games />} />


      </Routes>
    </>
  );
}

export default App;
