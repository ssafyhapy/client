import React, { useEffect, useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
const URL = "https://teachablemachine.withgoogle.com/models/ZkpyKO7ri";
import useGameStore from "../../store/useGameStore";
import Chatbox from "./Chatbox";
import useAuthStore from "../../store/useAuthStore";
import MicBtn from "../Buttons/MicBtn";
import EmojiBtn from "../Buttons/EmojiBtn";
import SelectEmoji from "./SelectEmoji";

import usePresenterStore from "../../store/usePresenterStore";
import webSocketService from "../../WebSocketService";
import useRoomStore from "../../store/useRoomStore";
import { useLocation } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Box3,
  Euler,
  Matrix4,
  Vector3,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useGLTF } from "@react-three/drei";
import { div } from "three/webgpu";

let video;
let faceLandmarker;
let lastVideoTime = -1;

// 가면 회전
let rotation = new Euler(0, 0, 0);
// 가면 위치
let position = new Vector3(0, 0, 0);
// 코 위치
let noseY = -1;
let noseX = -1;

// 비디오 크기
let videoWidth = 640;
let videoHeight = 480;
let videoX = 0;
let videoY = 0;
let faceWidth = 1;
let scaleFactor;

// 스파게티 유후~
// 마스크(GLB파일) 로드
const Model = ({ url, targetSize }) => {
  const { scene } = useGLTF(url);
  const sceneRef = useRef(scene);
  const { camera } = useThree();

  if (scene) {
    scene.traverse((child) => {
      scene.rotation.set(...rotation);

      // 가면 초기 크기 설정
      const box = new Box3().setFromObject(scene);
      const size = new Vector3();
      box.getSize(size);
      console.log(child);

      const maxSize = Math.max(size.x, size.y, size.z);
      scaleFactor = targetSize / maxSize;

      scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

      if (child instanceof Mesh) {
        console.log("mesh instance:, ", child);
        const material = new MeshStandardMaterial({
          map: child.material.map,
          roughness: 0.5,
        });
        child.material = material;
        child.material.needsUpdate = true;
      }
    });
  }

  console.log("GLTF파일 로드 완료");

  const getWorldPositionFromPixel = (pixelX, pixelY) => {
    const ndcX = ((pixelX + videoX) / videoWidth) * 2 - 1;
    const ndcY = -(((pixelY + videoY) / videoHeight) * 2 - 1);

    const vector = new Vector3(ndcX, ndcY, 0.5);
    vector.unproject(camera);

    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    return pos;
  };

  useFrame(() => {
    if (scene) {
      scene.rotation.set(rotation.x, rotation.y, rotation.z);
      scene.position.set(position.x, position.y, position.z);

      const nosePosition = getWorldPositionFromPixel(noseX, noseY);
      scene.position.copy(nosePosition);
      scene.scale.set(faceWidth, faceWidth, faceWidth);
    }
  });

  return scene ? <primitive object={scene} /> : null;
};

