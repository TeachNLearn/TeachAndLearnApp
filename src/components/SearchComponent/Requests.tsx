import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconS from 'react-native-vector-icons/FontAwesome5';
import IconSe from 'react-native-vector-icons/MaterialCommunityIcons';
import InterestedSvgImg from '../SVGComponents/InterestedSvg' ;
import CoinSvgImg from '../SVGComponents/CoinsSvg' ;

const Requests = () => {
  return (
    //  <ScrollView style={styles.scrollViewContent}>
       <View style={styles.LearningcardContainer}>
         
         
         <View style={styles.Learningcards}>
           <View style={styles.cardTxtContainer}>
          
            <Text style={styles.cardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.ImgAndNameContainer}>
            <Text style={styles.ImgInCard}><IconS name="user-circle" size={14} color="orange"/></Text>
            <Text style={styles.NameInCard}>Priyanshu Joshi</Text>
            </View>

            <View style={styles.InterestedStudentConatiner}>
            <Text style={styles.Interested}><InterestedSvgImg/> 22 interested</Text>
            <Text style={styles.coins}><CoinSvgImg/> 220 coins</Text>
            </View>

         
        </View>
        <View style={styles.Learningcards}>
           <View style={styles.cardTxtContainer}>
           
            <Text style={styles.cardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.ImgAndNameContainer}>
            <Text style={styles.ImgInCard}><IconS name="user-circle" size={14} color="orange"/></Text>
            <Text style={styles.NameInCard}>Priyanshu Joshi</Text>
            </View>

            <View style={styles.InterestedStudentConatiner}>
            <Text style={styles.Interested}><InterestedSvgImg/> 22 interested</Text>
            <Text style={styles.coins}><CoinSvgImg/> 220 coins</Text>
            </View>
        </View>
        <View style={styles.Learningcards}>
           <View style={styles.cardTxtContainer}>
           
            <Text style={styles.cardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.ImgAndNameContainer}>
            <Text style={styles.ImgInCard}><IconS name="user-circle" size={14} color="orange"/></Text>
            <Text style={styles.NameInCard}>Priyanshu Joshi</Text>
            </View>

            <View style={styles.InterestedStudentConatiner}>
            <Text style={styles.Interested}><IconS name="bolt" size={14} color="#FFD465"/> 22 interested</Text>
            <Text style={styles.coins}>icon 220 coins</Text>
            </View>
        </View>
        <View style={styles.Learningcards}>
           <View style={styles.cardTxtContainer}>
           
            <Text style={styles.cardDesc}>Get started in App Development and get selected in MH Fellowsip</Text>
            </View>

            <View style={styles.ImgAndNameContainer}>
            <Text style={styles.ImgInCard}><IconS name="user-circle" size={14} color="orange"/></Text>
            <Text style={styles.NameInCard}>Priyanshu Joshi</Text>
            </View>

            <View style={styles.InterestedStudentConatiner}>
            <Text style={styles.Interested}><IconS name="bolt" size={14} color="#FFD465"/> 22 interested</Text>
            <Text style={styles.coins}>icon 220 coins</Text>
            </View>
        </View>
     
          
     </View>


     
  )
}

const styles = StyleSheet.create({
  //  scrollViewContent: {
  //   flexGrow: 1, // Ensures that the content can scroll
  //   paddingBottom: 20,
  //    // Add padding to the bottom to prevent cutoff
  // },
  
 LearningcardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height:1000 ,
    marginBottom:380 ,
    
    // marginTop:90 ,
  },
  Learningcards: {
    width: 340,
    height: 150,
    backgroundColor: '#FFF',
    elevation:6 ,
    borderRadius: 16,
    marginTop: 30,
    marginRight: 0, // Space between cards
     // Space between cards
  },

  

  cardDesc:{
 color:'#000',
fontSize:18 ,
fontWeight:'700',
padding:0 ,
margin:10 ,
fontFamily:'Nunito',
  },

  cardTxtContainer:{
    marginLeft:10 ,
  },

  ImgAndNameContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:15 ,
  },

  ImgInCard:{
    color:'#FFF',
    marginLeft:5 ,
    marginRight:5 ,
  },

  NameInCard:{
    color:'#000',
    fontSize:12 ,
    fontWeight:'400' ,
  } ,

  InterestedStudentConatiner:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:15 ,
    margin:20 ,
  },

  Interested:{
  color:'#000',
  fontSize:12 ,
  fontWeight:'500' ,
  },

  coins:{
  color:'#000',
  fontSize:12 ,
  fontWeight:'500' ,
  },

}) ;

export default Requests ;