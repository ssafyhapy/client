import React from "react";

const LeftBtn = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 84 94"
      fill="none"
    >
      <g filter="url(#filter0_d_20_2752)">
        <path
          d="M31.9431 50.8785C29.4837 48.8777 29.4837 45.1223 31.9431 43.1215L45.6321 31.9844C48.8991 29.3265 53.7876 31.6513 53.7876 35.863V58.137C53.7876 62.3487 48.8991 64.6735 45.6321 62.0156L31.9431 50.8785Z"
          fill="#9400d3b0"
          fillOpacity="0.8"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_20_2752"
          x="0.0976562"
          y="0.853516"
          width="83.6895"
          height="92.293"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_20_2752"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_20_2752"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LeftBtn;
