import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconS from 'react-native-vector-icons/FontAwesome5';
import {getReadableDate, getReadableTime, getReadableTime2} from '../../utils/helperFunctions';
interface UpcomingCardsProps {
  item: PopularCourse; // Assuming this component receives a 'PopularCourse' as a prop
}

interface PopularCourse {
  subject: string;
  topic: string;
  interested: number;
  coins: number;
  length: number;
  date:string
  classStartsAt:string ;
  classEndsAt:string ;
  dueDate: string;
  createdBy: {
    userName: string;
    photo: string;
  };
  tags: string[];
}

const UpcomingCards: React.FC<UpcomingCardsProps> = ({ item }) => {
  return (
    <View style={styles.Upcomingcards}>
      <View style={styles.cardTxtContainer}>
        <View
          style={{
            backgroundColor: '#094067',
            width: '100%',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            borderRadius: 30,
          }}>
          <Text style={styles.UpcomingCardDate}>
            <IconS name="calendar-week" size={14} color="#FFF" /> {getReadableTime2(item.classStartsAt)} { getReadableTime2(item.classEndsAt)}
          </Text>
        </View>

        <Text style={styles.UpComingCardDesc}>{item.topic}</Text>
      </View>

      <View style={styles.UpcomingCardTimeAndNameContainer}>
        <Text style={styles.UpcomingCardName}>
          <IconS name="user-circle" size={14} color="#094067" />{' '}
          {item.createdBy.userName}
        </Text>
        <Text style={styles.UpcomingCardTime}>{getReadableDate(item.date)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Upcomingcards: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 190,
    backgroundColor: '#D8EEFE',
    borderRadius: 16,
    marginTop: 13,
    marginBottom: 10,
    paddingRight: 30,
    paddingTop: 10,
  },

  cardTxtContainer: {
    marginLeft: 10,
  },
  UpcomingcardsParentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  UpcomingCardTimeAndNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },

  UpComingCardDesc: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Nunito',
  },

  UpcomingCardDate: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Nunito',
  },

  UpcomingCardName: {
    marginRight: 20,
    // fontSize:15 ,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Nunito',
  },
  UpcomingCardTime: {
    marginLeft: 20,
    //  fontSize:10 ,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Nunito',
  },
});

export default UpcomingCards;
