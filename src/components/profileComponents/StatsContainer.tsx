import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import UserStats from '../user-profile-component/UserStats';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import axios from 'axios';
import {getHeaders} from '../../utils/helperFunctions';
import { FONT_FAMILY } from '../../utils/globalContants';

interface profileStatProps {
  taught: number;
  userToken: string;
  userId: string;
  attended: number;
}

const StatsContainer = (props: profileStatProps) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [userTotalRatings, setUserTotalRatings] = useState<number>(0);

  async function fetchUserRating() {
    await axios
      .get(`${BASE_URL}${apiVersion}/user/${props.userId}/myratings`, {
        headers: getHeaders(props.userToken),
      })
      .then(({data}) => {
        console.log(data);
        if (data.stats[0]) {
          setUserTotalRatings(data.stats[0].nRatings);
          setUserRating(data.stats[0].avgRating);
        }
      });
  }

  useEffect(() => {
    if (props.userToken && props.userId) {
      fetchUserRating();
    }
  }, [props.userToken, props.userId]);

  return (
    <View style={{marginHorizontal: 32, marginTop: 36}}>
      <View style={{display: 'flex', rowGap: 16}}>
        <Text
          style={{
            color: '#FFF',
            fontSize: 22,
            fontWeight: '600',
            letterSpacing: 0.44,
            fontFamily: FONT_FAMILY.NUNITO_BOLD
          }}>
          Stats as Teacher
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            columnGap: 48,
            marginBottom: 20,
          }}>
          <UserStats label="Taught" value={props.taught} />
          <UserStats label="Total Ratings" value={userTotalRatings} />
          <UserStats
            label="Average Rating"
            value={Math.round(userRating * 10) / 10 + ' / 10'}
          />
        </View>
      </View>
      <View style={{display: 'flex', rowGap: 16}}>
        <Text
          style={{
            color: '#FFF',
            fontSize: 22,
            fontWeight: '600',
            letterSpacing: 0.44,
            fontFamily: FONT_FAMILY.NUNITO_BOLD,
          }}>
          Stats as Student
        </Text>
        <View
          style={{
            alignItems: 'flex-start',
            marginBottom: 20,
          }}>
          <UserStats label="Attended" value={props.attended} />
        </View>
      </View>
    </View>
  );
};

export default StatsContainer;
