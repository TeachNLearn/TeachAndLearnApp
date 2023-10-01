import React, {useState, useEffect, useContext} from 'react';
import {learnCardProps} from '../../types/learnCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {DATA_LIMIT} from '../../utils/globalContants';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import CardHeader from '../../components/general-components/CardHeader';
import { RefreshControl } from 'react-native';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionican from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LearnCardData from '../../components/learnCardComponents/LearnCardData';
import Loader from '../../components/general-components/Loader';

type RootStackParamList = {
  Forum: undefined;
  LearnCardOverview: undefined;
  LearnCardOverviewNavigator: undefined;
};

type LearnCardsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LearnCards: React.FC<LearnCardsProps> = (props) => {
  const [learnCards, setLearnCards] = useState<Array<learnCardProps>>([]);
  const [requestPageSet, setrequestPageSet] = useState<number>(1);
  const [hasMoreData, sethasMoreData] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState(authCtx.token);
  const [refreshing, setRefreshing] = React.useState(false);

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
      .then(({data}) => {
        const learnCardData = data.data.data;
        console.log(learnCardData);
        checkMoreData(learnCardData, sethasMoreData);
        setLearnCards(prev => [...prev, ...learnCardData]);
        setIsLoading(false);
        setLoaderLoading(false);
        setrequestPageSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
        setIsLoading(false);
        setLoaderLoading(false);
      });
  };

  useEffect(() => {
    if (userToken) {
      setTimeout(() => {
        fetchLearnCards();
        setShowActivityIndicator(false);
      }, 3000); // Show ActivityIndicator for 3 seconds (3000 milliseconds)
    }
  }, [userToken]);

  const handleBackPress = () => {
    // Handle back press logic here
    props.navigation.goBack()
  };

  const handleMenuPress = () => {
    // Handle menu press logic here
  };

  const onRefresh = React.useCallback(() => {
    setLearnCards([])
    setRefreshing(true);
    fetchLearnCards()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.learncardParentConainer}>
      <CardHeader
        title="Learn Cards"
        onBackPress={handleBackPress}
        onMenuPress={handleMenuPress}
        ShowMenuIcon
      />
      <View style={{flex:1,}}>
         {showActivityIndicator ? (
          <View style={{flex:1}}>
            <Loader/>
          </View>
        ) : (
          <ScrollView
           contentContainerStyle={styles.learnCardContainer} 
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            {learnCards.map((card, index) => (
              <LearnCardData {...card} key={index} isTeachCard={false} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  learncardParentConainer: {
    flex:1
  },

  learncardHeadConainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex:1,
    backgroundColor: '#FFF',
    height: 130,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15, // Adjust the height to control the shadow's vertical position
    },
    shadowOpacity: 1.2,
    shadowRadius: 5,
    elevation: 10,
  },

  headTxt: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '600',
  },

  learnCardContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FAFAFC',
    marginBottom:240 ,
  },

    activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LearnCards;
