import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useGameStore from "./../../store/useGameStore";
import useAuthStore from "./../../store/useAuthStore";

import Chatbox from "./../Common/Chatbox";
import BasicBtn from "./../Buttons/BasicBtn";
import ExitBtn from "./../Buttons/ExitBtn";
import GameTurns from "./../Common/GameTurns";
import SelfIntroductionModal from "./../Self_introduction/SelfIntroductionModal";
import webSocketService from "./../../WebSocketService";

const SelfIntroduction = () => {
  const [dots, setDots] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [userStatus, setUserStatus] = useState("준비완료");
  const [allPrepared, setAllPrepared] = useState(false);
  const [initialContent, setInitialContent] = useState("");
  const [isGamePhase, setIsGamePhase] = useState(false);
  const [introductions, setIntroductions] = useState([]);
  const [userText, setUserText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPresenterId, setCurrentPresenterId] = useState(null);
  const navigate = useNavigate();

  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);

  const roomId = 1;
  
  const { memberId } = useAuthStore();

  const hostId = 4; // Host user ID

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMessageReceived = (message) => {
      console.log('Received message:', message);

      if (message.content === "더이상 확인 가능한 자기소개가 남아있지 않습니다.") {
        setGameStep("photo-first");
        return;
      }

      setIntroductions((prev) => [...prev, message]);
      setCurrentPresenterId(message.memberId);
      setUserText(message.content);
      setAllPrepared(true);
      setTimeout(() => {
        setIsGamePhase(true);
      }, 2000);
    };

    webSocketService.connect(() => {
      webSocketService.subscribe(`/api/sub/intro/${roomId}/next`, handleMessageReceived);
    });

    return () => {
      webSocketService.deactivate();
    };
  }, [roomId, setGameStep]);

  const fetchNextIntroduction = () => {
    webSocketService.sendNext(roomId);
  };

  const handleIntroSubmit = (content) => {
    setShowModal(false);
    setUserStatus("준비완료");
  };

  const handleNextStep = () => {
    fetchNextIntroduction();
  };

  return (
    <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
        <div className="h-[5%] flex justify-between items-center mb-2">
          <div className="w-[90%] flex justify-center absolute top-3">
            <GameTurns sectionNumber={1} />
          </div>
          <div className="w-[10%] flex justify-center">
            <ExitBtn />
          </div>
        </div>
        <div className="flex-grow flex mt-5 overflow-hidden h-[52vh]">
          <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
            <p className="m-5">camera background</p>
          </div>
          <div className="flex-[3] h-full ml-5 rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
            <Chatbox />
          </div>
        </div>
        {!isGamePhase ? (
          <div className="flex-none mt-3 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
            {!allPrepared ? (
              <div className="flex-grow flex items-center justify-center">
                <img src="src/assets/common/snowing_cloud.png" alt="구름 그림" />
                <span className="text-transparent">&nbsp;&nbsp;</span>
                <span className="text-[rgba(85,181,236)]">
                  한 줄 자기소개 문제가 만들어지고 있어요{dots}
                </span>
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <img src="src/assets/common/star.png" alt="star 그림" />
                <span className="text-transparent">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-[rgba(85,181,236)]">전원 준비 완료!!</span>
                <span className="text-transparent">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <img src="src/assets/common/star.png" alt="star 그림" />
              </div>
            )}
            <div className="flex justify-end"></div>
          </div>
        ) : (
          <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
            <div className="flex-grow flex items-center justify-center relative">
              <span>나는</span>
              <span className="text-transparent">&nbsp;</span>
              <span className="text-[rgb(129,109,255)] border-solid border-b-4 border-[rgb(129,109,255)]">
                {userText}
              </span>
              <span className="text-transparent">&nbsp;</span>
              <span>다.</span>
            </div>
            {memberId === currentPresenterId && (
              <div className="absolute bottom-3 right-5">
                <BasicBtn btnText="다음" onClick={handleNextStep} />
              </div>
            )}
            <img
              src="src/assets/Self_introduction/thinking_character.png"
              alt="생각하는 캐릭터 그림"
              className="absolute bottom-0 left-0 mb-3 ml-3 max-w-[100px] max-h-[100px]"
            />
          </div>
        )}
      </div>
      {showModal && (
        <SelfIntroductionModal
          readyPeople={3}
          btnText="저장"
          onClose={() => setShowModal(false)}
          onReady={handleIntroSubmit}
          initialContent={initialContent}
          roomId={roomId}
          memberId={memberId}
        />
      )}
    </div>
  );
};

