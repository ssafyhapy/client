//
// import React from "react";

// const SelectMask = ({ setGltfUrl, setIsGltfUrl }) => {
//   const handleMaskChange = (url) => {
//     setIsGltfUrl(!!url);
//     setGltfUrl(url);
//   };

//   return (
//     <div className="mask-selector">
//       <button onClick={() => handleMaskChange("/mask/fox/fox.glb")}>
//         여우 가면
//       </button>
//       <button onClick={() => handleMaskChange("/mask/catwoman_mask/scene.glb")}>
//         고양이 가면
//       </button>
//       <button onClick={() => handleMaskChange("/mask/party_mask/party_mask_1.glb")}>
//         파티 가면
//       </button>
//       <button onClick={() => handleMaskChange("")}>
//         가면 벗기기
//       </button>
//     </div>
//   );
// };

// export default SelectMask;

import React from "react";
import useGameStore from "../../store/useGameStore";

const SelectMask = ({ handleCloseModal }) => {
  const setGltfUrl = useGameStore((state) => state.setGltfUrl);
  const setIsGltfUrl = useGameStore((state) => state.setIsGltfUrl);

  const handleMaskChange = (url) => {
    setIsGltfUrl(!!url);
    setGltfUrl(url);
    if (publisher) {
      const canvasElement = document.getElementById("publisher");
      if (canvasElement) {
          const newVideoTrack = canvasElement.captureStream(30).getVideoTracks()[0];

          // 퍼블리셔의 비디오 트랙을 캔버스 스트림으로 교체
          publisher.replaceTrack(newVideoTrack).then(() => {
              console.log("Video track replaced successfully");
          }).catch(error => {
              console.error("Error replacing video track:", error);
          });
      }
  }
    handleCloseModal(); // 선택 후 모달 닫기
  };

  return (
    <div className="mask-selector flex flex-col justify-center items-center">
      <div>
        <button onClick={() => handleMaskChange("/mask/fox/fox.glb")}>
          여우 가면
        </button>
      </div>
      <div>
        <button
          onClick={() => handleMaskChange("/mask/catwoman_mask/scene.glb")}
        >
          고양이 가면
        </button>
      </div>
      <div>
        <button
          onClick={() => handleMaskChange("/mask/party_mask/party_mask_1.glb")}
        >
          파티 가면
        </button>
      </div>
      <div>
        <button onClick={() => handleMaskChange("")}>가면 벗기기</button>
      </div>
    </div>
  );
};

export default SelectMask;
