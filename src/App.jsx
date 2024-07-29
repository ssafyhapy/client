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
import CommonGamePage from "./components/CommonGamePage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/camera_check" element={<CamCheck />} />
      <Route path="/photo" element={<Photograph />} />
      <Route path="/common" element={<CommonGamePage />} />
    </Routes>
    </>
  );
}

export default App;