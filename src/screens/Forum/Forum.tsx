import { View, StyleSheet } from "react-native";
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../store/auth-context';
import {forumProps} from '../../types/ForumTypes';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import {DATA_LIMIT} from '../../utils/globalContants';
import ForumCard from '../../components/forum-components/forumCard';

const Forum = () => {
  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>('');

  const [forums, setForums] = useState<Array<forumProps>>([]);
  const [forumPageSet, setForumPageSet] = useState<number>(1);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);

  async function fetchAllForums() {
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
        console.log(data);
        checkMoreData(forums, setHasMoreData);
        setForums(prev => [...prev, ...forums]);
        setIsLoading(false);
        setLoaderLoading(false);
        setForumPageSet(prev => prev + 1);
      })
      .catch(data => {
        console.log(data);
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

  return (
    <View style={styles.container}>
      {forums &&
        forums.map((forum, idx) => {
          return <ForumCard key={idx} userToken={userToken} {...forum} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
  },
});

export default Forum;