const MiddleDiv = ({ videoRef, outputCanvasRef }) => {
  const gameStep = useGameStore((state) => state.gameStep);
  const setGameStep = useGameStore((state) => state.setGameStep);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gl, setGL] = useState(null); // WebGL renderer reference
  const [gltfUrl, setGltfUrl] = useState("");
  const [isgltfUrl, setIsGltfUrl] = useState(false);

  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    connectionInfo,
  } = useGameStore();

  const { memberName, memberId } = useAuthStore();
  const { roomId } = useRoomStore();
  const targetSize = 2.996335351172754;
  const [size] = useState(720);
  // =============================================
  const handleChangeMask = (newUrl) => {
    if (gltfUrl !== newUrl) {
      setIsGltfUrl(false);
      setGltfUrl(newUrl);
      console.log(gltfUrl);
    }
  };

  useEffect(() => {
    // 모델이 변경될 때마다 다시 로드
    if (gltfUrl) {
      setIsGltfUrl(true);
    }
  }, [gltfUrl]);
  useEffect(() => {
    const initialize = async () => {
      console.log("실행은 하냐?");
      await setup(); // setup 함수가 완료된 후에
      joinSession(); // joinSession 함수를 호출
    };

    initialize(); // 초기화 함수 실행

    return () => {
      if (session) session.disconnect();
    };
  }, []); // 빈 배열로 의존성 배열 설정, 컴포넌트 마운트 시 한 번만 실행
  // mediapipe를 통해 faceLandmarker 예측
  const predict = () => {
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      console.log("video", video);
      // console.log("predict 재귀를 타는가?");
      requestAnimationFrame(predict);
      return;
    }

    const nowInMs = Date.now();
    if (video.currentTime) {
      lastVideoTime = video.currentTime;
      const result = faceLandmarker.detectForVideo(video, nowInMs);

      if (result.faceLandmarks && result.faceLandmarks.length > 0) {
        const matrix = result.facialTransformationMatrixes[0];
        rotation = new Euler().setFromRotationMatrix(
          new Matrix4().fromArray(matrix.data)
        );

        const landmarks = result.faceLandmarks[0];
        const centerX = landmarks[1].x;
        const centerY = landmarks[1].y;

        position.set((centerX - 0.5) * 2, -(centerY - 0.5) * 2, -1);

        const leftEye = landmarks[2];
        const rightEye = landmarks[5];
        if (leftEye && rightEye) {
          const dx = rightEye.x - leftEye.x;
          const dy = rightEye.y - leftEye.y;
          faceWidth = (Math.sqrt(dx * dx + dy * dy) * 100) / 4;
        }

        drawLandmarks(landmarks);
      }
    }

    requestAnimationFrame(predict);
  };
  // mediapipe가 매 영상 프레임마다 얼굴에서 코 위치 추출하는 로직
  const drawLandmarks = (landmarks) => {
    const canvas = outputCanvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const noseTipIndex = 1;
        if (landmarks[noseTipIndex]) {
          const noseTip = landmarks[noseTipIndex];
          noseX = noseTip.x * canvas.width;
          noseY = noseTip.y * canvas.height;
        }
      }
    } else {
      console.log("input canvas가 존재하지 않음");
    }
  };

  const setup = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU",
      },
      outputFaceBlendshapes: true,
      outputFacialTransformationMatrixes: true,
      runningMode: "VIDEO",
    });
    console.log("mediapipe 로드 완료");

    video = videoRef.current; // useRef를 통해 비디오 요소 참조

    if (!video) {
      console.error("Video element not found.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      video.srcObject = stream;
      video.addEventListener("loadeddata", () => {
        predict();
        drawComposite();
      });
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const drawComposite = () => {
    const video = videoRef.current;
    const outputCanvas = outputCanvasRef.current;

    if (video && outputCanvas) {
      const ctx = outputCanvas.getContext("2d");

      // 주기적으로 비디오와 캔버스의 내용을 합성하여 출력 캔버스에 그리기
      const draw = () => {
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.drawImage(gl.domElement, 0, 0, videoWidth, videoHeight);

        requestAnimationFrame(draw);
      };
      draw();
    }
  };

  useEffect(() => {
    if (gl) {
      drawComposite();
    }
  }, [gl]);
  // =============================================
  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("클릭됨");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const data = { ready: true };

  // 마이크 상태에 따라 아이콘을 선택하는 함수
  const getMicIcon = (isAudioActive) => {
    return isAudioActive
      ? "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mic_on.png"
      : "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/mute.png";
  };

  // 동적으로 grid-cols 클래스를 생성
  const getGridColsClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
    return `grid-cols-${Math.min(count, 3)}`;
  };

  useEffect(() => {
    console.log("[*] 정보 확인", publisher);
    console.log("[*] 정보 확인", subscribers);
  }, [publisher, subscribers]);

  // 비디오 크기를 동적으로 조정하는 함수
  const getVideoContainerClass = () => {
    const count = 1 + subscribers.length;
    // const count = 6;
    if (count === 1) return "w-[80%] max-w-[500px] min-w-[250px]";
    if (count === 2) return "w-[60%] max-w-[400px] min-w-[250px]";
    if (count >= 3) return "w-[40%] max-w-[400px] min-w-[250px]";
  };

  // const [redIds, setRedIds] = useState([]);
  // const [blueIds, setBlueIds] = useState([]);
  // blueIds, redIds usePresentStore에 저장해두었다 가져올것임

  const changeBackgroundColor = (id, color) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundColor = color;
    }
  };

  // 한 줄 자기소개 + 나를 맞춰봐!! 발표자 관련 =======================================================================
  // 발표자 백그라운드 노란색으로 하이라이트
  const { blueMembers, redMembers } = usePresenterStore();
  const currentPresenterId = usePresenterStore(
    (state) => state.currentPresenterId
  );
  const [highlightedElementId, setHighlightedElementId] = useState(null);

  // currentPresenterId 제대로 오는지 확인
  useEffect(() => {
    console.log("currentPresenterId updated to:", currentPresenterId);
    console.log("connectionInfo:", connectionInfo);
  }, [currentPresenterId, connectionInfo]);

  // 발표자 배경색 노란색으로 바꾸는거
  useEffect(() => {
    if (currentPresenterId === null) {
      if (highlightedElementId) {
        changeBackgroundColor(highlightedElementId, "");
        setHighlightedElementId(null); // Reset highlightedElementId
      }
      return; // Exit the effect early
    }

    // 현재 currentPresenterId & connectionInfo 가 잘 업데이트 된 상태인지 확인
    if (!currentPresenterId || Object.keys(connectionInfo).length === 0) {
      console.log(
        "Waiting for currentPresenterId or connectionInfo to be available..."
      );
      return; // Don't proceed until both are available
    }

    // 백그라운드 이미 설정된게 있으면 리셋
    if (highlightedElementId) {
      changeBackgroundColor(highlightedElementId, "");
    }

    // memberId === currentPresenterId 인 connectionId 찾아 (memberId가 string임에 주의!)
    const newHighlightedElementId = Object.keys(connectionInfo).find(
      (key) => parseInt(connectionInfo[key].memberId, 10) === currentPresenterId
    );

    if (newHighlightedElementId) {
      // Set the new highlighted element ID and change its background color
      setHighlightedElementId(newHighlightedElementId);
      changeBackgroundColor(newHighlightedElementId, "yellow");
    }

    // Log the new connectionId
    console.log(
      "New Highlighted Element ID (Connection ID):",
      newHighlightedElementId
    );
  }, [currentPresenterId, connectionInfo, highlightedElementId]);

  // ================================================================================================

  // 밸런스 게임! FIRST 고른 사람들에게 파란 배경색 부여
  const { balanceGamePeopleChoiceInfo, resetBalanceGamePeopleChoiceInfo } =
    usePresenterStore();

  useEffect(() => {
    // 빈배열인지 아닌지부터 먼저 검사
    if (
      Array.isArray(balanceGamePeopleChoiceInfo) &&
      balanceGamePeopleChoiceInfo.length > 0
    ) {
      balanceGamePeopleChoiceInfo.forEach((info) => {
        const connectionId = Object.keys(connectionInfo).find(
          (key) => parseInt(connectionInfo[key].memberId, 10) === info.memberId
        );

        if (connectionId) {
          const color = info.choice === "FIRST" ? "cornflowerblue" : "salmon";
          changeBackgroundColor(connectionId, color);
        }
      });
    }

    return () => {
      resetBalanceGamePeopleChoiceInfo();
    };
  }, [balanceGamePeopleChoiceInfo, connectionInfo]);

  // =====================================================================================================

  // 모션인식 관련 내용
  useEffect(() => {
    if (publisher && videoRef.current) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher]);

  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [predictionResults, setPredictionResults] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const THRESHOLD = 0.75; // 임계치 값

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

  const {
    finalResult,
    setFinalResult,
    startPredictionFlag,
    setStartPredictionFlag,
  } = useGameStore();

  const determineResult = (predictions) => {
    if (predictions.length > 0) {
      const highestPrediction = predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      const highestClass = highestPrediction.className;
      const highestProb = highestPrediction.probability;

      if (highestProb >= THRESHOLD) {
        if (highestClass === "O") {
          return "O";
        } else if (highestClass === "X") {
          return "X";
        }
      }
    }
    return "N"; // 임계값에 도달하지 않으면 중립 결과 반환
  };

  const predictionTimeoutRef = useRef(null); // Ref to store the timeout ID

  const startPrediction = () => {
    let lastResult = "N";
    let startTime = Date.now();

    const loop = async () => {
      if (model && videoRef.current) {
        const predictions = await model.predict(videoRef.current);
        lastResult = determineResult(predictions);
        console.log("Current Result: ", lastResult);
      }

      // 5초가 경과했는지 확인
      if (Date.now() - startTime < 5000) {
        predictionTimeoutRef.current = requestAnimationFrame(loop);
      } else {
        console.log("[*] 5초 경과, 루프를 멈추고 결과를 저장");
        await setFinalResult(lastResult); // 최종 결과 저장
        // 최종 결과가 정해지면 pub해서 결과를 넘겨주기
        setStartPredictionFlag(false); // 모션 인식 중지
        cancelAnimationFrame(predictionTimeoutRef.current); // 루프 중지
      }
    };
    // Start the prediction loop
    loop();
  };

  let cnt = 0;
  useEffect(() => {
    cnt = cnt++;
    // finalResult가 있고 바뀐거면 결과를 pub 한다.
    if (finalResult) {
      webSocketService.sendGuessMeSelection(roomId, memberId, finalResult);
    }
    console.log(`최종 결과 ${cnt}`, finalResult);
  }, [finalResult]);

  useEffect(() => {
    if (startPredictionFlag) {
      startPrediction();
    }
  }, [startPredictionFlag]);

  return (
    <div>
      <button
        className="text-xl bg-blue-500 text-white px-4 py-2 rounded-sm"
        onClick={() => handleChangeMask("/Mask/fox/fox.glb")}
      >
        여우가면
      </button>
      <button
        className="text-xl bg-blue-500 text-white px-4 py-2 rounded-sm"
        onClick={() => handleChangeMask("")}
      >
        벗기기
      </button>
      <div className="video-wrapper" style={{ position: "relative" }}>
        {/* 웹캠 영상을 보여주는 비디오 요소 */}
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ width: "100%", zIndex: 1 }}
          id="local-video-undefined"
        />

        {/* AR 처리를 위한 캔버스 */}
        <canvas
          ref={outputCanvasRef}
          width={videoWidth}
          height={videoHeight}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
            display: "none",
            border: "10px solid",
          }}
        />

        {/* Three.js를 사용한 AR 모델 렌더링 */}
        <Canvas
          onCreated={({ gl }) => {
            setGL(gl); // GL 컨텍스트 설정
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 3, // Three.js 캔버스가 가장 위에 렌더링되도록 설정
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[1, 1, 1]} />
          <pointLight position={[-1, 0, 1]} />
          {isgltfUrl && <Model url={gltfUrl} targetSize={targetSize} />}
        </Canvas>
      </div>
      {subscribers.map((sub, index) => (
        <div key={index} className="video-wrapper">
          <video
            autoPlay={true}
            ref={(video) => video && sub.addVideoElement(video)}
          />
        </div>
      ))}
      {/* Chatbox */}
      <div className="h-full rounded-[20px] flex flex-col justify-center items-center overflow-hidden min-w-[230px]">
        <Chatbox />
      </div>
    </div>
  );
};

export default MiddleDiv;
