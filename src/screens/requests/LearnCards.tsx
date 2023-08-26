import React, { useState, useEffect, useContext } from 'react';
import { learnCardProps } from '../../types/learnCardType';
import axios from 'axios';
import { BASE_URL, apiVersion } from '../../utils/apiRoutes';
import { DATA_LIMIT } from '../../utils/globalContants';
import { checkMoreData, getHeaders } from '../../utils/helperFunctions';
import { AuthContext } from '../../store/auth-context';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionican from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LearnCardData from '../../components/LearnCardsComponent/LearnCardData';

type RootStackParamList = {
  Forum: undefined;
  LearnCardOverview: undefined;
  LearnCardOverviewNavigator: undefined;
};

type LearnCardsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LearnCards: React.FC<LearnCardsProps> = ({ navigation }) => {
  const [learnCards, setLearnCards] = useState<Array<learnCardProps>>([]);
  const [requestPageSet, setrequestPageSet] = useState<number>(1);
  const [hasMoreData, sethasMoreData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState(authCtx.token);
  const fetchLearnCards = async () => {
    setLoaderLoading(true);
    const curentDate = new Date();
    await axios
      .get(`${BASE_URL}${apiVersion}/learn`, {
        params: {
          limit: DATA_LIMIT,
          page: requestPageSet,
          dueDate: {
            $gte: curentDate,
          },
        },
        headers: getHeaders(userToken),
      })
      .then(({ data }) => {
        const learnCardData = data.data.data;
        console.log(learnCardData);
        checkMoreData(learnCardData, sethasMoreData);
        setLearnCards((prev) => [...prev, ...learnCardData]);
        setIsLoading(false);
        setLoaderLoading(false);
        setrequestPageSet((prev) => prev + 1);
      })
      .catch((data) => {
        console.log(data);
        setIsLoading(false);
        setLoaderLoading(false);
      });
  };

  useEffect(() => {
    if (userToken) {
      fetchLearnCards();
    }
  }, [userToken]);

  return (
    <View style={styles.learncardParentConainer}>
      <View style={styles.learncardHeadConainer}>
        <Ionican name="arrow-back-sharp" size={20} color="#000" />
        <Text style={styles.headTxt}>Learn Cards</Text>
        <Ionican name="ellipsis-vertical-sharp" size={20} color="#000000" />
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('LearnCardOverview')}
        >
          <View style={styles.learnCardContainer}>
            {learnCards.map((card, index) => (
              <LearnCardData card={card} key={index} />
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
learncardParentConainer:{

},

learncardHeadConainer:{
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-around' ,
   backgroundColor:'#FFF',
   
   height:130 ,
    shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 15, // Adjust the height to control the shadow's vertical position
  },
  shadowOpacity: 1.2,
  shadowRadius: 5,
  elevation: 10,
   
},

headTxt :{
color:'#000' ,
fontFamily:'Nunito' , 
fontSize:18 , 
fontWeight:'600' ,
},

learnCardContainer:{
  justifyContent:'center' ,
  flexDirection:'column' ,
  alignItems:'center',
  backgroundColor:'#FAFAFC' 
  
  
},


});

export default LearnCards;
