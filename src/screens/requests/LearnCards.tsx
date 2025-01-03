import React, {useState, useEffect, useContext} from 'react';
import {learnCardProps} from '../../types/learnCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {DATA_LIMIT, SCREEN_WIDTH} from '../../utils/globalContants';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';
import ScreenHeader from '../../components/general-components/ScreenHeader';
('../../components/general-components/ScreenHeader');

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Loader from '../../components/general-components/Loader';
import CardScreen from '../extraScreens/CardScreen';

type RootStackParamList = {
  Forum: undefined;
  LearnCardOverview: undefined;
  LearnCardOverviewNavigator: undefined;
};

type LearnCardsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LearnCards: React.FC<LearnCardsProps> = props => {
  const [learnCards, setLearnCards] = useState<Array<learnCardProps>>([]);
  const [requestPageSet, setrequestPageSet] = useState<number>(0);
  const [hasMoreData, sethasMoreData] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loaderLoading, setLoaderLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState(authCtx.token);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchLearnCards = async () => {
    console.log("Checking ")
    setLoaderLoading(true);
    setIsLoading(true)
    const curentDate = new Date();
    await axios
      .get(`${BASE_URL}${apiVersion}/learn`, {
        params: {
          limit: DATA_LIMIT,
          page: requestPageSet +1 ,
          dueDate: {
            $gte: curentDate,
          },
        },
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        console.log("data1",data)
        const learnCardData = data.data.data;
        console.log("learn_cards_are_empty",learnCardData);
        checkMoreData(learnCardData, sethasMoreData);
        setLearnCards(prev => [...prev, ...learnCardData]);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        setLoaderLoading(false);
        setrequestPageSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
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
    props.navigation.goBack();
  };

  const handleMenuPress = () => {
    // Handle menu press logic here
  };

  const onRefresh = React.useCallback(() => {
    setLearnCards([])
    setRefreshing(true);
    fetchLearnCards();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.learncardParentConainer}>
      <ScreenHeader
        // title="Learn Cards"
        title="Cards"
        onBackPress={handleBackPress}
        ShowMenuIcon={false}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          // borderWidth: 1,
          // borderColor: '#000',
          backgroundColor: '#fff',
        }}>
        {showActivityIndicator ? (
          <View style={{flex: 1}}>
            <Loader />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.learnCardContainer}
            showsVerticalScrollIndicator={false}
            >
            {/* {learnCards.map((card, index) => (
              <LearnCardData {...card} key={index} isTeachCard={false} />
              ))} */}
              <CardScreen 
              isLoading={isLoading} 
              onRefresh={onRefresh} 
              refreshing={refreshing} 
              learnCards={learnCards}
              props={props}
              />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  learncardParentConainer: {
    flex: 1,
    // backgroundColor: '#fff',
    width: '100%',
  },
  headTxt: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '600',
  },
  learnCardContainer: {
    // justifyContent: 'center',
    flexDirection: 'column',
    // alignItems: 'center',
    paddingHorizontal:10,
    backgroundColor: '#FAFAFC',
    // marginBottom: 240,
    marginTop:20,
    flex:.9,
    
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LearnCards;
