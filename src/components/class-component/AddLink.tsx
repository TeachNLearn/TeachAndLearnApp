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
        navigation.navigate('SingleClassroom', {
          id: props.teachCardId,
          elemType: 'upcoming',
          backPageLink: 'Classes',
        });
      })
      .catch(data => {
        setIsLoading(false);
        console.log(data);
      });
  };

  return (
    <>
      <TouchableOpacity>
        {props.callLink ? <Text>Show Link</Text> : <Text>Add Class Link</Text>}
        <ArrowIcon />
      </TouchableOpacity>
      <Modal>
        <View>
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
          <FormField
            elem={
              <InputHolder
                name="classLink"
                type="text"
                updateFields={updateFields}
                value={classLink}
                hasSignleUpdate={true}
                isTextarea={true}
                textareaLines={6}
                placeholderText="Add link of your class"
              />
            }
            inputDesc="Class Link"
          />
          {props.callLink ? (
            <View>
              <Button onPress={addLinkHandler}>
                {isLoading ? (
                  <ActivityIndicator size={24} color="#fff" />
                ) : (
                  <>
                    <Text>Edit Class Link</Text>
                    <ArrowIcon />
                  </>
                )}
              </Button>
              <Button onPress={() => Linking.openURL(props.callLink)}>
                <>
                  <Text>Edit Class Link</Text>
                  <ArrowIcon />
                </>
              </Button>
            </View>
          ) : (
            <Button onPress={addLinkHandler}>
              {isLoading ? (
                <ActivityIndicator size={24} color="#fff" />
              ) : (
                <>
                  <Text>Add Class Link</Text>
                  <ArrowIcon />
                </>
              )}
            </Button>
          )}
        </View>
      </Modal>
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
});

export default AddLink;
