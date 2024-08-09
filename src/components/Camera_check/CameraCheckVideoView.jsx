import React, { useEffect } from "react";
import useGameStore from "./../../store/useGameStore"
import profileSample from "../../assets/profile_sample.png";
import useAuthStore from "../../store/useAuthStore";
// import mute from "../../assets/Camera_check/mute.png";
// import mic_on from "../../assets/Camera_check/mic_on.png";

const CameraCheckVideoView = ({ data }) => {
  const mute = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png"
  const mic_on = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
  } = useGameStore();

  const {memberName} = useAuthStore()

  useEffect(
    () =>
      console.log(
        "[*]구독자 변경",
        subscribers,
        "구독자 타입",
        typeof subscribers
      ),
    [subscribers]
  );

  return (
    <>
      {publisher ? (
        <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
          <div id="videoFront" className="relative w-[90%] h-[90%]">
            <video
              autoPlay={true}
              ref={(video) => video && publisher.addVideoElement(video)}
              className="object-cover w-full h-full rounded-[15px]"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
              <div className="w-full text-white flex absolute bottom-0">
                <span className="flex ">
                  <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                    {memberName}
                  </span>
                  <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                    <img
                      src={mic_on}
                      alt="mic on"
                      className={`w-[12px] h-[18px] ${
                        publisher.stream.audioActive? null : "hidden"
                      }`}
                    />
                    <img
                      src={mute}
                      alt="mute"
                      className={`w-[12px] h-[18px] ${
                        publisher.stream.audioActive ? "hidden" : null
                      }`}
                    />
                  </span>
                </span>

              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>비디오를 연결하고 있습니다.</div>
      )}
    </>
  );
};

export default CameraCheckVideoView;
