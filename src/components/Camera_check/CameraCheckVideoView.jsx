import React, { useEffect } from "react";
import profileSample from "../../assets/profile_sample.png";
import mute from "../../assets/Camera_check/mute.png";
import mic_on from "../../assets/Camera_check/mic_on.png";
import useGameStore from "../../store/useGameStore";

const CameraCheckVideoView = ({ data, mainStreamManager, subscribers }) => {
  return (
    <>

      <div className="w-full h-full flex justify-center items-center">
        <div className="relative w-[45vw] h-[40vh] bg-red-300 rounded-[15px] flex items-center justify-center">
        <div id="video-container">
        {mainStreamManager && mainStreamManager?.addVideoElement&& (
          <div id="publisher">
            <video
              autoPlay={true}
              ref={(video) => video && mainStreamManager.addVideoElement(video)}
            />
          </div>
        )}
        {subscribers && subscribers?.length > 0 && subscribers.map((sub, index) => {
          console.log("[*] subcribe.map", sub);
          return(
          <div key={index} id="subscriber">
            <video
              autoPlay={true}
              ref={(video) => video && sub.addVideoElement(video)}
            />
          </div>
        )})}
      </div>
          <div className="w-full text-white flex p-2">
            <span className="flex absolute bottom-0 left-0">
              <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                {data.name}
              </span>
              <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                <img
                  src={mic_on}
                  alt="mic on"
                  className={`w-[12px] h-[18px] ${data.mic ? null : "hidden"}`}
                />
                <img
                  src={mute}
                  alt="mute"
                  className={`w-[12px] h-[18px] ${data.mic ? "hidden" : null}`}
                />
              </span>
            </span>
            <span
              className={`flex items-center px-2 h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute bottom-0 right-0 ${
                data.ready ? null : "hidden"
              }`}
            >
              준비완료
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraCheckVideoView;
