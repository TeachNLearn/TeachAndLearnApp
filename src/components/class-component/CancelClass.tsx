import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionican from 'react-native-vector-icons/Ionicons';
import Button from '../general-components/button';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface cancelClassProps {
  teachCardId: string;
  userToken: string;
}

const CancelClass = (props: cancelClassProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  type RootStackParamList = {
    SingleClassroom: {
      id: string;
      elemType: string;
      backPageLink: string;
    };
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const cancelClasshandler = async () => {
    setIsLoading(true);
    await axios
      .patch(
        `${BASE_URL}${apiVersion}/teach/${props.teachCardId}/cancel`,
        {},
        {
          headers: getHeaders(props.userToken),
        },
      )
      .then(({data}) => {
        console.log(data);
        setIsLoading(false);
        setModalVisible(false);
        navigation.navigate('SingleClassroom', {
          id: props.teachCardId,
          elemType: 'upcoming',
          backPageLink: 'Classes',
        });
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.container}>
        <Text style={styles.cancelText}>Cancel Class</Text>
      </TouchableOpacity>
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
                rowGap: 24,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Nunito',
                    fontSize: 18,
                    fontWeight: '600',
                    textDecorationLine: 'underline',
                  }}>
                  Cancel Class
                </Text>
                <Ionican
                  name="close-outline"
                  size={24}
                  color="#000"
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'Nunito',
                  fontSize: 18,
                  fontWeight: '500',
                  lineHeight: 24,
                  color: '#000',
                }}>
                Are you sure you want to cancel this class? On cancelling this
                class, the students would be refunded their coins and deducted
                from your side.
              </Text>
              <View
                style={{
                  width: '100%',
                  // borderColor: 'black',
                  // borderWidth: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <Button
                  containerStyles={styles.button}
                  onPress={cancelClasshandler}>
                  {isLoading ? (
                    <ActivityIndicator size={24} color="#fff" />
                  ) : (
                    <Text>Cancel Class</Text>
                  )}
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fecdca',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cancelText: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
    color: '#b42318',
    fontFamily: '"Nunito"',
    fontStyle: 'normal',
  },
  button: {
    backgroundColor: '#ef4565',
    alignSelf: 'flex-end',
    marginTop: 6,
  },
});

export default CancelClass;
