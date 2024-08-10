// import React, { useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import { useAR } from "./useAR"; // 방금 만든 useAR 훅을 import
// import useGameStore from "./../../store/useGameStore";
// import useAuthStore from "../../store/useAuthStore";
// // import mute from "../../assets/Camera_check/mute.png";
// // import mic_on from "../../assets/Camera_check/mic_on.png";

// const Model = ({ url, rotation, position, faceWidth }) => {
//   const { scene } = useGLTF(url);

//   useFrame(() => {
//     scene.rotation.set(rotation.x, rotation.y, rotation.z);
//     scene.position.set(position.x, position.y, position.z);
//     scene.scale.set(faceWidth, faceWidth, faceWidth);
//   });

//   return <primitive object={scene} />;
// };

// const CameraCheckVideoView = ({ data }) => {
//   const mute = "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png";
//   const mic_on =
//     "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png";
//   const {
//     mainStreamManager,
//     setMainStreamManager,
//     publisher,
//     setPublisher,
//     subscribers,
//     setSubscribers,
//   } = useGameStore();

//   const { memberName } = useAuthStore();

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // useAR 훅을 사용하여 AR 정보를 가져옵니다.
//   const {
//     gltfUrl,
//     setGltfUrl,
//     isGltfUrl,
//     size,
//     setSize,
//     verticalPosition,
//     setVerticalPosition,
//     horizontalPosition,
//     setHorizontalPosition,
//     rotation,
//     position,
//     faceWidth,
//   } = useAR(videoRef, canvasRef);

//   // 여기서 AR 비디오를 오픈비두로 송출할 수 있습니다.
//   useEffect(() => {
//     if (publisher && videoRef.current) {
//       publisher.replaceTrack(videoRef.current.srcObject.getVideoTracks()[0]);
//     }
//   }, [publisher, videoRef]);

//   useEffect(() => {
//     if (videoRef.current && publisher) {
//       publisher.addVideoElement(videoRef.current);
//     }
//   }, [publisher]);


//   useEffect(
//     () =>
//       console.log(
//         "[*]구독자 변경",
//         subscribers,
//         "구독자 타입",
//         typeof subscribers
//       ),
//       console.log(
//         "[*]퍼블리셔 변경",
//         publisher,
//         "구독자 타입",
//         typeof publisher
//       ),
//     [subscribers, publisher]
//   );

//   // 오디오 상태 변경
//   const getMicIcon = (isAudioActive) => {
//     return isAudioActive
//       ? "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
//       : "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png";
//   };

//   return (
//     <>
//       {publisher ? (
//         <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
//           <div id="videoFront" className="relative w-[90%] h-[90%]">
//             <video
//               autoPlay
//               ref={videoRef}
//               className="object-cover w-full h-full rounded-[15px]"
//             />
//             <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
//               <div className="w-full text-white flex absolute bottom-0">
//                 <span className="flex ">
//                   <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                     {memberName}
//                   </span>
//                   <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                     <img
//                       src={getMicIcon(publisher.stream.audioActive)}
//                       alt="mic icon"
//                       className="w-[12px] h-[18px]"
//                     />
//                   </span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//         }}
//       />
//       <Canvas
//         className="absolute top-0 left-0 pointer-events-none"
//         style={{ width: "100%", height: "100%" }}
//       >
//         <ambientLight intensity={0.5} />
//         <pointLight position={[1, 1, 1]} />
//         <pointLight position={[-1, 0, 1]} />
//         {isGltfUrl && <Model url={gltfUrl} rotation={rotation} position={position} faceWidth={faceWidth} />}
//       </Canvas>

//         </div>
//       ) : (
//         <div>비디오를 연결하고 있습니다.</div>
//       )}
//     </>
//   );
// };

// export default CameraCheckVideoView;

// CameraCheckVideoView.js
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useAR } from "./../../hooks/useAR"
import useGameStore from "./../../store/useGameStore";
import useAuthStore from "../../store/useAuthStore";
import SelectMask from "../Waiting_room/SelectMask"; // SelectMask 컴포넌트 import

const Model = ({ url, rotation, position, faceWidth }) => {
  const { scene } = useGLTF(url);

  useFrame(() => {
    scene.rotation.set(rotation.x, rotation.y, rotation.z);
    scene.position.set(position.x, position.y, position.z);
    scene.scale.set(faceWidth, faceWidth, faceWidth);
  });

  return <primitive object={scene} />;
};

const CameraCheckVideoView = ({ data }) => {
  const [isMaskModalOpen, setIsMaskModalOpen] = useState(false); // 모달 상태 관리
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
  } = useGameStore();

  const { memberName } = useAuthStore();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    gltfUrl,
    setGltfUrl,
    isGltfUrl,
    size,
    setSize,
    verticalPosition,
    setVerticalPosition,
    horizontalPosition,
    setHorizontalPosition,
    rotation,
    position,
    faceWidth,
  } = useAR(videoRef, canvasRef);

  const openMaskModal = () => {
    setIsMaskModalOpen(true);
  };

  const closeMaskModal = () => {
    setIsMaskModalOpen(false);
  };

  const handleChangeMask = (newUrl) => {
    setGltfUrl(newUrl);
    closeMaskModal(); // 마스크 선택 후 모달 닫기
  };

  useEffect(() => {
    if (publisher && videoRef.current && videoRef.current.srcObject) {
      const videoTracks = videoRef.current.srcObject.getVideoTracks();
      if (videoTracks.length > 0) {
        publisher.replaceTrack(videoTracks[0]);
      }
    }
  }, [publisher, videoRef.current?.srcObject]);
  
  

  useEffect(() => {
    if (videoRef.current && publisher) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher]);
  

  const getMicIcon = (isAudioActive) => {
    return isAudioActive
      ? "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
      : "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png";
  };

  return (
    <>
      {publisher ? (
        <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
          <button onClick={openMaskModal}>가면 선택</button> {/* 가면 선택 버튼 */}
          <div id="videoFront" className="relative w-[90%] h-[90%]">
            <video
              autoPlay
              ref={videoRef}
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
                      src={getMicIcon(publisher.stream.audioActive)}
                      alt="mic icon"
                      className="w-[12px] h-[18px]"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <Canvas
            className="absolute top-0 left-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[1, 1, 1]} />
            <pointLight position={[-1, 0, 1]} />
            {isGltfUrl && (
              <Model
                url={gltfUrl}
                rotation={rotation}
                position={position}
                faceWidth={faceWidth}
              />
            )}
          </Canvas>

          {/* 가면 선택 모달 */}
          {isMaskModalOpen && (
            <SelectMask handleCloseModal={closeMaskModal} handleChangeMask={handleChangeMask} />
          )}
        </div>
      ) : (
        <div>비디오를 연결하고 있습니다.</div>
      )}
    </>
  );
};

export default CameraCheckVideoView;
