export const AppAsyncUserStorage = 'teachAndlearnUser';
import { Dimensions } from 'react-native';

export const DATA_LIMIT = 10;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS_ELEMENTS = {
  background: '#fffffe',
  button: '#3da9fc',
  headline: '#094067',
  paragraph: '#5f6c7b',
  buttonTxt : '#fffffe' ,
  grey:'#cdcdcd'
};
export const COLORS_ILLUSTRATION = {
  stroke: '#094067',
  main: '#fffffe',
  highlight: '#3da9fc',
  secondary: '#90b4ce', 
  tertiary : '#ef4565' ,
};

export const FONT_FAMILY = {
  NUNITO_REGULAR:'Nunito-Regular',
  NUNITO_ITALIC:'Nunito-Italic',
  NUNITO_BOLD:'Nunito-Bold',
  NUNITO_SEMIBOLD:'Nunito-SemiBold',
  NUNITO_SEMIBOLD_ITALIC:'Nunito-SemiBoldItalic',
  NUNITO_MEDIUM:'Nunito-Medium',
  NUNITO_MEDIUM_ITALIC:'Nunito-MediumItalic'
}

export { SCREEN_WIDTH, SCREEN_HEIGHT };


export const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

export const CARD_TYPE = {
  recommended:'recommended',
  createdByMe:'createdByMe',
  myLearnCards:'myLearnCards',
  unReviewedClasses:'unReviewedClasses',
  upcomingClasses:'upcomingClasses',
  risingRequest:'risingRequest'
}

export const emailValidation =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;