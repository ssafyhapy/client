// import React, { useEffect } from "react";
// import profileSample from "../../assets/profile_sample.png";
// import mute from "../../assets/Camera_check/mute.png";
// import mic_on from "../../assets/Camera_check/mic_on.png";
// import useGameStore from "../../store/useGameStore";

// const CameraCheckVideoView = ({ data }) => {
//   console.log("[*]", data);
//   const {
//     mainStreamManager,
//     setMainStreamManager,
//     publisher,
//     setPublisher,
//     subscribers,
//     setSubscribers,
//   } = useGameStore();

//   useEffect(
//     () =>
//       console.log(
//         "[*]구독자 변경",
//         subscribers,
//         "구독자 타입",
//         typeof subscribers
//       ),
//     [subscribers]
//   );

//   const handleChangeMask = (newUrl) => {
//     if (gltfUrl !== newUrl) {
//       setIsGltfUrl(false);
//       setGltfUrl(newUrl);
//       console.log(gltfUrl);
//     }
//   };

//   return (
//     <>
//       {mainStreamManager ? (
//         <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
//           <div id="videoFront" className="relative w-[90%] h-[90%]">
//             <video
//               autoPlay={true}
//               ref={(video) => video && mainStreamManager.addVideoElement(video)}
//               className="object-cover w-full h-full rounded-[15px]"
//             />
//             <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
//               <div className="w-full text-white flex absolute bottom-0">
//                 <span className="flex ">
//                   <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                     {data.name}
//                   </span>
//                   <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                     <img
//                       src={mic_on}
//                       alt="mic on"
//                       className={`w-[12px] h-[18px] ${
//                         data.mic ? null : "hidden"
//                       }`}
//                     />
//                     <img
//                       src={mute}
//                       alt="mute"
//                       className={`w-[12px] h-[18px] ${
//                         data.mic ? "hidden" : null
//                       }`}
//                     />
//                   </span>
//                 </span>
//                 <span
//                   className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
//                     data.ready ? null : "hidden"
//                   }`}
//                 >
//                   준비완료
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>비디오를 연결하고 있습니다.</div>
//       )}
//     </>
//   );
// };

// export default CameraCheckVideoView;

// import React, { useRef, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import useGameStore from "../../store/useGameStore";
// import { useAR } from "../../hooks/useAR";

// const ARModel = ({ gltfUrl, rotation, position, faceWidth }) => {
//   const { scene } = useGLTF(gltfUrl);

//   useFrame(() => {
//     if (scene) {
//       scene.rotation.copy(rotation);
//       scene.position.copy(position);
//       scene.scale.set(faceWidth, faceWidth, faceWidth);
//     }
//   });

//   return <primitive object={scene} />;
// };

// const CameraCheckVideoView = ({ data }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const mainStreamManager = useGameStore((state) => state.mainStreamManager);
//   const setPublisher = useGameStore((state) => state.setPublisher);

//   // Zustand로부터 상태를 가져옴
//   const gltfUrl = useGameStore((state) => state.gltfUrl);
//   const isGltfUrl = useGameStore((state) => state.isGltfUrl);

//   const {
//     rotation,
//     position,
//     faceWidth,
//   } = useAR(videoRef, canvasRef);

//   const handleMaskChange = async () => {
//     if (session) {
//       // 1. 기존 스트림 중단
//       if (mainStreamManager) {
//         session.unpublish(mainStreamManager);
//       }

//       // 2. 캔버스에서 비디오 스트림 생성
//       const canvasElement = canvasRef.current;
//       if (canvasElement) {
//         const canvasStream = canvasElement.captureStream(30);

//         // 3. 새 publisher 생성
//         const newPublisher = session.initPublisher(undefined, {
//           videoSource: canvasStream.getVideoTracks()[0],
//           audioSource: undefined, // 필요 시 오디오 소스 추가
//           publishAudio: true,
//           publishVideo: true,
//           resolution: "640x480",
//           frameRate: 30,
//           insertMode: "APPEND",
//           mirror: false,
//         });

//         // 4. 새 스트림 publish
//         session.publish(newPublisher);
//         setPublisher(newPublisher); // 새 publisher를 상태에 저장
//       }
//     }
//   };

