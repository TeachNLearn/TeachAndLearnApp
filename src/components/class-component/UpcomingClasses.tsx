import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {DATA_LIMIT} from '../../utils/globalContants';
import {AuthContext} from '../../store/auth-context';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import ClassGrid from './ClassGrid';
import Loader from '../general-components/Loader';

const UpcomingClasses = () => {
  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>([]);

  const [upcomingClassSet, setUpcomingClassSet] = useState<number>(0);
  const [hasMoreData, sethasMoreData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const {token} = useContext(AuthContext);

  async function fetchAllUpcomingClasses() {
    setLoaderLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/user/myclasses/upcoming`, {
        params: {
          sort: 'classStartsAt',
          limit: DATA_LIMIT,
          page: upcomingClassSet + 1,
        },
        headers: getHeaders(token),
      })
      .then(({data}) => {
        const classes = data.upcomingClasses;
        console.log(classes);
        checkMoreData(classes, sethasMoreData);
        setTeachCards(prev => [...prev, ...classes]);
        setIsLoading(false);
        setLoaderLoading(false);
        setUpcomingClassSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
        setIsLoading(false);
        setLoaderLoading(false);
      });
  }

  useEffect(() => {
    if (token) {
      fetchAllUpcomingClasses();
    }
  }, [token]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAllUpcomingClasses();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{flex: 1}}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            borderColor: '#000',
            // borderWidth: 1,
          }}>
          <Loader />
        </View>
      ) : teachCards.length != 0 ? (
        <ClassGrid teachCards={teachCards} elemType="upcoming" />
      ) : (
        <Text>No Upcoming Classes</Text>
      )}
    </ScrollView>
  );
};

export default UpcomingClasses;
