import React from "react";
import useGameStore from "../../store/useGameStore";
import Chatbox from "./Chatbox";

const MiddleDiv = () => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
  } = useGameStore();
  return (
      <div id="middleDiv" className="flex justify-center h-[75vh] w-[95%] m-3">
        <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
          <p className="m-5">
            {/* 화면 나오기 */}
            {mainStreamManager && mainStreamManager?.addVideoElement && (
              <div id="publisher">
                <video
                  autoPlay={true}
                  ref={(video) =>
                    video && mainStreamManager.addVideoElement(video)
                  }
                />
              </div>
            )}
            {subscribers &&
              subscribers?.length > 0 &&
              subscribers.map((sub, index) => {
                console.log("[*] subcribe.map", sub);
                return (
                  <div key={index} id="subscriber">
                    <video
                      autoPlay={true}
                      ref={(video) => video && sub.addVideoElement(video)}
                    />
                  </div>
                );
              })}
          </p>
        </div>
        <div className="h-full rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
          <Chatbox />
        </div>
      </div>
  );
};

export default MiddleDiv;