//   // 가면이 선택되었을 때 handleMaskChange 호출
//   useEffect(() => {
//     if (isGltfUrl) {
//       handleMaskChange();
//     }
//   }, [isGltfUrl]);

//   useEffect(() => {
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current);
//     }
//   }, [mainStreamManager]);

//   return (
//     <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
//       <video
//         ref={videoRef}
//         autoPlay
//         className="object-cover w-full h-full rounded-[15px]"
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       />
//       <Canvas
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       >
//         <ambientLight intensity={0.5} />
//         <pointLight position={[1, 1, 1]} />
//         <pointLight position={[-1, 0, 1]} />
//         {isGltfUrl && (
//           <ARModel
//             gltfUrl={gltfUrl}
//             rotation={rotation}
//             position={position}
//             faceWidth={faceWidth}
//           />
//         )}
//       </Canvas>
//     </div>
//   );
// };

// export default CameraCheckVideoView;

// import React, { useRef, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import useGameStore from "../../store/useGameStore";
// import { useAR } from "../../hooks/useAR";
// import profileSample from "../../assets/profile_sample.png";
// import mute from "../../assets/Camera_check/mute.png";
// import mic_on from "../../assets/Camera_check/mic_on.png";

// const ARModel = ({ gltfUrl, rotation, position, faceWidth }) => {
//   const { scene } = useGLTF(gltfUrl);

//   useFrame(() => {
//     if (scene) {
//       scene.rotation.copy(rotation);
//       scene.position.copy(position);
//       scene.scale.set(faceWidth, faceWidth, faceWidth);
//     }
//   });

//   return <primitive object={scene} />;
// };

// const CameraCheckVideoView = ({ data }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const mainStreamManager = useGameStore((state) => state.mainStreamManager);

//   // Zustand로부터 상태를 가져옴
//   const gltfUrl = useGameStore((state) => state.gltfUrl);
//   const isGltfUrl = useGameStore((state) => state.isGltfUrl);

//   const { rotation, position, faceWidth } = useAR(videoRef, canvasRef);

//   useEffect(() => {
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current);
//     }
//   }, [mainStreamManager]);

//   return (
//     <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
//       <video
//         ref={videoRef}
//         autoPlay
//         className="object-cover w-full h-full rounded-[15px]"
//       />
//       <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
//         <div className="w-full text-white flex absolute bottom-0">
//           <span className="flex ">
//             <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//               {data.name}
//             </span>
//             <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//               <img
//                 src={mic_on}
//                 alt="mic on"
//                 className={`w-[12px] h-[18px] ${data.mic ? "" : "hidden"}`}
//               />
//               <img
//                 src={mute}
//                 alt="mute"
//                 className={`w-[12px] h-[18px] ${data.mic ? "hidden" : ""}`}
//               />
//             </span>
//           </span>
//           <span
//             className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
//               data.ready ? "" : "hidden"
//             }`}
//           >
//             준비완료
//           </span>
//         </div>
//       </div>
//       <canvas
//         id="publisher"
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}

//       />
//       <Canvas
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       >
//         <ambientLight intensity={0.5} />
//         <pointLight position={[1, 1, 1]} />
//         <pointLight position={[-1, 0, 1]} />
//         {isGltfUrl && (
//           <ARModel
//             gltfUrl={gltfUrl}
//             rotation={rotation}
//             position={position}
//             faceWidth={faceWidth}
//           />
//         )}
//       </Canvas>
//     </div>
//   );
// };

// export default CameraCheckVideoView;

// import React, { useRef, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import useGameStore from "../../store/useGameStore";
// import { useAR } from "../../hooks/useAR";
// import profileSample from "../../assets/profile_sample.png";
// import mute from "../../assets/Camera_check/mute.png";
// import mic_on from "../../assets/Camera_check/mic_on.png";

// const ARModel = ({ gltfUrl, rotation, position, faceWidth }) => {
//   const { scene } = useGLTF(gltfUrl);

//   useFrame(() => {
//     if (scene) {
//       scene.rotation.copy(rotation);
//       scene.position.copy(position);
//       scene.scale.set(faceWidth, faceWidth, faceWidth);
//     }
//   });

//   return <primitive object={scene} />;
// };

// const CameraCheckVideoView = ({ data }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const mainStreamManager = useGameStore((state) => state.mainStreamManager);

