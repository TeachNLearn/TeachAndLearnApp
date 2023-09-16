import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CrossSvg = () => {
  return (
    <Svg width="10" height="9" viewBox="0 0 10 9" fill="none">
      <Path
        d="M9 0.5L1 8.5M1 0.5L9 8.5"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CrossSvg;
