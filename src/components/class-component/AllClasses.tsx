import React, {useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {AuthContext} from '../../store/auth-context';
import {teachingCardProps} from '../../types/teachingCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {DATA_LIMIT} from '../../utils/globalContants';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import ClassGrid from './ClassGrid';

const AllClasses = () => {
  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>(authCtx.token);

  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>([]);

  const [classSet, setClassSet] = useState<number>(0);
  const [hasMoreData, sethasMoreData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);

  async function fetchAllTeachCards() {
    console.log('CHECKING');
    setLoaderLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/teach`, {
        params: {
          sort: 'classStartsAt',
          limit: DATA_LIMIT,
          page: classSet + 1,
        },
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        console.log(data.teachCards);
        const classes = data.teachCards;
        checkMoreData(classes, sethasMoreData);
        setTeachCards(prev => [...prev, ...classes]);
        setIsLoading(false);
        setLoaderLoading(false);
        setClassSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
        setIsLoading(false);
        setLoaderLoading(false);
      });
  }

  useEffect(() => {
    if (userToken) {
      fetchAllTeachCards();
    }
  }, [userToken]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          teachCards.length != 0 && (
            <ClassGrid teachCards={teachCards} elemType="all classes" />
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
  },
});

export default AllClasses;