//   // Zustand로부터 상태를 가져옴
//   const gltfUrl = useGameStore((state) => state.gltfUrl);
//   const isGltfUrl = useGameStore((state) => state.isGltfUrl);

//   const { rotation, position, faceWidth } = useAR(videoRef, canvasRef);

//   useEffect(() => {
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current);
//     }
//   }, [mainStreamManager]);

//   return (
//     <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
//       <video
//         ref={videoRef}
//         autoPlay
//         className="object-cover w-full h-full rounded-[15px]"
//       />
//       <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
//         <div className="w-full text-white flex absolute bottom-0">
//           <span className="flex ">
//             <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//               {data.name}
//             </span>
//             <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//               <img
//                 src={mic_on}
//                 alt="mic on"
//                 className={`w-[12px] h-[18px] ${data.mic ? "" : "hidden"}`}
//               />
//               <img
//                 src={mute}
//                 alt="mute"
//                 className={`w-[12px] h-[18px] ${data.mic ? "hidden" : ""}`}
//               />
//             </span>
//           </span>
//           <span
//             className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
//               data.ready ? "" : "hidden"
//             }`}
//           >
//             준비완료
//           </span>
//         </div>
//       </div>
//       <canvas
//         id="publisher"
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}

//       />
//       <Canvas
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       >
//         <ambientLight intensity={0.5} />
//         <pointLight position={[1, 1, 1]} />
//         <pointLight position={[-1, 0, 1]} />
//         {isGltfUrl && (
//           <ARModel
//             gltfUrl={gltfUrl}
//             rotation={rotation}
//             position={position}
//             faceWidth={faceWidth}
//           />
//         )}
//       </Canvas>
//     </div>
//   );
// };

// export default CameraCheckVideoView;

// import React, { useEffect, useRef, useState } from 'react';
// import * as tmImage from '@teachablemachine/image'; // Teachable Machine 이미지 라이브러리 가져오기

// const URL = "https://teachablemachine.withgoogle.com/models/C_QpeZVSr"; // Teachable Machine 모델 URLimport { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber"; // Canvas 임포트 추가

// import useGameStore from "../../store/useGameStore";
// import { useAR } from "../../hooks/useAR";
// import profileSample from "../../assets/profile_sample.png";
// import mute from "../../assets/Camera_check/mute.png";
// import mic_on from "../../assets/Camera_check/mic_on.png";

// const ARModel = ({ gltfUrl, rotation, position, faceWidth }) => {
//   const { scene } = useGLTF(gltfUrl);

//   useFrame(() => {
//     if (scene) {
//       scene.rotation.copy(rotation);
//       scene.position.copy(position);
//       scene.scale.set(faceWidth, faceWidth, faceWidth);
//     }
//   });

//   return <primitive object={scene} />;
// };

// const CameraCheckVideoView = ({ data }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const mainStreamManager = useGameStore((state) => state.mainStreamManager);

//   // Zustand로부터 상태를 가져옴
//   const gltfUrl = useGameStore((state) => state.gltfUrl);
//   const isGltfUrl = useGameStore((state) => state.isGltfUrl);

//   const { rotation, position, faceWidth } = useAR(videoRef, canvasRef);

//   useEffect(() => {
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current);
//     }
//   }, [mainStreamManager]);

//   const [model, setModel] = useState(null);
//   const [maxPredictions, setMaxPredictions] = useState(0);
//   const [predictionResults, setPredictionResults] = useState([]);
//   const [finalResults, setFinalResults] = useState([]);
//   const [timerActive, setTimerActive] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(5);
//   const webcamRef = useRef(null);
//   const THRESHOLD = 0.75; // 임계치 값

//    // 모델 로드
//    useEffect(() => {
//     async function loadModel() {
//       const modelURL = `${URL}/model.json`;
//       const metadataURL = `${URL}/metadata.json`;
//       const loadedModel = await tmImage.load(modelURL, metadataURL);
//       setModel(loadedModel);
//     }

//     loadModel();
//   }, []);

//   // 비디오에서 예측 수행
//   useEffect(() => {
//     const loop = async () => {
//       if (model && videoRef.current) {
//         const predictions = await model.predict(videoRef.current);
//         console.log("Predictions: ", predictions); 
//         setPredictionResults(predictions); 
//       }
//       requestAnimationFrame(loop);
//     };
//     loop();
//   }, [model]);

