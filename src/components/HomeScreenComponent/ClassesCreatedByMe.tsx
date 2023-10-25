import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { FONT_FAMILY } from '../../utils/globalContants'
import SvgImg from '../svgComponents/InterestedSvg';

const ClassesCreatedByMe = () => {
  return (
    <>
        <TouchableOpacity
        //   onPress={() => props.navigation.navigate('LearnCards')}
          style={styles.Learningcards}>
          <View style={styles.cardTxtContainer}>
            {/* <Text style={styles.cardHead}>{ReItem.subject}</Text> */}
            <Text style={styles.cardDesc}>
              {/* {ReItem.topic.length > 60
                ? `${ReItem.topic.substring(0, 60)}...`
                : ReItem.topic} */}
            </Text>
          </View>

          <View style={styles.ImgAndNameContainer}>
            {/* <Image
              source={{uri: ReItem.createdBy.photo}}
              style={{height: 18, width: 18, borderRadius: 50}}
            /> */}
            {/* <Text style={styles.NameInCard}>{ReItem.createdBy.userName}</Text> */}
          </View>

          <View style={styles.InterestedStudentConatiner}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgImg />
              <Text style={styles.Interested}>
                {'   '}
                {/* {ReItem.length} interested */}
              </Text>
            </View>
            <Text style={styles.coins}>
              {/* {ReItem.date ? getReadableDate(ReItem.date) : ''}{' '}
              {ReItem.classStartsAt && ReItem.classEndsAt
                ? `${getReadableTime2(
                    ReItem.classStartsAt,
                  )} - ${getReadableTime2(ReItem.classEndsAt)}`
                : ''} */}
            </Text>
          </View>

          <View style={styles.tagsContainer}>
            {/* {ReItem.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))} */}
          </View>
        </TouchableOpacity>
    </>
  )
}

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
      marginTop: 4,
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
      marginTop: 13,
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
      marginTop: 19,
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
export default ClassesCreatedByMe