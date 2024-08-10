// import React from "react";

// const SelectMask = ({ handleCloseModal }) => {
//   return (
//     <>
//       <div className="bg-[rgba(255,255,255,0.8)] shadow-[0_0_30px_rgba(66,72,81,0.2)] flex justify-center items-center flex-col w-[20rem] h-[20rem] z-10 rounded-[20px] relative">
//         <button
//           onClick={handleCloseModal}
//           className="absolute top-2 right-2 bg-[rgba(255,86,117,0.8)] rounded-[6px] p-1 w-[1.5rem] h-[1.5rem] flex justify-center items-center"
//         >
//           X
//         </button>
//         <p className="text-center"> 원하는 가면을 고르세요</p>
//         <div className="bg-custom-gradient-game bg-opacity-10 w-[80%] h-[80%] rounded-[20px]">
//           <div className="grid grid-cols-3 gap-4 bg-[rgba(255,255,255,0.4)] w-[100%] h-[100%] p-2 rounded-[20px]">
//             <div><button>가면1</button></div>
//             <div><button>가면2</button></div>
//             <div><button>가면3</button></div>
//             <div><button>가면4</button></div>
//             <div><button>가면5</button></div>
//             <div><button>가면6</button></div>
//             <div><button>가면7</button></div>
//             <div><button>가면8</button></div>
//             <div><button>가면9</button></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SelectMask;

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const ModelPreview = ({ url, onClick }) => {
  const { scene } = useGLTF(url);

  return (
    <div className="relative w-full h-full cursor-pointer" onClick={onClick}>
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
      </Canvas>
    </div>
  );
};

const SelectMask = ({ handleCloseModal, handleChangeMask }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] shadow-[0_0_30px_rgba(66,72,81,0.2)] flex justify-center items-center flex-col w-[20rem] h-[20rem] z-10 rounded-[20px] relative">
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 bg-[rgba(255,86,117,0.8)] rounded-[6px] p-1 w-[1.5rem] h-[1.5rem] flex justify-center items-center"
      >
        X
      </button>
      <p className="text-center"> 원하는 가면을 고르세요</p>
      <div className="bg-custom-gradient-game bg-opacity-10 w-[80%] h-[80%] rounded-[20px]">
        <div className="grid grid-cols-3 gap-4 bg-[rgba(255,255,255,0.4)] w-[100%] h-[100%] p-2 rounded-[20px]">
          <div>
            <ModelPreview
              url="/Mask/fox/fox.glb"
              onClick={() => handleChangeMask("/Mask/fox/fox.glb")}
            />
          </div>
          <div>
            <ModelPreview
              url="/Mask/catwoman_mask/scene.glb"
              onClick={() => handleChangeMask("/Mask/catwoman_mask/scene.glb")}
            />
          </div>
          <div>
            <ModelPreview
              url="/Mask/party_mask/party_mask_1.glb"
              onClick={() =>
                handleChangeMask("/Mask/party_mask/party_mask_1.glb")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectMask;
