import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SvgImg from '../SVGComponents/InterestedSvg';
import CoinSvg from '../SVGComponents/CoinsSvg';

interface RecommendedCourse {
  subject: string;
  topic: string;
  interested: number;
  coins: number;
  length: number;
  createdBy: {
    userName: string;
    photo: string;
  };
  // Add more properties as needed
}

interface RecommendedCardsProps {
  item: RecommendedCourse;
}

const RecommendedCards: React.FC<RecommendedCardsProps> = ({ item }) => {
  return (
    <View style={styles.Learningcards}>
      <View style={styles.cardTxtContainer}>
        <Text style={styles.cardHead}>{item.subject}</Text>
        <Text style={styles.cardDesc}>
          {item.topic.length > 60 ? `${item.topic.substring(0, 60)}...` : item.topic}
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
          {item.coins}
          <CoinSvg fill="#fff" />
          {'     '}
          250 coins
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Learningcards: {
    width: 260,
    height: 200,
    backgroundColor: '#094067',
    borderRadius: 16,
    marginTop: 30,
    marginRight: 10, // Space between cards
    marginLeft: 20, // Space between cards
  },

  cardTxtContainer: {
    marginLeft: 10,
  },

  cardHead: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '500',
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
});

export default RecommendedCards;
