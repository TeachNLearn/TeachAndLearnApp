import React, { useState } from 'react';
import { View , StyleSheet , Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import InputHolder from '../../inputComponents/inputHolder'; // Make sure the import path is correct
import Button from '../../general-components/button' ;
interface FormData {
  username: string;
  PhoneNumber:String;
  email: string;
}

interface MyFormProps {}

const EditContactInfo: React.FC<MyFormProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    PhoneNumber: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (inputIdentifier: keyof FormData, enteredValue: string) => {
    // Update the formData state with the new value
    setFormData({ ...formData, [inputIdentifier]: enteredValue });
  };

  const handleSubmit = () => {
    // Handle form submission with formData
    console.log(formData);
  };

  return (
    <View style={{width:"100%" , height:'100%', backgroundColor:'#FFF'}}>

    
    <View style={styles.container}>
      {/* Use InputHolder component for username input */}
      <Text style={{marginTop:20 , marginBottom:20 ,}}>Change Username</Text>
      <InputHolder
        value={formData.username}
        type="text"
        updateFields={handleInputChange}
        name="username"
        label="Username"
        placeholderText="Enter your username"
        isRequired={true}
        showLabel={true}
      />

      {/* Use InputHolder component for password input */}
       <Text  style={{marginTop:20 , marginBottom:20 ,}}>Change Email</Text>
      <InputHolder
        value={formData.email}
        type="password"
        updateFields={handleInputChange}
        name="email"
        label="email"
        placeholderText="Enter your email"
        isRequired={true}
        showLabel={true}
      />

      {/* Use InputHolder component for email input */}
       <Text  style={{marginTop:20 , marginBottom:20 ,}}>Change Phone Number</Text>
      <InputHolder
        value={formData.email}
        type="PhoneNumber"
        updateFields={handleInputChange}
        name="Phone"
        label="Phone"
        placeholderText="Enter your Phone Number"
        isRequired={true}
        showLabel={true}
        
      />

      {/* Submit button */}
      <Text style={{marginTop:20 , marginBottom:20 ,}}></Text>
      
      <Button containerStyles={{backgroundColor:'#ef4565'}} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            'Edit Contact Info'
          )}
        </Button>
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
   
    margin:40 ,
    backgroundColor:'#FFF' ,
  },
});

export default EditContactInfo;
