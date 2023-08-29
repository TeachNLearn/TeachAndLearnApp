import React from "react";
import Svg, { Path } from "react-native-svg";

interface SvgComponentProps {
  width?: number;
  height?: number;
  fill?: string;
}

const BookClasedSvg: React.FC<SvgComponentProps> = ({
  width = 20,
  height = 20,
  fill = "#9695A5",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.037 16.043c.038.469.12.9.326 1.304.32.627.83 1.137 1.457 1.456.405.206.835.289 1.304.327.45.037 1.004.037 1.675.037h6.733c.44 0 .818 0 1.13-.026.33-.027.658-.086.973-.247a2.5 2.5 0 001.093-1.092c.16-.316.22-.643.247-.973.022-.28.025-.613.025-.996V4.301c0-.439 0-.818-.025-1.13-.027-.33-.087-.657-.247-.973a2.5 2.5 0 00-1.093-1.092c-.315-.16-.643-.22-.972-.247-.313-.026-.691-.026-1.13-.026H7.798c-.67 0-1.224 0-1.675.037-.469.038-.9.12-1.304.327-.627.32-1.137.83-1.457 1.456-.206.405-.288.835-.326 1.304C3 4.407 3 4.96 3 5.632v8.736c0 .559-.009 1.118.037 1.675zm13.277.65c-.019.227-.05.31-.071.352a.833.833 0 01-.365.364c-.04.021-.125.053-.351.071-.236.02-.546.02-1.027.02H7.833c-.713 0-1.199 0-1.574-.031-.365-.03-.552-.084-.682-.15a1.667 1.667 0 01-.729-.729 1.484 1.484 0 01-.167-.974 1.667 1.667 0 011.652-1.45h10c0 .838.049 1.692-.02 2.527z"
        fill={fill}
      />
    </Svg>
  );
};

export default BookClasedSvg;
