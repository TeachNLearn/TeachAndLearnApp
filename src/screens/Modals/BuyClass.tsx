import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Ionican from 'react-native-vector-icons/Ionicons';
import React, {useEffect} from 'react';
import CoinsSvg from '../../components/svgComponents/CoinsSvg';
import IconSe from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from './CancelClass';
import {useState} from 'react';
import Button from '../../components/general-components/button';
import ArrowIcon from '../../components/svgComponents/ArrowIcon';
import {
  getHeaders,
  getReadableDate,
  getReadableTime,
} from '../../utils/helperFunctions';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface enrollProps {
  title: string;
  price: number;
  date: string;
  classStartsAt: string;
  classEndsAt: string;
  teachCardId: string;
  userToken: string;
}

const BuyClass = (props: enrollProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  const fetchUserBalance = async () => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}${apiVersion}/user/mybalance`, {
        headers: getHeaders(props.userToken),
      })
      .then(({data}) => {
        const user = data.user;
        setTotalCoins(user.coins + user.forumCoins + user.reviewCoins);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (props.userToken) {
      fetchUserBalance();
    }
  }, [props.userToken]);

  type RootStackParamList = {
    SingleClassroom: {
      id: string;
      elemType: string;
      backPageLink: string;
    };
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const enrollHandler = async () => {
    setEnrollLoading(true);
    await axios
      .patch(
        `${BASE_URL}${apiVersion}/teach/${props.teachCardId}/enroll`,
        {},
        {
          headers: getHeaders(props.userToken ?? ''),
        },
      )
      .then(({data}) => {
        console.log(data);
        setEnrollLoading(false);
        navigation.navigate('SingleClassroom', {
          id: props.teachCardId,
          elemType: 'upcoming',
          backPageLink: 'Classes',
        });
      })
      .catch(data => {
        setEnrollLoading(false);
        const err = data.response.data.message;
        console.log(err);
      });
  };

  return (
    <>
      <Button onPress={() => setModalVisible(true)}>Enroll</Button>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.34)',
        }}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: '#FFF',
                borderRadius: 28,
                elevation: 8,
                paddingVertical: 32,
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Nunito',
                    fontSize: 18,
                    fontWeight: '600',
                    textDecorationLine: 'underline',
                  }}>
                  Buy Class
                </Text>
                <Ionican
                  name="close-outline"
                  size={24}
                  color="#000"
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Nunito',
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  {props.title}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // margin: 20,
                  marginBottom: -5,
                }}>
                <Text
                  style={{
                    color: '#4A5578',
                    fontFamily: 'Nunito',
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  Time:
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 6,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Nunito',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    {getReadableDate(props.date)}
                  </Text>
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: '#000000',
                      borderRadius: 6,
                    }}></View>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Nunito',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    {getReadableTime(props.classStartsAt) +
                      ' - ' +
                      getReadableTime(props.classEndsAt)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // margin: 20,
                }}>
                <Text
                  style={{
                    color: '#4A5578',
                    fontFamily: 'Nunito',
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  Coins
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CoinsSvg fill="#000" height={20} width={20} />
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Nunito',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    10
                  </Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: '#F8F8FA',
                  borderRadius: 8,
                  padding: 10,
                  columnGap: 4,
                }}>
                <Ionican
                  name="information-circle-outline"
                  size={20}
                  color="#000"
                />
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    columnGap: 2,
                  }}>
                  <Text> You have </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 2,
                    }}>
                    <CoinsSvg />
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 16,
                        fontFamily: 'Nunito',
                        fontWeight: '600',
                      }}>
                      {totalCoins}
                    </Text>
                  </View>
                  <Text> coins right now.</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={enrollHandler}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: 4,
                    backgroundColor: '#094067',
                    width: '100%',
                    paddingVertical: 18,
                    borderRadius: 47,
                  }}>
                  {enrollLoading ? (
                    <ActivityIndicator size={24} color="#fff" />
                  ) : (
                    <>
                      <Text
                        style={{
                          color: '#FFF',
                          fontFamily: 'Nunito',
                          fontWeight: '600',
                          fontSize: 18,
                          letterSpacing: 1,
                          lineHeight: 18,
                        }}>
                        Buy
                      </Text>
                      <ArrowIcon />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default BuyClass;
