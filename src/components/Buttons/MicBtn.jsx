import React from "react";
import useGameStore from "../../store/useGameStore";

const MicBtn = () => {
  const mic = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic.png";

  // 오디오를 변경하는 함수
  const toggleAudio = () => {
    if (publisher) {
        const isAudioEnabled = publisher.stream.audioActive; // 현재 오디오 상태 확인
        publisher.publishAudio(!isAudioEnabled); // 오디오 상태를 토글
        console.log(`Microphone is now ${!isAudioEnabled ? 'enabled' : 'disabled'}`);
    }
};


  return (
    // 마이크 버튼
    <div>
      <button
        onClick={toggleAudioTrack}
        className="relative z-10 w-[53px] h-[47px] shadow-[0_4px_10px_rgba(66,72,81,0.5)] rounded-2xl bg-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-[rgba(0,0,0,0.5)]"
      >
        <img className="w-[43px] h-[43px]" src={mic} alt="smileyface" />
      </button>
    </div>
  );
};

export default MicBtn;
