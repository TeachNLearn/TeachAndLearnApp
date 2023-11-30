import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Button from '../../components/general-components/button' ;
import { COLORS_ILLUSTRATION } from '../../utils/globalContants';
import axios from 'axios';
import { BASE_URL, apiVersion } from '../../utils/apiRoutes';
import { getHeaders } from '../../utils/helperFunctions';
import { ToastHOC } from '../../helpers/Toast';

interface InputModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (inputValue: string) => void
}

const ReportUser: React.FC<InputModalProps> = ({ isVisible, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSave = () => {
    // Perform any validation or processing on the input value here
    onSave(inputValue);
    setInputValue('');
    onClose();
  };

  const reportUserHandler = async () => {
    if (inputValue != "") {
      // setIsLoading(true);
      await axios
        .post(
          `${BASE_URL}${apiVersion}/user/${userId}/report`,
          {
            inputValue,
          },
          {
            headers: getHeaders(userToken),
          }
        )
        .then(({ data }) => {
          console.log(data);
          // setIsLoading(false);
          setInputValue("");
          ToastHOC.successAlert('Report','We have received your report')
          onClose();
        })
        .catch((err:any) => {
          console.log(err.message);
          // setIsLoading(false);
          ToastHOC.errorAlert(err.message,'Error in receiving report')
        });
    }
  };

  return (
    <Modal visible={isVisible}  transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Report User:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <View style={{flexDirection:'column' , justifyContent:'space-between' , marginTop:30 ,   }}>
          
           <Button containerStyles={styles.button} children="Report" onPress={handleSave}/>
           <Text>{" "}</Text>
          <Button containerStyles={styles.button1} children="Go back" onPress={onClose}  />
           </View>
      
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  button: {
    backgroundColor: COLORS_ILLUSTRATION.tertiary,
  },
  button1: {
    backgroundColor: COLORS_ILLUSTRATION.stroke,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width:350 ,
    height:290 ,
    elevation: 5, // Shadow for Android
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default ReportUser;
