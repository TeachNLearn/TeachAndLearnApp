import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CoinSvg from '../SVGComponents/CoinsSvg';
import SvgImg from '../SVGComponents/InterestedSvg';
import {getReadableDate} from '../../utils/helperFunctions';

interface PopularCourse {
  subject: string;
  topic: string;
  interested: number;
  coins: number;
  length: number;
  dueDate: string;
  createdBy: {
    userName: string;
    photo: string;
  };

  tags:string[] ;

  // Add more properties as needed
}

interface PopularRequestProps {
  item: PopularCourse;
}

const PopularRequest: React.FC<PopularRequestProps> = ({ item }) => {
  return (
    <View style={styles.Learningcards}>
      <View style={styles.cardTxtContainer}>
        <Text style={styles.cardHead}>{item.subject}</Text>
        <Text style={styles.cardDesc}>
          {item.topic.length > 49 ? `${item.topic.substring(0, 49)}...` : item.topic}
        </Text>
      </View>

      <View style={styles.ImgAndNameContainer}>
        <Image source={{ uri: item.createdBy.photo }} style={{ height: 18, width: 18, borderRadius: 50 }} />
        <Text style={styles.NameInCard}>{item.createdBy.userName}</Text>
      </View>

      <View style={styles.InterestedStudentConatiner}>
        <Text style={styles.Interested}>
          <SvgImg />
          {'   '}
          {item.length} interested
        </Text>
        <Text style={styles.coins}>
         Due By- {getReadableDate(item.dueDate)}
        </Text>
      </View>
       <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Learningcards: {
    width: 280,
    height: 230,
    backgroundColor: '#094067',
    borderRadius: 16,
    marginTop: 30,
    marginRight: 10,
    marginLeft: 20,
    
  },

  cardTxtContainer: {
    marginLeft: 10,
  },

  cardHead: {
    color: '#ef4565',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    marginTop: 20,
    marginLeft: 10,
    fontFamily: 'Nunito',
  },

  cardDesc: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 0,
    lineHeight: 28,
    margin: 10,
    fontFamily: 'Nunito',
  },

  ImgAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 17,
    marginTop: 4,
  },

  NameInCard: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 10,
  },

  InterestedStudentConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
    marginLeft: 20,
    marginRight: 16,
  },

  Interested: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 12,
  },

  coins: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },

   tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 19,
    marginLeft:18 ,
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
    fontSize: 10,
    fontWeight: '500',
  },
});

export default PopularRequest;
