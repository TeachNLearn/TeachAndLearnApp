import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

interface SvgComponentProps {
  width?: number;
  height?: number;
  fill?: string;
}

const CoinsSvg: React.FC<SvgComponentProps> = ({
  width = 14,
  height = 14,
  fill = "#fff",
}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
    >
      <G clipPath="url(#clip0_60_1587)">
        <Path
          opacity={0.12}
          d="M5.25 12.833a4.083 4.083 0 100-8.166 4.083 4.083 0 000 8.166z"
          fill={fill}
        />
        <Path
          d="M9.297 9.297a4.084 4.084 0 10-4.594-4.594m-.328 2.88L5.25 7v3.208m-.875 0h1.75M9.333 8.75a4.083 4.083 0 11-8.166 0 4.083 4.083 0 018.166 0z"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_60_1587">
          <Path fill={fill} d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CoinsSvg;
