import React from "react";

const RightBtn = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 85 94"
      fill="none"
    >
      <g filter="url(#filter0_d_20_2753)">
        <path
          d="M52.2327 43.1215C54.6921 45.1223 54.6921 48.8777 52.2327 50.8785L38.5437 62.0156C35.2767 64.6735 30.3882 62.3487 30.3882 58.137L30.3882 35.863C30.3882 31.6513 35.2767 29.3265 38.5437 31.9844L52.2327 43.1215Z"
          fill="#9400d3b0"
          fillOpacity="0.8"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_20_2753"
          x="0.388672"
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
            result="effect1_dropShadow_20_2753"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_20_2753"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RightBtn;
