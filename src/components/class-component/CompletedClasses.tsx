import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import {teachingCardProps} from '../../types/teachingCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {COLORS_ILLUSTRATION, DATA_LIMIT, FONT_FAMILY, SCREEN_WIDTH} from '../../utils/globalContants';
import {AuthContext} from '../../store/auth-context';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import ClassGrid from './ClassGrid';
import Icon from 'react-native-vector-icons/Entypo';
import Loader from '../general-components/Loader';
import SkeletonLoaderHorizontalWithReanimatedGradient from '../../screens/extraScreens/skeletonUi/Skeleton';
import SkeletonLoder from '../general-components/SkeletonLoder';

const CompletedClasses = (props:{role:string,props:any}) => {
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
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        setLoaderLoading(false);
        setCompletedClassSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
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
    <>
      
          <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      style={{
        flex:1,
        backgroundColor: '#fff',
        marginHorizontal: 0.04 * SCREEN_WIDTH,
        marginTop:10,
      }}>
        <View>
        {
          props.role === 'teach'?(
            <>
              <TouchableOpacity
              onPress={()=>props.props.props.navigation.navigate('CreateTeachCard')}
                    style={{
                      height: 50,
                      width: '100%',
                      marginTop: 10,
                      borderRadius: 5,
                      backgroundColor: COLORS_ILLUSTRATION.tertiary,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      paddingHorizontal: 5,
                    }}>
                    <Icon
                      name="plus"
                      size={25}
                      color={'white'}
                      style={{alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 17,
                        fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
                        color: 'white',
                      }}>
                      Create Teach Card
                    </Text>
                  </TouchableOpacity>
            </>
          ):null
         }
        </View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
  
            borderColor: '#000',
          }}>
          {/* <Loader /> */}
          <SkeletonLoder height={250}/>
        </View>
      ) : teachCards.length != 0 ? (
        <ClassGrid teachCards={teachCards} elemType="completed" />
      ) : (
        <Text style={{textAlign:'center',fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD,fontSize:20,color:'#222'}}>No Completed Classes</Text>
      )}
    </ScrollView>
    </>
   
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
