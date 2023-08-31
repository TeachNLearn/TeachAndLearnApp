import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface PlusSvgProps extends SvgProps {
  color?: string; // New prop to indicate active state
}

const PlusSvg: React.FC<PlusSvgProps> = ({color}) => {
  return (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
      <Path
        d="M8 1.5V15.5M1 8.5H15"
        stroke={color || '#475467'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default PlusSvg;
