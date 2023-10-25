import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface UserprofileSvgProps extends SvgProps {
  width?: number;
  height?: number;
  fill?: string;
  active?: boolean; // New prop to indicate active state
}

const UserprofileSvg: React.FC<UserprofileSvgProps> = ({
  width = 20,
  height = 20,
  fill = "#9695A5",
  // active = false, // Default to inactive
  ...props
}) => {
  // const strokeColor = active ? "#FFF" : "#9695A5"; // Determine stroke color based on active state

  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M2.5 16.667c1.946-2.065 4.59-3.334 7.5-3.334s5.553 1.27 7.5 3.334M13.75 6.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default UserprofileSvg;
