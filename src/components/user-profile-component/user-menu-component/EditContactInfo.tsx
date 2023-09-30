import React, {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import InputHolder from '../../inputComponents/inputHolder'; // Make sure the import path is correct
import Button from '../../general-components/button';
import {getHeaders, isValidEmail} from '../../../utils/helperFunctions';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import FormField from '../../general-components/FormField';
import {COLORS_ILLUSTRATION} from '../../../utils/globalContants';
import ScreenHeader from '../../general-components/ScreenHeader';

interface ContactProps {
  username: string;
  email: string;
  phone: string;
}

type modalProps = ContactProps & {
  userToken: string;
  closeModal: any;
};

const EditContactInfo = (props: modalProps) => {
  const [contactInfo, setContactInfo] = useState<ContactProps>({
    username: props.username,
    email: props.email,
    phone: props.phone,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    const {email, phone, username} = contactInfo;
    if (email == '' || phone == '' || username == '') {
      // toast.error("Fill in all the details", toastOptions);
      return false;
    } else if (!isValidEmail(email)) {
      // toast.error("Not a valid email", toastOptions);
      return false;
    }
    return true;
  };

  const updateContactUserHandler = async () => {
    if (handleValidation()) {
      setIsLoading(true);
      await axios
        .patch(
          `${BASE_URL}${apiVersion}/user/mycontactInfo`,
          {
            userName: contactInfo.username,
            email: contactInfo.email,
            phoneNumber: contactInfo.phone,
          },
          {
            headers: getHeaders(props.userToken),
          },
        )
        .then(({data}) => {
          setIsLoading(false);
          console.log(data.updatedUser);
          const user = data.updatedUser;
          user.token = props.userToken;
          // localStorage.setItem(localStorageUser, JSON.stringify(user));
          // window.dispatchEvent(new Event("storage"));
          // window.location.reload();
        })
        .catch(data => {
          console.log(data);
          setIsLoading(false);
          if (data.response.data.message) {
            // toast.error(data.response.data.message, toastOptions);
          } else {
            // toast.error("Some error occured, couldnt update", toastOptions);
          }
        });
    }
  };

  const updateFields = (fields: Partial<ContactProps>) => {
    setContactInfo(prev => {
      return {...prev, ...fields};
    });
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#FFF'}}>
      <ScreenHeader
        ShowMenuIcon={false}
        title="Contact Info"
        onBackPress={() => {}}
        onMenuPress={() => {}}
      />
      <View style={styles.container}>
        <FormField
          elem={
            <InputHolder
              label="UserName"
              name="username"
              type="text"
              value={contactInfo.username}
              updateFields={updateFields}
            />
          }
          inputDesc="Change your Username :-"
        />
        <FormField
          elem={
            <InputHolder
              label="Email"
              name="email"
              type="email"
              value={contactInfo.email}
              updateFields={updateFields}
            />
          }
          inputDesc="Change your Email :-"
        />
        <FormField
          elem={
            <InputHolder
              label="Phone Number"
              name="phone"
              type="string"
              value={contactInfo.phone}
              updateFields={updateFields}
            />
          }
          inputDesc="Change your Phone Number :-"
        />
        <Button
          onPress={updateContactUserHandler}
          containerStyles={styles.button}>
          {isLoading ? (
            <View>
              <ActivityIndicator size={24} color="white" />
            </View>
          ) : (
            <Text>Edit Academic Info</Text>
          )}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 40,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: COLORS_ILLUSTRATION.tertiary,
  },
});

export default EditContactInfo;
