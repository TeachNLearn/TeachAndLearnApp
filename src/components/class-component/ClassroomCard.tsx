import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import {AuthContext} from '../../store/auth-context';
import {userProps} from '../../types/UserTypes';
import {userDataType} from '../../types/userDataType';
import UserChip from '../general-components/UserChip';
import SvgComponent from '../SVGComponents/InterestedSvg';
import {getReadableDate, getReadableTime} from '../../utils/helperFunctions';
import ArrowIcon from '../SVGComponents/ArrowIcon';
import ClassCardBtn from './ClassCardBtn';

interface classCardProps {
  teachCard: teachingCardProps;
  elemType?: string;
  fromLearnCard?: boolean;
  learnCardId?: string;
}

const ClassroomCard = (props: classCardProps) => {
  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState<string>(authCtx.token);
  const [localUser, setLocalUser] = useState<userDataType>(authCtx.user);

  // const checkEnrolledClass = () => {
  //   if (localUser) {
  //     // console.log(props.teachCard.studentsEnrolled);
  //     const bool = props.teachCard.studentsEnrolled.filter(student => {
  //       return student == localUser._id;
  //     });
  //     // console.log(bool);
  //     return bool.length;
  //   } else {
  //     return null;
  //   }
  // };

  // const checkClassTeacher = () => {
  //   if (localUser) {
  //     const isTeacher = props.teachCard.createdBy._id == localUser._id;
  //     return isTeacher;
  //   } else {
  //     return null;
  //   }
  // };

  // const checkIsCompleted = () => {
  //   const date = new Date();
  //   const classEndingDate = props.teachCard.classEndsAt;
  //   const ISOstring = new Date(classEndingDate);
  //   return date > ISOstring;
  // };

  // const checkIsReviewed = () => {
  //   const userId = localUser?._id;
  //   const reviews = props.teachCard.reviews;

  //   let hasReviewed = false;

  //   // console.log(reviews);
  //   reviews.forEach(element => {
  //     if (element.user._id == userId) {
  //       hasReviewed = true;
  //     }
  //   });

  //   return hasReviewed;
  // };

  return (
    props.teachCard && (
      <View style={styles.container}>
        <View>
          <Text style={styles.subject}>{props.teachCard.subject}</Text>
        </View>
        <View>
          <Text style={styles.title}>
            {props.teachCard.topic.length > 52
              ? props.teachCard.topic.slice(0, 52) + '...'
              : props.teachCard.topic}
          </Text>
        </View>
        <View>
          <UserChip
            name={props.teachCard.createdBy.userName}
            photo={props.teachCard.createdBy.photo}
            imgBorder="#ffffff"
            textColor="#ffffff"
            userId={props.teachCard.createdBy._id}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <SvgComponent />
            <Text style={styles.statText}>
              {props.teachCard.studentsEnrolled.length}
            </Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statText}>
              {getReadableDate(props.teachCard.date) +
                ', ' +
                getReadableTime(props.teachCard.classStartsAt) +
                ' - ' +
                getReadableTime(props.teachCard.classEndsAt)}
            </Text>
          </View>
        </View>
        <ClassCardBtn
          localUserId={localUser._id}
          teacherId={props.teachCard.createdBy._id}
          enrolledArr={props.teachCard.studentsEnrolled}
          classEndsAt={props.teachCard.classEndsAt}
          hasCancelled={props.teachCard.hasCancelled}
          reviews={props.teachCard.reviews}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: '#094067',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 22,
    rowGap: 16,
  },
  subject: {
    color: '#ef4565',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.02,
  },
  title: {
    fontWeight: '700',
    color: '#d8eefe',
    fontSize: 22,
    lineHeight: 32,
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 4,
  },
  statText: {
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
    textTransform: 'capitalize',
  },
});

export default ClassroomCard;
