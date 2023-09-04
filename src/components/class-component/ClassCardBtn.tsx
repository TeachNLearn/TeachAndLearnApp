import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import ArrowIcon from '../svgComponents/ArrowIcon';
import {reviewProps} from '../../types/reviewType';
import {
  checkClassTeacher,
  checkEnrolledClass,
  checkIsCompleted,
  checkIsReviewed,
} from './classFunctions';

interface classCardBtnProps {
  hasCancelled: boolean;
  localUserId: string;
  teacherId: string;
  enrolledArr: string[];
  classEndsAt: string;
  reviews: reviewProps[];
  onPressFunc: () => void
}

const ClassCardBtn = (props: classCardBtnProps) => {
  return (
    <TouchableOpacity style={styles.enrollBtn} onPress={props.onPressFunc} >
      <View>
        <Text style={styles.enrollBtnText}>
          {props.hasCancelled
            ? 'Class Cancelled'
            : checkClassTeacher(props.teacherId, props.localUserId)
            ? 'Check Class'
            : checkEnrolledClass(props.enrolledArr, props.localUserId) == 1
            ? !checkIsCompleted(props.classEndsAt)
              ? 'Check Class'
              : checkIsReviewed(props.reviews, props.localUserId)
              ? 'Check Class'
              : 'Give Review'
            : checkIsCompleted(props.localUserId)
            ? 'Check Class'
            : 'Enroll Now'}
        </Text>
      </View>
      <ArrowIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statText: {
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
    textTransform: 'capitalize',
  },
  enrollBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 12,
    columnGap: 6,
    backgroundColor: '#ef4565',
    borderRadius: 4,
  },
  enrollBtnText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#ffffff',
  },
});

export default ClassCardBtn;
