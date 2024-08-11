// import React, { useState } from "react";
// import useGameStore from "../../store/useGameStore";
// import GameBackground from "../Common/GameBackground";
// import BasicBtn from "../Buttons/BasicBtn";
// import CameraCheckVideoView from "./CameraCheckVideoView";
// import MicBtn from "../Buttons/MicBtn";
// import MaskBtn from "../Buttons/MaskBtn";
// import SelectMask from "../Waiting_room/SelectMask";

// const CamCheck = ({ onMaskChange }) => {
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
//   const btnText = "완료";

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNextStep = ()=>{
//     setGameStep("waiting-room")
//   }

//   const handleChangeMask = (newUrl) => {
//     if (gltfUrl !== newUrl) {
//       setIsGltfUrl(false);
//       setGltfUrl(newUrl);
//       console.log(gltfUrl);
//     }
//   };

//   return (
//     <GameBackground>
//       <div className="flex flex-col justify-center items-center p-[2rem] w-full max-h-[90vh] relative">
//         <div className="w-[80%] relative ">
//           <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px] max-h-[60vh]">
//             <div className="h-[50vh] max-h-[45vh] w-[65%] flex justify-center items-center">
//               <CameraCheckVideoView data={{ name: "someone", mic: false, ready: true }} />
//             </div>
//             <div className="flex justify-between mt-3">
//               <span className="mr-20">
//                 <MicBtn />
//               </span>
//               <span className="relative">
//                 <MaskBtn onClick={handleOpenModal} />
//                 {isModalOpen && (
//                   <div className="absolute top-0 left-full ml-4">
//                     <SelectMask handleCloseModal={handleCloseModal} handleChangeMask={handleChangeMask} />
//                   </div>
//                 )}
//               </span>
//             </div>
//           </div>
//           <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
//             <div className="flex-grow flex items-center justify-center">
//               {text}
//             </div>
//             <div className="absolute bottom-4 right-4">
//               <BasicBtn btnText={btnText} onClick={handleNextStep} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </GameBackground>
//   );
// };

// export default CamCheck;

// import React, { useState } from "react";
// import useGameStore from "../../store/useGameStore";
// import GameBackground from "../Common/GameBackground";
// import BasicBtn from "../Buttons/BasicBtn";
// import CameraCheckVideoView from "./CameraCheckVideoView";
// import MicBtn from "../Buttons/MicBtn";
// import MaskBtn from "../Buttons/MaskBtn";
// import SelectMask from "../Waiting_room/SelectMask";

// const CamCheck = ({ onMaskChange }) => {
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [gltfUrl, setGltfUrl] = useState("");  // 추가된 상태 관리
//   const [isGltfUrl, setIsGltfUrl] = useState(false);  // 추가된 상태 관리
//   const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
//   const btnText = "완료";

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNextStep = () => {
//     setGameStep("waiting-room");
//   };

//   const handleChangeMask = (newUrl) => {
//     if (gltfUrl !== newUrl) {
//       setIsGltfUrl(false);
//       setGltfUrl(newUrl);
//       console.log(gltfUrl);

//       // 가면이 변경되었을 때 OpenVidu 퍼블리셔의 비디오 소스를 캔버스 스트림으로 변경
//       onMaskChange();
//     }
//   };

//   return (
//     <GameBackground>
//       <div className="flex flex-col justify-center items-center p-[2rem] w-full max-h-[90vh] relative">
//         <div className="w-[80%] relative ">
//           <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px] max-h-[60vh]">
//             <div className="h-[50vh] max-h-[45vh] w-[65%] flex justify-center items-center">
//               <CameraCheckVideoView data={{ name: "someone", mic: false, ready: true }} />
//             </div>
//             <div className="flex justify-between mt-3">
//               <span className="mr-20">
//                 <MicBtn />
//               </span>
//               <span className="relative">
//                 <MaskBtn onClick={handleOpenModal} />
//                 {isModalOpen && (
//                   <div className="absolute top-0 left-full ml-4">
//                     <SelectMask
//                       handleCloseModal={handleCloseModal}
//                       handleChangeMask={handleChangeMask}  // 가면 선택 시 handleChangeMask 호출
//                     />
//                   </div>
//                 )}
//               </span>
//             </div>
//           </div>
//           <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
//             <div className="flex-grow flex items-center justify-center">
//               {text}
//             </div>
//             <div className="absolute bottom-4 right-4">
//               <BasicBtn btnText={btnText} onClick={handleNextStep} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </GameBackground>
//   );
// };

// export default CamCheck;

// import React, { useState } from "react";
// import useGameStore from "../../store/useGameStore";
// import GameBackground from "../Common/GameBackground";
// import BasicBtn from "../Buttons/BasicBtn";
// import CameraCheckVideoView from "./CameraCheckVideoView";
// import MicBtn from "../Buttons/MicBtn";
// import MaskBtn from "../Buttons/MaskBtn";
// import SelectMask from "../Waiting_room/SelectMask";

// const CamCheck = ({ onMaskChange }) => {
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [gltfUrl, setGltfUrl] = useState("");  // 추가된 상태 관리
//   const [isGltfUrl, setIsGltfUrl] = useState(false);  // 추가된 상태 관리
//   const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
//   const btnText = "완료";

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNextStep = () => {
//     setGameStep("waiting-room");
//   };

//   const handleChangeMask = (newUrl) => {
//     if (gltfUrl !== newUrl) {
//       setIsGltfUrl(false);
//       setGltfUrl(newUrl);
//       console.log(gltfUrl);

//       // 가면이 변경되었을 때 OpenVidu 퍼블리셔의 비디오 소스를 캔버스 스트림으로 변경
//       onMaskChange();
//     }
//   };

//   return (
//     <GameBackground>
//       <div className="flex flex-col justify-center items-center p-[2rem] w-full max-h-[90vh] relative">
//         <div className="w-[80%] relative ">
//           <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px] max-h-[60vh]">
//             <div className="h-[50vh] max-h-[45vh] w-[65%] flex justify-center items-center">
//               <CameraCheckVideoView data={{ name: "someone", mic: false, ready: true }} />
//             </div>
//             <div className="flex justify-between mt-3">
//               <span className="mr-20">
//                 <MicBtn />
//               </span>
//               <span className="relative">
//                 <MaskBtn onClick={handleOpenModal} />
//                 {isModalOpen && (
//                   <div className="absolute top-0 left-full ml-4">
//                     <SelectMask
//                       handleCloseModal={handleCloseModal}
//                       handleChangeMask={handleChangeMask}  // 가면 선택 시 handleChangeMask 호출
//                     />
//                   </div>
//                 )}
//               </span>
//             </div>
//           </div>
//           <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
//             <div className="flex-grow flex items-center justify-center">
//               {text}
//             </div>
//             <div className="absolute bottom-4 right-4">
//               <BasicBtn btnText={btnText} onClick={handleNextStep} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </GameBackground>
//   );
// };

// export default CamCheck;

// import React, { useState } from "react";
// import useGameStore from "../../store/useGameStore";
// import GameBackground from "../Common/GameBackground";
// import BasicBtn from "../Buttons/BasicBtn";
// import CameraCheckVideoView from "./CameraCheckVideoView";
// import MicBtn from "../Buttons/MicBtn";
// import MaskBtn from "../Buttons/MaskBtn";
// import SelectMask from "../Waiting_room/SelectMask";

// const CamCheck = ({ onMaskChange }) => {
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [gltfUrl, setGltfUrl] = useState("");  // 추가된 상태 관리
//   const [isGltfUrl, setIsGltfUrl] = useState(false);  // 추가된 상태 관리
//   const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
//   const btnText = "완료";

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNextStep = () => {
//     setGameStep("waiting-room");
//   };

//   const handleChangeMask = (newUrl) => {
//     if (gltfUrl !== newUrl) {
//       setIsGltfUrl(false);
//       setGltfUrl(newUrl);
//       console.log(gltfUrl);

//       // 가면이 변경되었을 때 OpenVidu 퍼블리셔의 비디오 소스를 캔버스 스트림으로 변경
//       onMaskChange();
//     }
//   };

//   return (
//     <GameBackground>
//       <div className="flex flex-col justify-center items-center p-[2rem] w-full max-h-[90vh] relative">
//         <div className="w-[80%] relative ">
//           <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px] max-h-[60vh]">
//             <div className="h-[50vh] max-h-[45vh] w-[65%] flex justify-center items-center">
//               <CameraCheckVideoView data={{ name: "someone", mic: false, ready: true }} />
//             </div>
//             <div className="flex justify-between mt-3">
//               <span className="mr-20">
//                 <MicBtn />
//               </span>
//               <span className="relative">
//                 <MaskBtn onClick={handleOpenModal} />
//                 {isModalOpen && (
//                   <div className="absolute top-0 left-full ml-4">
//                     <SelectMask
//                       handleCloseModal={handleCloseModal}
//                       handleChangeMask={handleChangeMask}  // 가면 선택 시 handleChangeMask 호출
//                     />
//                   </div>
//                 )}
//               </span>
//             </div>
//           </div>
//           <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
//             <div className="flex-grow flex items-center justify-center">
//               {text}
//             </div>
//             <div className="absolute bottom-4 right-4">
//               <BasicBtn btnText={btnText} onClick={handleNextStep} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </GameBackground>
//   );
// };

// export default CamCheck;

// import React, { useState } from "react";
// import useGameStore from "../../store/useGameStore";
// import GameBackground from "../Common/GameBackground";
// import BasicBtn from "../Buttons/BasicBtn";
// import CameraCheckVideoView from "./CameraCheckVideoView";
// import MicBtn from "../Buttons/MicBtn";
// import MaskBtn from "../Buttons/MaskBtn";
// import SelectMask from "../Waiting_room/SelectMask";

// const CamCheck = ({ onMaskChange }) => { // onMaskChange를 Props로 받습니다.
//   const gameStep = useGameStore((state) => state.gameStep);
//   const setGameStep = useGameStore((state) => state.setGameStep);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
//   const btnText = "완료";

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleNextStep = () => {
//     setGameStep("waiting-room");
//   };

//   const handleChangeMask = (newUrl) => { // 마스크가 변경되었을 때
//     const setGltfUrl = useGameStore((state) => state.setGltfUrl);
//     const setIsGltfUrl = useGameStore((state) => state.setIsGltfUrl);

//     setGltfUrl(newUrl);
//     setIsGltfUrl(true);

//     if (onMaskChange) {
//       onMaskChange(); // onMaskChange를 호출합니다.
//     }
//   };

//   return (
//     <GameBackground>
//       <div className="flex flex-col justify-center items-center p-[2rem] w-full max-h-[90vh] relative">
//         <div className="w-[80%] relative ">
//           <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px] max-h-[60vh]">
//             <div className="h-[50vh] max-h-[45vh] w-[65%] flex justify-center items-center">
//               <CameraCheckVideoView data={{ name: "someone", mic: false, ready: true }} />
//             </div>
//             <div className="flex justify-between mt-3">
//               <span className="mr-20">
//                 <MicBtn />
//               </span>
//               <span className="relative">
//                 <MaskBtn onClick={handleOpenModal} />
//                 {isModalOpen && (
//                   <div className="absolute top-0 left-full ml-4">
//                     <SelectMask handleCloseModal={handleCloseModal} handleChangeMask={handleChangeMask} />
//                   </div>
//                 )}
//               </span>
//             </div>
//           </div>
//           <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
//             <div className="flex-grow flex items-center justify-center">
//               {text}
//             </div>
//             <div className="absolute bottom-4 right-4">
//               <BasicBtn btnText={btnText} onClick={handleNextStep} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </GameBackground>
//   );
// };

// export default CamCheck;

import React, { useState } from "react";
import useGameStore from "../../store/useGameStore";
import GameBackground from "../Common/GameBackground";
import BasicBtn from "../Buttons/BasicBtn";
import CameraCheckVideoView from "./CameraCheckVideoView";
import MicBtn from "../Buttons/MicBtn";
import MaskBtn from "../Buttons/MaskBtn";
import SelectMask from "../Waiting_room/SelectMask";

const CamCheck = ({ onMaskChange }) => { // onMaskChange를 Props로 받습니다.
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const text = "나만의 가면을 선택하고 마이크와 비디오를 테스트해보세요!";
  const btnText = "완료";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextStep = () => {
    setGameStep("waiting-room");
  };

  const handleChangeMask = (newUrl) => { // 마스크가 변경되었을 때
    const setGltfUrl = useGameStore((state) => state.setGltfUrl);
    const setIsGltfUrl = useGameStore((state) => state.setIsGltfUrl);

    setGltfUrl(newUrl);
    setIsGltfUrl(true);

    if (onMaskChange) {
      onMaskChange(); // onMaskChange를 호출합니다.
    }
  };

  return (
    <GameBackground>
      <div className="flex flex-col justify-center items-center p-[2rem] w-full max-h-[90vh] relative">
        <div className="w-[80%] relative ">
          <div className="bg-white flex flex-col justify-center items-center p-[2rem] rounded-[40px] shadow-[0_0_30px_rgba(66,72,81,0.2)] mb-[20px] max-h-[60vh]">
            <div className="h-[50vh] max-h-[45vh] w-[65%] flex justify-center items-center">
              <CameraCheckVideoView data={{ name: "someone", mic: false, ready: true }} />
            </div>
            <div className="flex justify-between mt-3">
              <span className="mr-20">
                <MicBtn />
              </span>
              <span className="relative">
                <MaskBtn onClick={handleOpenModal} />
                {isModalOpen && (
                  <div className="absolute top-0 left-full ml-4">
                    <SelectMask handleCloseModal={handleCloseModal} handleChangeMask={handleChangeMask} />
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className="w-[100%] h-[10rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex items-center justify-between p-[1rem] relative">
            <div className="flex-grow flex items-center justify-center">
              {text}
            </div>
            <div className="absolute bottom-4 right-4">
              <BasicBtn btnText={btnText} onClick={handleNextStep} />
            </div>
          </div>
        </div>
      </div>
    </GameBackground>
  );
};

export default CamCheck;

