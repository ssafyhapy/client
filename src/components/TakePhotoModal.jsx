import React, { useState, useEffect } from "react";

const TakePhotoModal = ({ onCapture }) => {
  const [seconds, setSeconds] = useState(4);
  const [currentImage, setCurrentImage] = useState("src/assets/camera.png");

  const images = [
    "src/assets/camera.png",
    "src/assets/hand_three.png",
    "src/assets/hand_two.png",
    "src/assets/hand_one.png",
    "src/assets/hand_one.png"
  ];

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(prev => prev - 1);
        setCurrentImage(images[5 - seconds]);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onCapture();
    }
  }, [seconds, onCapture]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-[rgba(255,255,255,0.50)] w-[10%] h-[20%] flex rounded-2xl shadow-lg justify-center items-center">
        <img className="w-[100px] h-[100px]" src={currentImage} alt="Current display" />
      </div>
    </div>
  );
};

export default TakePhotoModal;
