import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface SvgComponentProps {
  width?: number;
  height?: number;
  fill?: string;
}

const SvgComponent: React.FC<SvgComponentProps> = ({
  width = 14,
  height = 14,
  fill = "#FFD465",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
    >
      <Path
        d="M8.162 1.24A.583.583 0 007.135.792l-5.209 6.25c-.09.109-.18.218-.247.314a.914.914 0 00-.181.505.875.875 0 00.325.694.914.914 0 00.503.184c.117.01.259.01.4.01h3.613l-.501 4.011a.583.583 0 001.027.446l5.209-6.25c.09-.109.18-.218.247-.314a.914.914 0 00.181-.505.875.875 0 00-.325-.694.914.914 0 00-.503-.183c-.116-.011-.259-.011-.4-.011H7.662l.501-4.01z"
        fill={fill}
      />
    </Svg>
  );
};

export default SvgComponent;
