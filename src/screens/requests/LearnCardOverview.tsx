import axios from 'axios';
import React, {useState, useContext, useEffect} from 'react';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {learnCardProps} from '../../types/learnCardType';
import {teachingCardProps} from '../../types/teachingCardType';
import {getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import Ionican from 'react-native-vector-icons/Ionicons';
import { Text, View , StyleSheet, ScrollView } from 'react-native';
import SvgComponentInterested from '../../components/SVGComponents/InterestedSvg';

const LearnCardOverview = () => {
  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState(authCtx.token);

  const [learnCard, setlearnCard] = useState<learnCardProps>();
  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>();

  const [totalInterestedStudents, setTotalInterestedStudents] =
    useState<number>();

  const [isLoading, setIsLoading] = useState(true);
  const [teachCardLoader, setTeachCardLoader] = useState(true);

  //   get id from navigatiiona ans set state
  const [learnCardId, setLearnCardId] = useState();

  async function fetchLearnCard() {
    await axios
      .get(`${BASE_URL}${apiVersion}/learn/${learnCardId}`)
      .then(({data}) => {
        // console.log(data.data.data);
        const cardData = data.data.data[0];
        console.log(cardData);
        setlearnCard(cardData);
        setIsLoading(false);
        setTotalInterestedStudents(cardData.interestedStudents.length);
      });
  }

  async function fetchTeachCardsOnLearnCard() {
    await axios
      .get(`${BASE_URL}${apiVersion}/learn/${learnCardId}/teach`)
      .then(({data}) => {
        // console.log(data.data.data);
        setTeachCards(data.data.data);
        setTeachCardLoader(false);
      });
  }

  const [isInterestedLoading, setisInterestedLoading] =
    useState<boolean>(false);

  const interestedHandler = async () => {
    setisInterestedLoading(true);
    await axios
      .patch(
        `${BASE_URL}${apiVersion}/learn/${learnCard?._id}/interested`,
        {},
        {
          headers: getHeaders(userToken),
        },
      )
      .then(({data}) => {
        console.log(data.updatedLearnCard.interestedStudents);
        const newInterestedStudents: string[] =
          data.updatedLearnCard.interestedStudents;
        setisInterestedLoading(false);
        if (learnCard) {
          const newLearnCard = learnCard;
          newLearnCard.interestedStudents = newInterestedStudents;
          setlearnCard(newLearnCard);
          setTotalInterestedStudents(newInterestedStudents.length);
        }
      });
  };

  return (
        <View style={{flex:1 }}>
      
            <View style={styles.learncardOverviewHeadConainer}>
                <Ionican name="arrow-back-sharp" size={20} color="#000" />
                <Text style ={styles.OverviewheadTxt}>Learn Cards Overiew</Text>
                <Ionican name="ellipsis-vertical-sharp" size={20} color="#000000" />
            </View>
         <ScrollView style={styles.scrollContainer}>
           <View style={styles.OverviewContainer}>
           

           
            <View style={{margin:30, }}>
                <Text style={{color:'#000' , fontFamily:'Nunito' , fontSize:22 , fontWeight:'700' ,lineHeight:30 , }}>Web Development Essentials - Crash Course from scratch</Text>
               <View style={{backgroundColor:'#094067' , padding:20 , width:'50%' , alignItems:'center' , marginTop:20 ,borderRadius:10}}>
                 <Text style={{color:'#FFF' , fontSize:15 , fontWeight:'600' , fontFamily:'Nunito' , }}>Due By- 24 Aug</Text>
               </View>
               <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center' ,marginTop:20 ,}}>
                  <View style={{flexDirection:'row' , alignItems:'center'}}>
                   <Text>Img</Text>
                    <Text style={{color:'#000' , fontFamily:'Nunito' , fontSize:18 , fontWeight:'500' , }}>  Drew Cano</Text>
              </View>
              <View style={{flexDirection:'row' , alignItems:'center'}}>
                <SvgComponentInterested/>
                <Text style={{color:'#000' , fontWeight:'500' , fontFamily:'Nunito' }}>20 Interested</Text>
              </View>
              
            </View>
            <Text style={{marginTop:20 ,color:'#000' , fontFamily:'Nunito'}}>For:-B.tech | 4th Year</Text>
            <Text style={{marginTop:20 ,color:'#000' ,fontFamily:'Nunito' , fontWeight:'400' , fontSize:16 }}>Lorem Lorem30 ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptas illum vel provident. Facilis repudiandae modi tempora illum accusantium molestiae animi. Dolor quam, repudiandae vitae veritatis maiores tenetur. Ipsa, ratione.</Text>

            <View style={{marginTop:20}}>
              <View style={{backgroundColor:'#ef4565' , padding:16 , width:'40%' , alignItems:'center' , borderRadius:10 , marginBottom:10 ,}}>
                <Text style={{color:'#FFF' , fontWeight:'700' , fontSize:16 ,letterSpacing:1 ,}}>Interested </Text>
              </View>
              <View style={{backgroundColor:'#094067' , padding:16 , width:'80%' , alignItems:'center' , borderRadius:10 ,}}>
                <Text style={{color:'#FFF' , fontWeight:'700' , fontSize:16 ,letterSpacing:1 ,}}>CardId :- ijisjdij23i3jijs</Text>
              </View>
              
                <View style={{flexDirection:'row' , flexWrap:'wrap' , marginTop:20 , marginBottom:90 ,}} >
                  <Text style={{flex:1 , flexWrap:'wrap',borderColor:'#000' , borderWidth:1 , padding:10 ,color:'#000' , width:'20%' , textAlign:'center' , fontFamily:'Nunito' , fontWeight:'500' ,height:40,fontSize:16 , marginRight:10, borderRadius:10 ,}} >
                    HTML
                  </Text>
                  <Text style={{flex:1 , flexWrap:'wrap',borderColor:'#000' , borderWidth:1 , padding:10 ,color:'#000' , width:'20%' , textAlign:'center' , fontFamily:'Nunito' , fontWeight:'500',height:40 ,fontSize:16 , marginRight:10, borderRadius:10 ,}}>
                    CSS
                  </Text>
                  <Text style={{ flex:1 , flexWrap:'wrap',borderColor:'#000' , borderWidth:1 , padding:10 ,color:'#000' , width:'20%' , textAlign:'center' , fontFamily:'Nunito' , fontWeight:'500',height:40 ,fontSize:16 , marginRight:10, borderRadius:10 ,}}>
                    Javascript
                  </Text>
                </View>
              
             </View>
           </View>
         </View>
       </ScrollView>
          
      
       
    </View>
  )
};

const styles = StyleSheet.create({
learncardOverviewHeadConainer:{
flexDirection:'row',
justifyContent:'space-around',
alignItems:'center',
backgroundColor:'#FFF',
elevation:8 ,
height:130 ,

},

OverviewheadTxt:{
color:'#000' ,
fontFamily:'Nunito' , 
fontSize:18 , 
fontWeight:'600' ,
},

OverviewContainer:{
  // flex:1 ,
  backgroundColor:'#FAFAFC' ,

  // padding:20,
  // height:"200%"
  
  
},

scrollContainer:{
  // flexGrow: 1,
    // marginBottom: 30,
    // marginTop: 20,
    // height:'500%'
}
})

export default LearnCardOverview;
