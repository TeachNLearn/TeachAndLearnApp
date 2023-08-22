import React, {useState, useEffect, useContext} from 'react';
import {learnCardProps} from '../../types/learnCardType';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {DATA_LIMIT} from '../../utils/globalContants';
import {checkMoreData, getHeaders} from '../../utils/helperFunctions';
import {AuthContext} from '../../store/auth-context';

const LearnCards = () => {
  const [learnCards, setLearnCards] = useState<Array<learnCardProps>>([]);
  const [requestPageSet, setrequestPageSet] = useState<number>(1);
  const [hasMoreData, sethasMoreData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  const [userToken, setuserToken] = useState(authCtx.token);

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
        console.log(data);
        const learnCardData = data.data.data;
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
      fetchLearnCards();
    }
  }, [userToken]);

  return <div>LearnCards</div>;
};

export default LearnCards;
