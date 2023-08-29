import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import SvgImgInterested from '../SVGComponents/InterestedSvg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {learnCardProps} from '../../types/learnCardType';
import {getReadableDate} from '../../utils/helperFunctions';

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
    <TouchableOpacity onPress={learnCardOverview}>
      <View style={styles.learnCard}>
        <Text
          style={{
            color: '#ef4565',
            marginBottom: 10,
            textTransform: 'capitalize',
            fontSize: 16,
          }}>
          {props.subject}
        </Text>
        <Text
          style={{
            color: '#d8eefe',
            fontFamily: 'Nunito',
            fontSize: 18,
            fontWeight: '700',
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
          <Text style={{color: '#d8eefe'}}>
            {'  '}
            {props.createdBy.userName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgImgInterested />
            <Text style={{color: '#d8eefe'}}>
              {'  '}
              {props.interestedStudents.length} Interested
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#FFF'}}>
              Due - {getReadableDate(props.dueDate)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
});

export default LearnCardData;
