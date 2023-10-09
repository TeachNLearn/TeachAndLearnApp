import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, View, Text,StyleSheet} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {DATA_LIMIT, FONT_FAMILY, SCREEN_WIDTH} from '../../utils/globalContants';
import {AuthContext} from '../../store/auth-context';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import ClassGrid from './ClassGrid';
import Loader from '../general-components/Loader';
import SkeletonLoaderHorizontalWithReanimatedGradient from '../../screens/extraScreens/skeletonUi/Skeleton';

const CompletedClasses = () => {
  const [teachCards, setTeachCards] = useState<Array<teachingCardProps>>([]);

  const [completedClassSet, setCompletedClassSet] = useState<number>(0);
  const [hasMoreData, sethasMoreData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const {token} = useContext(AuthContext);

  async function fetchAllCompletedClasses() {
    setLoaderLoading(true);
    setIsLoading(true);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAllCompletedClasses();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      style={{
        flex:1,
        backgroundColor: '#fff',
        marginHorizontal: 0.04 * SCREEN_WIDTH,
        marginTop:20
      }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
  
            borderColor: '#000',
          }}>
          {/* <Loader /> */}
          <View style={styles.loader}>
           <View style={{alignSelf:'center'}}>
           <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.3} height={20}/>
            <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.5} height={20}/>
            <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.7} height={20}/>
            <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.4} height={20}/>
            <SkeletonLoaderHorizontalWithReanimatedGradient width={SCREEN_WIDTH/1.4} height={20}/>
           </View>
          </View>
        </View>
      ) : teachCards.length != 0 ? (
        <ClassGrid teachCards={teachCards} elemType="completed" />
      ) : (
        <Text style={{textAlign:'center',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,fontSize:20,color:'#222'}}>No Completed Classes</Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },
  loader:{
    backgroundColor: '#094067',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // alignSelf:'center',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    height:250,
    rowGap: 14,
    // cursor: 'pointer',
    // justifyContent:'center'
  }
});
export default CompletedClasses;
