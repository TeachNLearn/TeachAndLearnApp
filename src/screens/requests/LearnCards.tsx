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
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionican from 'react-native-vector-icons/Ionicons';
import SvgImgInterested from '../../components/SVGComponents/InterestedSvg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
              <View key={index} style={styles.learnCard}>
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

learnCard:{
width:'88%' ,
height:200 ,
backgroundColor:'#094067',
borderRadius:16 ,
elevation:7 ,
marginTop:20 ,
padding:30 ,


},
});

export default LearnCards;
