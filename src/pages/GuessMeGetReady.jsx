import React, {useState, useEffect} from "react";
import Chatbox from "../components/Chatbox";
import ExitBtn from "../components/btn/ExitBtn";
import GameTurns from "../components/GameTurns";

const GuessMeGetReady = () => {
    const [dots, setDots] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length < 6 ? prevDots + ' ·' : ''))
        }, 500)

        return () => clearInterval(interval)
    }, [])

  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        {/* Top Div */}
        <div className="h-[5%] flex justify-between items-center">
          <div className="w-[90%] flex justify-center absolute top-3">
            <GameTurns sectionNumber={2} />
          </div>
          <div className="w-[10%] flex justify-center">
            <ExitBtn />
          </div>
        </div>

        {/* Middle Div */}
        <div className="flex-grow flex overflow-hidden mt-5 h-[52vh]">
          <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-[52vh] mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
            <p className="m-5">camera background</p>
          </div>
          <div className="flex-[3] ml-5 h-[52vh] rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
            <Chatbox />
          </div>
        </div>

        {/* Bottom Div */}
        <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
      <div className="flex-grow flex items-center justify-center">
        <img src="src/assets/snowing_cloud.png" alt="star 그림" />
        <span className="text-transparent">&nbsp;&nbsp;</span>
        <span className="text-[rgba(85,181,236)]">나를 맞춰봐 문제가 만들어지고 있어요{dots}</span>
      </div>
      <div className="flex justify-end"></div>
    </div>
      </div>
    </div>
  );
};

export default GuessMeGetReady;