//   // 예측 결과에 따라 배경색 변경
//   const applyBackgroundColor = (ctx) => {
//     if (predictionResults.length > 0) {
//       const highestPrediction = predictionResults.reduce(
//         (prev, current) => (prev.probability > current.probability ? prev : current)
//       );
//       const highestClass = highestPrediction.className;
//       const highestProb = highestPrediction.probability;
//       let backgroundColor = 'rgba(0, 0, 0, 0.0)'; 

//       if (highestClass === 'O' && highestProb >= THRESHOLD) {
//         backgroundColor = 'rgba(0, 0, 255, 0.5)'; 
//         console.log("O");
//       } else if (highestClass === 'X' && highestProb >= THRESHOLD) {
//         backgroundColor = 'rgba(255, 0, 0, 0.5)'; 
//         console.log("X");
//       }

//       ctx.fillStyle = backgroundColor;
//       ctx.drawImage(
//         videoRef.current,
//         0,
//         0,
//         canvasRef.current.width,
//         canvasRef.current.height
//       );
//       ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     }
//   };

//   // 캔버스에 비디오 그리기
//   useEffect(() => {
//     const drawImage = () => {
//       if (canvasRef.current && videoRef.current) {
//         const ctx = canvasRef.current.getContext('2d');
//         applyBackgroundColor(ctx);
//         requestAnimationFrame(drawImage);
//       }
//     };
//     drawImage();
//   }, [predictionResults]);


//   useEffect(() => {
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current);
//     }
//   }, [mainStreamManager]);



//   return (
//     <>
      
//       <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
//       <canvas
//         id="publisher"
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       />
//         <video
//           ref={videoRef}
//           autoPlay
//           className="object-cover w-full h-full rounded-[15px]"
//         />
//         <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
//           <div className="w-full text-white flex absolute bottom-0">
//             <span className="flex ">
//               <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                 {data.name}
//               </span>
//               <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                 <img
//                   src={mic_on}
//                   alt="mic on"
//                   className={`w-[12px] h-[18px] ${data.mic ? "" : "hidden"}`}
//                 />
//                 <img
//                   src={mute}
//                   alt="mute"
//                   className={`w-[12px] h-[18px] ${data.mic ? "hidden" : ""}`}
//                 />
//               </span>
//             </span>
//             <span
//               className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
//                 data.ready ? "" : "hidden"
//               }`}
//             >
//               준비완료
//             </span>
//           </div>
//         </div>
//       </div>

//       <Canvas
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       >
//         <ambientLight intensity={0.5} />
//         <pointLight position={[1, 1, 1]} />
//         <pointLight position={[-1, 0, 1]} />
//         {isGltfUrl && (
//           <ARModel
//             gltfUrl={gltfUrl}
//             rotation={rotation}
//             position={position}
//             faceWidth={faceWidth}
//           />
//         )}
//       </Canvas>
//     </>
//   );
// };

// export default CameraCheckVideoView;


// import React, { useEffect, useRef, useState } from 'react';
// import * as tmImage from '@teachablemachine/image'; // Teachable Machine 이미지 라이브러리 가져오기

// const URL = "https://teachablemachine.withgoogle.com/models/C_QpeZVSr"; // Teachable Machine 모델 URL

// import useGameStore from "../../store/useGameStore";
// import { useAR } from "../../hooks/useAR";
// import profileSample from "../../assets/profile_sample.png";
// import mute from "../../assets/Camera_check/mute.png";
// import mic_on from "../../assets/Camera_check/mic_on.png";

// const CameraCheckVideoView = ({ data }) => {
//   const videoRef = useRef(null);
//   const mainStreamManager = useGameStore((state) => state.mainStreamManager);

//   // Zustand로부터 상태를 가져옴
//   const gltfUrl = useGameStore((state) => state.gltfUrl);
//   const isGltfUrl = useGameStore((state) => state.isGltfUrl);

//   useEffect(() => {
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current);
//     }
//   }, [mainStreamManager]);

//   const [model, setModel] = useState(null);

//    // 모델 로드
//    useEffect(() => {
//     async function loadModel() {
//       const modelURL = `${URL}/model.json`;
//       const metadataURL = `${URL}/metadata.json`;
//       const loadedModel = await tmImage.load(modelURL, metadataURL);
//       setModel(loadedModel);
//     }

