import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {getHeaders} from '../../utils/helperFunctions';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ArrowIcon from '../svgComponents/ArrowIcon';
import Ionican from 'react-native-vector-icons/Ionicons';
import InputHolder from '../inputComponents/inputHolder';
import FormField from '../general-components/FormField';
import Button from '../general-components/button';

interface callProps {
  callLink: string;
  teachCardId: string;
  userId: string;
  userToken: string;
}

const AddLink = (props: callProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [classLink, setClassLink] = useState<string>(props.callLink);

  function updateFields(content: string) {
    setClassLink(content);
  }

  type RootStackParamList = {
    SingleClassroom: {
      id: string;
      elemType: string;
      backPageLink: string;
    };
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const addLinkHandler = async () => {
    setIsLoading(true);
    await axios
      .patch(
        `${BASE_URL}${apiVersion}/teach/${props.teachCardId}/callLink`,
        {
          callLink: classLink,
        },
        {
          headers: getHeaders(props.userToken),
        },
      )
      .then(() => {
        setIsLoading(false);
        setModalVisible(false);
        navigation.navigate('SingleClassroom', {
          id: props.teachCardId,
          elemType: 'upcoming',
          backPageLink: 'Classes',
        });
      })
      .catch(data => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        {props.callLink ? (
          <Text style={styles.text}>Show Link</Text>
        ) : (
          <Text style={styles.text}>Add Class Link</Text>
        )}
        <ArrowIcon />
      </TouchableOpacity>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.34)',
          borderColor: 'black',
          borderWidth: 1,
        }}> */}
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
            // marginTop: 22,
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
              {props.callLink ? (
                <Text style={styles.heading}>Class Link</Text>
              ) : (
                <Text style={styles.heading}>Add Link</Text>
              )}
              <Ionican
                name="close-outline"
                size={24}
                color="#000"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <InputHolder
              name="classLink"
              type="text"
              updateFields={updateFields}
              value={classLink}
              hasSignleUpdate={true}
              isTextarea={true}
              textareaLines={4}
              placeholderText="Add link of your class"
            />
            {props.callLink ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  rowGap: 12,
                }}>
                <Button
                  containerStyles={styles.editBtns}
                  onPress={addLinkHandler}>
                  {isLoading ? (
                    <ActivityIndicator size={24} color="#fff" />
                  ) : (
                    <Text>Edit Class Link</Text>
                  )}
                </Button>
                <Button
                  containerStyles={styles.editBtns}
                  onPress={() => Linking.openURL(props.callLink)}>
                  <Text>Join Class</Text>
                </Button>
              </View>
            ) : (
              <Button containerStyles={styles.button} onPress={addLinkHandler}>
                {isLoading ? (
                  <ActivityIndicator size={24} color="#fff" />
                ) : (
                  <Text>Add Class Link</Text>
                )}
              </Button>
            )}
          </View>
        </View>
      </Modal>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#094067',
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
  },
  editBtns: {
    backgroundColor: '#094067',
    alignSelf: 'center',
    paddingHorizontal: 30,
    width: '60%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#094067',
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: 1,
    color: '#ffffff',
  },
});

export default AddLink;
