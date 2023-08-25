import {reviewProps} from '../../types/reviewType';

export const checkEnrolledClass = (
  enrolledArr: string[],
  localUserId: string,
) => {
  const bool = enrolledArr.filter(student => {
    return student == localUserId;
  });
  return bool.length;
};

export const checkClassTeacher = (teacherId: string, localUserId: string) => {
  const isTeacher = teacherId == localUserId;
  return isTeacher;
};

export const checkIsCompleted = (classEndsAt: string) => {
  const date = new Date();
  const classEndingDate = classEndsAt;
  const ISOstring = new Date(classEndingDate);
  return date > ISOstring;
};

export const checkIsReviewed = (
  reviews: reviewProps[],
  localUserId: string,
) => {
  let hasReviewed = false;
  reviews.forEach(element => {
    if (element.user._id == localUserId) {
      hasReviewed = true;
    }
  });

  return hasReviewed;
};
