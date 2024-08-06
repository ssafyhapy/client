import React from "react";
import profileSample from "../../assets/profile_sample.png";
// import mute from "../../assets/Camera_check/mute.png";
// import mic_on from "../../assets/Camera_check/mic_on.png";

const CameraCheckVideoView = ({ data }) => {
  const mute = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png"
  const mic_on = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="relative w-[80%] h-[80%]">
        <img
          src={profileSample}
          alt="profile_sample"
          className="w-full h-full object-cover rounded-[6px]"
        />
        <div className="w-full text-white flex p-2">
          <span className="flex absolute bottom-0 left-0">
            <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
              {data.name}
            </span>
            <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
              <img src={mic_on} alt="mic on" className={`w-[12px] h-[18px] ${data.mic ? null : "hidden"}`} />
              <img src={mute} alt="mute" className={`w-[12px] h-[18px] ${data.mic ? "hidden" : null}`} />
            </span>
          </span>
          <span className={`flex items-center px-2 h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute bottom-0 right-0 ${data.ready ? null : "hidden"}`}>
            준비완료
          </span>
        </div>
      </div>
    </div>
  );
};

export default CameraCheckVideoView;