export default SelfIntroduction;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useGameStore from "./../../store/useGameStore"
// import Chatbox from "./../Common/Chatbox"
// import BasicBtn from "./../Buttons/BasicBtn";
// import ExitBtn from "./../Buttons/ExitBtn";
// import GameTurns from "./../Common/GameTurns";
// import SelfIntroductionModal from "./../Self_introduction/SelfIntroductionModal"; // Adjust the import path based on your project structure

// const SelfIntroduction = () => {
//   const [dots, setDots] = useState("");
//   const [showModal, setShowModal] = useState(true); // Set to true to show modal initially
//   const [userStatus, setUserStatus] = useState("준비완료");
//   const [allPrepared, setAllPrepared] = useState(false);
//   const [initialContent, setInitialContent] = useState("");
//   const [isFirstTime, setIsFirstTime] = useState(true); // Track if it is the first time saving content
//   const [isGamePhase, setIsGamePhase] = useState(false); // Track if we are in the game phase
//   const [introductions, setIntroductions] = useState([]);
//   const [userText, setUserText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   const gameStep = useGameStore((state) => state.gameStep)
//   const setGameStep = useGameStore((state) => state.setGameStep)

//   const readyPeople = 3; // Example number of people waiting, you can replace it with actual data
//   const btnText = "작성 문구 수정"; // Example button text, you can replace it with actual data
//   const roomId = 1;
//   const memberId = 4

//   // 준비중 ... (점들 계속 움직이게 만드는거)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots((prevDots) => (prevDots.length < 6 ? prevDots + " ·" : ""));
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch initial content when component mounts
//   useEffect(() => {
//     const fetchInitialContent = async () => {
//       try {
//         const response = await axios.get(
//           `https://i11c209.p.ssafy.io/api/result/intro/${roomId}`,
//           {
//             headers: {
//               Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w`
//             }
//           }
//         );
//         const userIntro = response.data.data.find(intro => intro.memberId === memberId);
//         if (userIntro) {
//           setInitialContent(userIntro.content);
//           setIsFirstTime(false); // It is not the first time if content exists
//         } else {
//           setIsFirstTime(true); // Set to true if no content exists
//         }
//       } catch (error) {
//         console.error('Error fetching initial content:', error);
//       }
//     };
//     fetchInitialContent();
//   }, [roomId]);

//   // Fetch all introductions when entering the game phase
//   useEffect(() => {
//     if (isGamePhase) {
//       const fetchIntroductions = async () => {
//         try {
//           const response = await axios.get(
//             `https://i11c209.p.ssafy.io/api/result/intro/${roomId}/all`,
//             {
//               headers: {
//                 Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w`
//               }
//             }
//           );
//           console.log(response.data);
//           setIntroductions(response.data.data);
//           if (response.data.data.length > 0) {
//             setUserText(response.data.data[0].content);
//           }
//         } catch (error) {
//           console.error('Error fetching introductions:', error);
//         }
//       };
//       fetchIntroductions();
//     }
//   }, [isGamePhase, roomId]);

//   const handleOpenModal = () => {
//     setShowModal(true);
//     setUserStatus("준비중");
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setUserStatus("준비완료");
//   };

//   const handleReady = (updatedContent, isFirstTimeStatus) => {
//     setInitialContent(updatedContent);
//     setIsFirstTime(isFirstTimeStatus); // Update isFirstTime status
//     setUserStatus("준비완료");
//     setAllPrepared(true); // Set to true to show "준비 완료!"
//   };

//   // Move to the game phase if allPrepared is true
//   useEffect(() => {
//     if (allPrepared) {
//       const timer = setTimeout(() => {
//         setIsGamePhase(true);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [allPrepared]);

