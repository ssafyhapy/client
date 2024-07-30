import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Play from "./pages/Play";
import MyPage from "./pages/MyPage";
import SingleVideoView from "./components/CameraCheckVideoView";
import GameTurns from "./components/GameTurns";
import GameBackground from "./components/GameBackgound";
import WaitingRoom from "./pages/WaitingRoom";
import CamCheck from "./pages/CamCheck";
import Photograph from "./pages/Photograph";
import Report from "./pages/Report"

import CommonGamePage from "./components/CommonGamePage";
import SelfIntroduction from "./pages/SelfIntroduction"
import SelfIntroductionGetReady from "./pages/SelfIntroductionGetReady";
import SelfIntroductionAllPrepared from './pages/SelfIntroductionAllPrepared'


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/camera_check" element={<CamCheck />} />
      <Route path="/report" element={<Report />} />
      
      {/* 기념사진촬영 */}
      <Route path="/photo" element={<Photograph />} />
      
      {/* 한줄 자기소개 페이지랑 관련된 Route */}
      <Route path="/common" element={<CommonGamePage />} />
      <Route path="/selfintro_getready" element={<SelfIntroductionGetReady />} />
      <Route path="/selfintro_allprepared" element={<SelfIntroductionAllPrepared />} />
      <Route path="/self_introduction" element={<SelfIntroduction />} />

    </Routes>
    </>
  );
}

export default App;