import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {DATA_LIMIT} from '../../utils/globalContants';
import {AuthContext} from '../../store/auth-context';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import ClassGrid from './ClassGrid';

const CompletedClasses = () => {
  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>([]);

  const [completedClassSet, setCompletedClassSet] = useState<number>(0);
  const [hasMoreData, sethasMoreData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);

  const {token} = useContext(AuthContext);

  async function fetchAllCompletedClasses() {
    setLoaderLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/user/myclasses/completed`, {
        params: {
          sort: '-classStartsAt',
          limit: DATA_LIMIT,
          page: completedClassSet + 1,
        },
        headers: getHeaders(token),
      })
      .then(({data}) => {
        console.log(data);
        const classes = data.completedClasses;
        checkMoreData(classes, sethasMoreData);
        setTeachCards(prev => [...prev, ...classes]);
        setIsLoading(false);
        setLoaderLoading(false);
        setCompletedClassSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
        setIsLoading(false);
        setLoaderLoading(false);
      });
  }

  useEffect(() => {
    if (token) {
      fetchAllCompletedClasses();
    }
  }, [token]);

  return (
    <View>
      {teachCards.length != 0 ? (
        <ClassGrid teachCards={teachCards} elemType="completed" />
      ) : null}
    </View>
  );
};

export default CompletedClasses;