//     loadModel();
//   }, []);

//   // 비디오에서 예측 수행
//   useEffect(() => {
//     const loop = async () => {
//       if (model && videoRef.current) {
//         const predictions = await model.predict(videoRef.current);
//         console.log("Predictions: ", predictions); // 콘솔에 예측 결과 출력
//       }
//       requestAnimationFrame(loop);
//     };
//     loop();
//   }, [model]);

//   return (
//     <>
//       <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
//         <video
//           ref={videoRef}
//           autoPlay
//           className="object-cover w-full h-full rounded-[15px]"
//         />
//         <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
//           <div className="w-full text-white flex absolute bottom-0">
//             <span className="flex ">
//               <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                 {data.name}
//               </span>
//               <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
//                 <img
//                   src={mic_on}
//                   alt="mic on"
//                   className={`w-[12px] h-[18px] ${data.mic ? "" : "hidden"}`}
//                 />
//                 <img
//                   src={mute}
//                   alt="mute"
//                   className={`w-[12px] h-[18px] ${data.mic ? "hidden" : ""}`}
//                 />
//               </span>
//             </span>
//             <span
//               className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
//                 data.ready ? "" : "hidden"
//               }`}
//             >
//               준비완료
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CameraCheckVideoView;


import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image'; // Teachable Machine 이미지 라이브러리 가져오기

const URL = "https://teachablemachine.withgoogle.com/models/C_QpeZVSr"; // Teachable Machine 모델 URL

import useGameStore from "../../store/useGameStore";
import profileSample from "../../assets/profile_sample.png";
import mute from "../../assets/Camera_check/mute.png";
import mic_on from "../../assets/Camera_check/mic_on.png";

const CameraCheckVideoView = ({ data }) => {
  const videoRef = useRef(null);
  const mainStreamManager = useGameStore((state) => state.mainStreamManager);
  const [model, setModel] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [timer, setTimer] = useState(10); // 10초 타이머
  const [intervalId, setIntervalId] = useState(null);

  // 모델 로드
  useEffect(() => {
    async function loadModel() {
      const modelURL = `${URL}/model.json`;
      const metadataURL = `${URL}/metadata.json`;
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    }

    loadModel();
  }, []);

  // 타이머 및 예측 수행
  useEffect(() => {
    const loop = async () => {
      if (model && videoRef.current) {
        const predictions = await model.predict(videoRef.current);
        console.log("Predictions: ", predictions); // 예측 결과 출력

        // 가장 높은 확률의 결과 저장
        const highestPrediction = predictions.reduce((prev, current) =>
          prev.probability > current.probability ? prev : current
        );
        setFinalResult(highestPrediction.className);
      }
      requestAnimationFrame(loop);
    };

    if (timer > 0) {
      loop();
      const id = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId); // 타이머 종료 시 루프 종료
        console.log("Final Result: ", finalResult); // 마지막으로 결정된 결과 콘솔 출력
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [model, timer]);

  useEffect(() => {
    if (mainStreamManager && videoRef.current) {
      mainStreamManager.addVideoElement(videoRef.current);
    }
  }, [mainStreamManager]);

  return (
    <>
      <div className="relative w-full h-full flex justify-center items-center rounded-[15px]">
        <video
          ref={videoRef}
          autoPlay
          className="object-cover w-full h-full rounded-[15px]"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
          <div className="w-full text-white flex absolute bottom-0">
            <span className="flex ">
              <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tl-[6px] rounded-bl-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                {data.name}
              </span>
              <span className="flex items-center px-2 h-[24px] bg-[rgba(0,0,0,0.5)] rounded-tr-[6px] rounded-br-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)]">
                <img
                  src={mic_on}
                  alt="mic on"
                  className={`w-[12px] h-[18px] ${data.mic ? "" : "hidden"}`}
                />
                <img
                  src={mute}
                  alt="mute"
                  className={`w-[12px] h-[18px] ${data.mic ? "hidden" : ""}`}
                />
              </span>
            </span>
            <span
              className={`h-[24px] bg-[#8CA4F8] rounded-[6px] border-solid border-[1px] border-[rgba(0,0,0,0.5)] absolute right-0 ${
                data.ready ? "" : "hidden"
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
