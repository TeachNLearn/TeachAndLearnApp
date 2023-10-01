import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import SvgImgInterested from '../svgComponents/InterestedSvg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {learnCardProps} from '../../types/learnCardType';
import {getReadableDate, getReadableTime} from '../../utils/helperFunctions';
import { FONT_FAMILY } from '../../utils/globalContants';

// interface LearnCardProps {
//   card: {
//     subject: string;
//     topic: string;
//     createdBy: {
//       photo: string;
//       userName: string;
//     };
//     interestedStudents: string[]; // You can replace this with the actual type
//     dueDate: string;
//   };
// }

const LearnCardData: React.FC<learnCardProps> = props => {
  type RootStackParamList = {
    LearnCardOverview: {id: string; backLink: string | undefined};
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const learnCardOverview = () => {
    navigation.navigate('LearnCardOverview', {
      id: props._id,
      backLink: 'LearnCards',
    });
  };

  return (
    <Pressable onPress={learnCardOverview}>
      <View style={styles.learnCard}>
        <Text
          style={{
            color: '#ef4565',
            marginBottom: 10,
            textTransform: 'capitalize',
            fontSize: 16,
            fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD
          }}>
          {props.subject}
        </Text>
        <Text
          style={{
            color: '#d8eefe',
            fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
            fontSize: 19,
            // fontWeight: '700',
            lineHeight: 25,
          }}>
          {props.topic.length > 47
            ? `${props.topic.substring(0, 47)}...`
            : props.topic}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 17, marginBottom: 15}}>
          <Image
            source={{uri: props.createdBy.photo}}
            width={20}
            height={20}
            style={{borderRadius: 20}}
          />
          <Text style={{color: '#d8eefe',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>
            {'  '}
            {props.createdBy.userName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgImgInterested />
            <Text style={{color: '#d8eefe',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>
              {'  '}
              {props?.isTeachCard ? props.studentsEnrolled.length :props.interestedStudents.length} Interested
            </Text>
          </View>
          {
            props?.isTeachCard === true ?
            <>
               <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#d8eefe',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>
              {getReadableDate(props.date)},{' '}
              {getReadableTime(props.classStartsAt)} -{' '}
              {getReadableTime(props.classEndsAt)}
                </Text>
              </View>
            </>
            :
            <>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#FFF',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD}}>
              Due - {getReadableDate(props.dueDate)}
            </Text>
          </View>
            </>
          }
        
        </View>

        {
          props?.isTeachCard ?
          <>
             <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginLeft:5,flexWrap:'wrap'}}>
          {props?.tags.map((e, i) => {
            return (
              <>
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{e}</Text>
                </View>
              </>
            );
          })}
        </View>
          </>
          :
          null
        }
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  learnCard: {
    width: 330,
    height: 200,
    backgroundColor: '#094067',
    borderRadius: 16,
    elevation: 7,
    marginTop: 20,
    padding: 30,
  },
  tag: {
    backgroundColor: '#3da9fc',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '500',
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,
  },
});

export default LearnCardData;
