import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CopySvg = () => {
  return (
    <Svg height={16} width={16} viewBox="0 0 512 512">
      <Path
        d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
        fill="#ffffff"
      />
    </Svg>
  );
};

export default CopySvg;
