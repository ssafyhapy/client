import React from "react";
import Photograph_intro from "../components/Photograph_intro";
import Photograph_final from "../components/Phogoraph_final";
import GameTurns from "../components/GameTurns";

const Photograph = () => {

  const pics = Array(6).fill("pic")

  return (
    <div className="w-full h-screen bg-custom-gradient-game flex items-center justify-center">
      {/* 젤 큰 div */}
      <div style={{ height: 'calc(100vh - 50px)' }} className="w-1/2 bg-[rgba(255,255,255,0.6)] flex flex-col justify-between">
        {/* 안쪽 화상화면 넣을 흰색 div */}
        <div className="h-4/5 bg-[rgba(255,255,255,0.7)] mr-[44px] ml-[44px] mt-[35px] mb-[39px] p-4 grid grid-cols-2 gap-4">
          {/* 임시 화상화면 6개 */}
          {pics.map((pic, index) => (
            <div key={index} className="flex items-center justify-center">
              <p className="m-5">{pic}</p>
            </div>
          ))}
        </div>
        {/* 게임순서 div */}
        <div className="m-2 flex items-center justify-center">
          <GameTurns sectionNumber={1} />
          {/* <GameTurns sectionNumber={3} /> */}
        </div>
        {/* 문구 들어갈 div */}
        <div className="text-center text-sm m-5 font-bold">
          <Photograph_intro />
          {/* <Photograph_final /> */}
        </div>
      </div>
    </div>
  )
}

export default Photograph