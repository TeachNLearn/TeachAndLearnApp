import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import {AuthContext} from '../../store/auth-context';
import {userDataType} from '../../types/userDataType';
import UserChip from '../general-components/UserChip';
import SvgComponent from '../svgComponents/InterestedSvg';
import {getReadableDate, getReadableTime} from '../../utils/helperFunctions';
import ClassCardBtn from './ClassCardBtn';
import {checkClassTeacher, checkEnrolledClass} from './classFunctions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/globalContants';
import CardTags from '../general-components/CardTags';

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

  type RootStackParamList = {
    ClassOverview: {
      id: string;
      elemType: string | undefined;
      learnCardId: string | undefined;
    };
    SingleClassroom: {
      id: string;
      elemType: string | undefined;
      learnCardId: string | undefined;
    };
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const classNavigator = () => {
    if (checkClassTeacher(props.teachCard.createdBy._id, localUser._id)) {
      navigation.navigate('SingleClassroom', {
        id: props.teachCard._id,
        elemType: props.elemType,
        learnCardId: props.learnCardId,
      });
    } else {
      if (checkEnrolledClass(props.teachCard.studentsEnrolled, localUser._id)) {
        navigation.navigate('SingleClassroom', {
          id: props.teachCard._id,
          elemType: props.elemType,
          learnCardId: props.learnCardId,
        });
      } else {
        navigation.navigate('ClassOverview', {
          id: props.teachCard._id,
          elemType: props.elemType,
          learnCardId: props.learnCardId,
        });
      }
    }
  };

  return (
    props.teachCard && (
      <Pressable style={styles.container}>
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
            imgSize={30}
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
        <CardTags tags={props.teachCard.tags} />
        <ClassCardBtn
          localUserId={localUser._id}
          teacherId={props.teachCard.createdBy._id}
          enrolledArr={props.teachCard.studentsEnrolled}
          classEndsAt={props.teachCard.classEndsAt}
          hasCancelled={props.teachCard.hasCancelled}
          reviews={props.teachCard.reviews}
          onPressFunc={classNavigator}
        />
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#094067',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 14,
    cursor: 'pointer',
  },
  subject: {
    color: '#ef4565',
    fontSize: 19,
    lineHeight: 27,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    letterSpacing: 0.02,
  },
  title: {
    fontWeight: '600',
    fontSize: 23,
    color: '#d8eefe',
    fontStyle: 'normal',
    lineHeight: 28,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
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
    fontSize: 16,
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },
});

export default ClassroomCard;