//   const handleNextStep = async () => {
//     if (currentIndex < introductions.length - 1) {
//       const nextIndex = currentIndex + 1;
//       setCurrentIndex(nextIndex);
//       setUserText(introductions[nextIndex].content);
//     } else {
//       try {
//         await axios.delete(
//           `https://i11c209.p.ssafy.io/api/result/intro/${roomId}`,
//           {
//             headers: {
//               Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjM0MDQ2MTUzIiwicm9sZSI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjo0LCJpYXQiOjE3MjI0MTUzNTcsImV4cCI6MTcyNTAwNzM1N30.qRva6SS4G0otEemMMYngU6-EgsBGkbVaGURxH7wi8VP6L6jfPj5kon0MCrJzKnVYIWPCgPZhxDpx95nvdILM6w`
//             }
//           }
//         );
//         console.log("Redis data deleted and saved to the actual database");
//         setGameStep("photo-first")
//         // navigate("/photo-first");
//       } catch (error) {
//         console.error("Error deleting Redis data:", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-custom-gradient-game w-[100vw] h-[100vh] flex justify-center items-center">
//       <div className="w-[1024px] h-[90%] bg-[rgba(255,255,255,0.3)] m-auto rounded-[40px] flex flex-col relative p-10 overflow-hidden">
//         {/* Top Div */}
//         <div className="h-[5%] flex justify-between items-center mb-2">
//           <div className="w-[90%] flex justify-center absolute top-3">
//             <GameTurns sectionNumber={1} />
//           </div>
//           <div className="w-[10%] flex justify-center">
//             <ExitBtn />
//           </div>
//         </div>

//         {/* Middle Div */}
//         <div className="flex-grow flex mt-5 overflow-hidden h-[52vh]">
//           <div className="bg-[rgba(255,255,255,0.9)] flex-[7] h-full mr-5 rounded-[20px] flex justify-center items-center overflow-hidden">
//             <p className="m-5">camera background</p>
//           </div>
//           <div className="flex-[3] h-full ml-5 rounded-[20px] flex flex-col justify-center items-center overflow-hidden">
//             <Chatbox />
//           </div>
//         </div>

//         {/* Mid-Bottom Between Div */}
//         {!isGamePhase && (
//           <div className="text-xs mt-3 flex justify-start">
//             {!allPrepared ? (
//               <BasicBtn
//                 btnText={btnText}
//                 onClick={handleOpenModal}
//                 fontSize={12}
//               />
//             ) : (
//               <div className="invisible">
//                 <BasicBtn btnText={"Hey"} fontSize={12} />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Bottom Div */}
//         {!isGamePhase ? (
//           <div className="flex-none mt-3 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem]">
//             {!allPrepared ? (
//               <div className="flex-grow flex items-center justify-center">
//                 <img src="src/assets/common/snowing_cloud.png" alt="구름 그림" />
//                 <span className="text-transparent">&nbsp;&nbsp;</span>
//                 <span className="text-[rgba(85,181,236)]">
//                   한 줄 자기소개 문제가 만들어지고 있어요{dots}
//                 </span>
//               </div>
//             ) : (
//               <div className="flex-grow flex items-center justify-center">
//                 <img src="src/assets/common/star.png" alt="star 그림" />
//                 <span className="text-transparent">
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 </span>
//                 <span className="text-[rgba(85,181,236)]">전원 준비 완료!!</span>
//                 <span className="text-transparent">
//                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 </span>
//                 <img src="src/assets/common/star.png" alt="star 그림" />
//               </div>
//             )}
//             <div className="flex justify-end"></div>
//           </div>
//         ) : (
//           <div className="flex-none mt-10 w-full h-[7rem] rounded-[40px] bg-[rgba(255,255,255,0.7)] shadow-[0_0_30px_rgba(66,72,81,0.2)] text-[#55B5EC] text-[24px] flex flex-col justify-between p-[1rem] relative">
//             <div className="flex-grow flex items-center justify-center relative">
//               <span>나는</span>
//               <span className="text-transparent">&nbsp;</span>
//               <span className="text-[rgb(129,109,255)] border-solid border-b-4 border-[rgb(129,109,255)]">
//                 {userText}
//               </span>
//               <span className="text-transparent">&nbsp;</span>
//               <span>다.</span>
//             </div>
//             <div className="absolute bottom-3 right-5">
//               <BasicBtn btnText="다음" onClick={handleNextStep} />
//             </div>
//             <img
//               src="src/assets/Self_introduction/thinking_character.png"
//               alt="생각하는 캐릭터 그림"
//               className="absolute bottom-0 left-0 mb-3 ml-3 max-w-[100px] max-h-[100px]"
//             />
//           </div>
//         )}
//       </div>
//       {showModal && (
//         <SelfIntroductionModal
//           readyPeople={readyPeople}
//           btnText="저장"
//           onClose={handleCloseModal}
//           onReady={handleReady}
//           initialContent={initialContent}
//           roomId={roomId}
//           isFirstTime={isFirstTime} // Pass the isFirstTime prop
//         />
//       )}
//     </div>
//   );
// };

// export default SelfIntroduction;