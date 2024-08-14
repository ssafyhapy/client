import React from "react";
import profileSample from "src/assets/profile_sample.png";
// import mute from "src/assets/Camera_check/mute.png";
// import mic_on from "src/assets/Camera_check/mic_on.png";


const SingleVideoView = ({data}) => {
  const mute = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png"
  const mic_on = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
  // data에 들어가야 할 개인 정보 => 1. {name:,mic:,img:,ready:,}
  return (
    <div>
      <div>
        <div className="w-[250px] h-[180px] flex items-center justify-center rounded-[25px] bg-yellow-200">
          <div className="relative w-[223px] h-[160px]">
            <img
              src={profileSample}
              alt="profile_sample"
              className="w-full h-full rounded-[6px]"
            />
            <div className="absolute bottom-0 left-0 w-full text-white flex justify-between items-center">
              <span className="flex">
                <span className="flex items-center px-2 h-[24px]  bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                  {data.name}
                </span>
                <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                  <img src={mic_on} alt="" className={`w-[12px] h-[18px] ${data.mic?null:"hidden"}`} />
                  <img src={mute} alt="" className={`w-[12px] h-[18px]] ${data.mic?"hidden":null}`}/>
                </span>
              </span>
              <span className={`flex items-center px-2 h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5) hidden`}>
                준비완료
              </span>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default SingleVideoView;
