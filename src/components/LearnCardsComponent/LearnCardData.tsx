import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SvgImgInterested from '../SVGComponents/InterestedSvg' ;

interface LearnCardProps {
  card: {
    subject: string;
    topic: string;
    createdBy: {
      photo: string;
      userName: string;
    };
    interestedStudents: string[]; // You can replace this with the actual type
    dueDate: string;
  };
}

const LearnCardData: React.FC<LearnCardProps> = ({ card }) => {
  return (
    <View style={styles.learnCard}>
                <Text
                  style={{
                    color: '#ef4565',
                    marginBottom: 10,
                    textTransform: 'capitalize',
                    fontSize: 16,
                  }}
                >
                  {card.subject}
                </Text>
                <Text
                  style={{
                    color: '#d8eefe',
                    fontFamily: 'Nunito',
                    fontSize: 18,
                    fontWeight: '700',
                    lineHeight: 25,
                  }}
                >
                  {card.topic.length > 47
                    ? `${card.topic.substring(0, 47)}...`
                    : card.topic}
                </Text>
                <View
                  style={{ flexDirection: 'row', marginTop: 17, marginBottom: 15 }}
                >
                  <Image
                    source={{ uri: card.createdBy.photo }}
                    width={20}
                    height={20}
                    style={{ borderRadius: 20 }}
                  />
                  <Text style={{ color: '#d8eefe' }}>
                    {'  '}{card.createdBy.userName}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgImgInterested />
                    <Text style={{ color: '#d8eefe' }}>
                      {'  '}{card.interestedStudents.length} Interested
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#FFF' }}>
                      Due - {new Date(card.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
  );
};

const styles = StyleSheet.create({
learnCard:{
width:'88%' ,
height:200 ,
backgroundColor:'#094067',
borderRadius:16 ,
elevation:7 ,
marginTop:20 ,
padding:30 ,


},
})

export default LearnCardData ;