import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../store/auth-context';
import {forumProps} from '../../types/ForumTypes';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import {DATA_LIMIT} from '../../utils/globalContants';

const Forum = () => {
  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState(authCtx.token);

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
          page: forumPageSet,
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
        console.log(data);
        setIsLoading(false);
        setLoaderLoading(false);
      });
  }

  useEffect(() => {
    if (userToken) {
      fetchAllForums();
    }
  }, [userToken]);

  return (
    <View>
      <Text>Forum</Text>
    </View>
  );
};

export default Forum;
