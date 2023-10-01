import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import SvgImgInterested from '../svgComponents/InterestedSvg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {learnCardProps} from '../../types/learnCardType';
import {getReadableDate} from '../../utils/helperFunctions';
import {FONT_FAMILY} from '../../utils/globalContants';
import UserChip from '../general-components/UserChip';
import Tagbox from './Tagbox';
import CardTags from '../general-components/CardTags';

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
    <Pressable style={styles.container} onPress={learnCardOverview}>
      <View style={styles.learnCard}>
        <Text
          style={{
            color: '#ef4565',
            fontSize: 19,
            lineHeight: 27,
            fontWeight: '600',
            fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
          }}>
          {props.subject}
        </Text>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 23,
            color: '#d8eefe',
            fontStyle: 'normal',
            lineHeight: 28,
            fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
          }}>
          {props.topic.length > 47
            ? `${props.topic.substring(0, 47)}...`
            : props.topic}
        </Text>
        <UserChip
          imgBorder="#fff"
          name={props.createdBy.userName}
          photo={props.createdBy.photo}
          textColor="#fff"
          userId={props.createdBy._id}
          shouldntNavigate={true}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 4,
            }}>
            <SvgImgInterested />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 17,
                color: '#ffffff',
                fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                margin: 0,
              }}>
              {props.interestedStudents.length} Interested
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 17,
                color: '#ffffff',
                fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              }}>
              Due - {getReadableDate(props.dueDate)}
            </Text>
          </View>
        </View>
        <CardTags tags={props.tags} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#094067',
    borderRadius: 8,
    cursor: 'pointer',
    width: '100%',
  },
  learnCard: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    rowGap: 14,
  },
});

export default LearnCardData;
