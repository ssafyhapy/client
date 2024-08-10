import { useState, useEffect, useRef } from "react";
import { Euler, Vector3, Matrix4 } from "three";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// AR 처리에 필요한 초기 상태 설정
let faceLandmarker;
let lastVideoTime = -1;

let rotation = new Euler(0, 0, 0);
let position = new Vector3(0, 0, 0);
let noseY = -1;
let noseX = -1;

let faceWidth = 1;

export const useAR = (videoRef, canvasRef) => {
  const [gltfUrl, setGltfUrl] = useState("");
  const [isGltfUrl, setIsGltfUrl] = useState(false);
  const [size, setSize] = useState(720);
  const [verticalPosition, setVerticalPosition] = useState(0);
  const [horizontalPosition, setHorizontalPosition] = useState(0);

  useEffect(() => {
    const setupAR = async () => {
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

      const video = videoRef.current;
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 1280, height: 720 },
        })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
          video.addEventListener("loadeddata", predict);
        })
        .catch((err) => console.error("Error accessing media devices.", err));
    };

    const predict = () => {
      const video = videoRef.current;
      if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
        requestAnimationFrame(predict);
        return;
      }

      const nowInMs = Date.now();
      if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        const result = faceLandmarker.detectForVideo(video, nowInMs);

        if (result.faceLandmarks && result.faceLandmarks.length > 0) {
          const matrix = result.facialTransformationMatrixes[0];
          rotation.setFromRotationMatrix(new Matrix4().fromArray(matrix.data));

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

    const drawLandmarks = (landmarks) => {
      const canvas = canvasRef.current;
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
      }
    };

    setupAR();
  }, [videoRef, canvasRef]);

  return {
    gltfUrl,
    setGltfUrl,
    isGltfUrl,
    setIsGltfUrl,
    size,
    setSize,
    verticalPosition,
    setVerticalPosition,
    horizontalPosition,
    setHorizontalPosition,
    rotation,
    position,
    faceWidth,
  };
};
