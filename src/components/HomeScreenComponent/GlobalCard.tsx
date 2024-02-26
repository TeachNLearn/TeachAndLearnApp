import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import SvgImg from '../svgComponents/InterestedSvg';
import CoinSvg from '../svgComponents/CoinsSvg';
import {
  getReadableDate,
  getReadableTime,
  getReadableTime2,
} from '../../utils/helperFunctions';
import {CARD_TYPE, FONT_FAMILY, SCREEN_WIDTH} from '../../utils/globalContants';
import SkeletonLoder from '../general-components/SkeletonLoder';
import SkeletonLoaderHorizontalWithReanimatedGradient from '../../screens/extraScreens/skeletonUi/Skeleton';

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

  date: string;
  classStartsAt: string;
  classEndsAt: string;
  tags: string[];

  // Add more properties as needed
}

interface GlobalCardsProps {
  ReItem: RecommendedCourse;
  props: any;
  isLoading: boolean;
}

const GlobalCard: React.FC<GlobalCardsProps> = ({
  ReItem,
  props,
  isLoading,

}) => {
  return (
    <>
      {isLoading ? (
          <View style={[styles.loader]}>
            <View style={{alignSelf: 'center'}}>
              <SkeletonLoaderHorizontalWithReanimatedGradient
                width={SCREEN_WIDTH / 1.3}
                height={15}
              />
              <SkeletonLoaderHorizontalWithReanimatedGradient
                width={SCREEN_WIDTH / 1.5}
                height={15}
              />
              <SkeletonLoaderHorizontalWithReanimatedGradient
                width={SCREEN_WIDTH / 1.7}
                height={15}
              />
              <SkeletonLoaderHorizontalWithReanimatedGradient
                width={SCREEN_WIDTH / 1.4}
                height={15}
              />
              <SkeletonLoaderHorizontalWithReanimatedGradient
                width={SCREEN_WIDTH / 1.4}
                height={15}
              />
            </View>
        </View>
      ) : (
       <ScrollView>
         <Pressable
          onPress={() => props.navigation.navigate('SingleClassroom',{
            id:ReItem?._id,
            props:props
          })}
          style={styles.Learningcards}>
          <View style={styles.cardTxtContainer}>
            <Text style={styles.cardHead}>{ReItem.subject}</Text>
            <Text style={styles.cardDesc}>
              {ReItem.topic.length > 60
                ? `${ReItem.topic.substring(0, 60)}...`
                : ReItem.topic}
            </Text>
          </View>

          <View style={styles.ImgAndNameContainer}>
            <Image
              source={{uri: ReItem.createdBy === null?'':ReItem.createdBy.photo}}
              style={{height: 18, width: 18, borderRadius: 50}}
            />
            <Text style={styles.NameInCard}>{ReItem.createdBy === null ?'':ReItem.createdBy.userName}</Text>
          </View>

          <View style={styles.InterestedStudentConatiner}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgImg />
              <Text style={styles.Interested}>
                {'   '}
                {ReItem.length} interested
              </Text>
            </View>
            <Text style={styles.coins}>
              {ReItem.date ? getReadableDate(ReItem.date) : ''}{' '}
              {ReItem.classStartsAt && ReItem.classEndsAt
                ? `${getReadableTime2(
                    ReItem.classStartsAt,
                  )} - ${getReadableTime2(ReItem.classEndsAt)}`
                : ''}
            </Text>
          </View>

          <View style={styles.tagsContainer}>
            {ReItem.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </Pressable>
       </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Learningcards: {
    width: 280,
    height: 230,
    backgroundColor: '#094067',
    borderRadius: 16,
    marginTop: 20,
    marginRight: 10, // Space between cards
    marginLeft: 20, // Space between cards
  },

  cardTxtContainer: {
    marginLeft: 10,
  },

  cardHead: {
    color: '#ef4565',
    fontSize: 12,
    // fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    marginTop: 20,
    marginLeft: 10,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },

  cardDesc: {
    color: '#FFF',
    fontSize: 19,
    // fontWeight: '700',
    padding: 0,
    lineHeight: 28,
    margin: 10,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },

  ImgAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 17,
    // marginTop: 4,
  },

  NameInCard: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 10,
    fontFamily: FONT_FAMILY.NUNITO_BOLD,
  },

  InterestedStudentConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
    marginLeft: 20,
    marginRight: 16,
  },

  Interested: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 12,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },

  coins: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 13,
    marginLeft: 18,
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
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },
  loader:{
    backgroundColor: '#094067',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',     
    rowGap: 14,
    marginTop:20,
    height:230,
    width:280,
    marginLeft:20,
    marginRight:10
  }
});

export default GlobalCard;

