import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface SvgComponentProps {
  width?: number;
  height?: number;
  fill?: string;
}

const DocUploadSvg: React.FC<SvgComponentProps> = ({
  width = 24,
  height = 24,
  fill = "none",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
      <Path
        d="M21.152 10.9l-9.015 9.015a5.25 5.25 0 01-7.425-7.424l9.016-9.016a3.5 3.5 0 114.95 4.95l-8.662 8.662a1.75 1.75 0 01-2.475-2.475l7.601-7.602"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DocUploadSvg;
