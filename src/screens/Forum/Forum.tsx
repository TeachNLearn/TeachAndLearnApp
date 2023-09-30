import {View, StyleSheet, ScrollView,RefreshControl} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../store/auth-context';
import {forumProps} from '../../types/ForumTypes';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import {DATA_LIMIT} from '../../utils/globalContants';
import ForumCard from '../../components/forum-components/forumCard';
import PostForumBtn from '../../components/forum-components/ForumBtn';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../components/general-components/ScreenHeader';
import Loader from '../../components/general-components/Loader';
const Forum = (props:any) => {
  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [forums, setForums] = useState<Array<forumProps>>([]);
  const [forumPageSet, setForumPageSet] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);


  async function fetchAllForums() {
    console.log('CHECKING');
    // setForums([])
    setLoaderLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/forum`, {
        params: {
          limit: DATA_LIMIT,
          page: forumPageSet + 1,
        },
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        const forums = data.data.data;
        console.log(forums);
        checkMoreData(forums, setHasMoreData);
        setForums(prev => [...prev, ...forums]);
        setIsLoading(false);
        setLoaderLoading(false);
        setForumPageSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(Object.values(data));
        setIsLoading(false);
        setLoaderLoading(false);
      });
  }

  useEffect(() => {
    console.log(userToken);
    if (userToken) {
      fetchAllForums();
    }
  }, [userToken]);

  type RootStackParamList = {
    CreateForum: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const createForumnavigator = () => {
    navigation.navigate('CreateForum');
  };

  const onRefresh = React.useCallback(() => {
    setForums([])
    setRefreshing(true);
    fetchAllForums()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
 
  

  return !isLoading ? (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <ScreenHeader
        title="Forum"
        ShowMenuIcon={false}
        onBackPress={() => {props.navigation.goBack()}}
        onMenuPress={() => {}}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 20,
          marginRight: 20,
        }}>
        <PostForumBtn
          text="Post your query"
          onPressFunc={createForumnavigator}
        />
      </View>
      <View style={styles.container}>
        {forums &&
          forums.map((forum, idx) => {
            return <ForumCard key={idx} userToken={userToken} {...forum} />;
          })}
      </View>
    </ScrollView>
  ) : (
    <Loader/>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Forum;
