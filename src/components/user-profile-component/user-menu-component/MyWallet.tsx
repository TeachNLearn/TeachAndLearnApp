import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import CoinsSvg from '../../svgComponents/CoinsSvg';
import {AuthContext} from '../../../store/auth-context';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {getHeaders} from '../../../utils/helperFunctions';
import ScreenHeader from '../../general-components/ScreenHeader';
import Loader from '../../general-components/Loader';
import { FONT_FAMILY } from '../../../utils/globalContants';

interface Props {}

const MyWallet: React.FC<Props> = () => {
  const authCtx = useContext(AuthContext);

  const [userCoins, setUserCoins] = useState<number>(0);
  const [userForumCoins, setUserForumCoins] = useState<number>(0);
  const [userReviewCoins, setUserReviewCoins] = useState<number>(0);
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [isLoading, setisLoading] = useState(false);

  const fetchUserBalance = async () => {
    setisLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/user/mybalance`, {
        headers: getHeaders(userToken),
      })
      .then(({data}) => {
        const user = data.user;
        setUserCoins(user.coins);
        setUserForumCoins(user.forumCoins);
        setUserReviewCoins(user.reviewCoins);
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (userToken) {
      fetchUserBalance();
    }
  }, [userToken]);

  return !isLoading ? (
    <View style={styles.parentContainer}>
      <ScreenHeader
        ShowMenuIcon={false}
        title="Credits"
        onBackPress={() => {}}
        onMenuPress={() => {}}
      />
      <View
        style={{
          padding: 20,
          // backgroundColor: '#FFF',
          // elevation: 4,
          // width: 350,
          // height: 150,
          // marginTop: 50,
          // flexDirection: 'column',
          // justifyContent: 'space-evenly',
          // borderRadius: 25,
        }}>
        <Text
          style={{
            fontSize: 24,
            color: '#5f6c7b',
            fontWeight: '600',
            fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
            textDecorationLine: 'underline',
          }}>
          Total Balance
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CoinsSvg height={20} width={20} />
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '700',
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,

            }}>
            {userCoins}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding:10
        }}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#FFF',
            elevation: 4,
            width: 160,
            height: 100,
            flexDirection: 'column',
            borderRadius: 25,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#5f6c7b',
              fontWeight: '600',
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              textDecorationLine: 'underline',
            }}>
            Coins from Class Reviews
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              // fontWeight: '700',
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
            }}>
            {userReviewCoins}
          </Text>
        </View>


        <View
          style={{
            padding: 20,
            backgroundColor: '#FFF',
            elevation: 4,
            width: 160,
            height: 100,
            flexDirection: 'column',
            borderRadius: 25,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#5f6c7b',
              fontWeight: '600',
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              textDecorationLine: 'underline',
            }}>
            Coins from Forum
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              // fontWeight: '700',
              fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
              marginTop: 10,
            }}>
            {userForumCoins}
          </Text>
        </View>
      </View>
    </View>
  ) : (
   <Loader/>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,

  },
});

export default MyWallet;
