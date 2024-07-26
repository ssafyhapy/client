import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Play from "./pages/Play";
import MyPage from "./pages/MyPage";
import SingleVideoView from "./components/SingleVideoView";
import GameTurns from "./components/GameTurns";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
    <SingleVideoView data={{name:"김민영", mic:true, ready:true}}></SingleVideoView>
    <GameTurns sectionNumber={3}></GameTurns>
    </>
  );
}

export default App;