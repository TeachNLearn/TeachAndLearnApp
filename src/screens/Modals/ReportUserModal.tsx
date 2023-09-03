import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Button from '../../components/general-components/button' ;
interface InputModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (inputValue: string) => void;
}

const ReportUser: React.FC<InputModalProps> = ({ isVisible, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSave = () => {
    // Perform any validation or processing on the input value here
    onSave(inputValue);
    setInputValue('');
    onClose();
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
          <View style={{flexDirection:'column' , justifyContent:'center' , marginTop:30 ,   }}>
           <Button children="Report" onPress={handleSave}/>
          
           <Text>{" "}</Text>
          <Button children="Go back" onPress={onClose}  />
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
