import React, { useState } from 'react';
import { View , StyleSheet , Text,  ActivityIndicator} from 'react-native';
import InputHolder from '../../inputComponents/inputHolder'; // Make sure the import path is correct
import Button from '../../general-components/button' ;
import ScreenHeader from '../../general-components/ScreenHeader';
interface FormData {
  image: string;
  tagline:String;

}

interface MyFormProps {}

const EditUserProfile: React.FC<MyFormProps> = (props) => {
  const [formData, setFormData] = useState<FormData>({
    image: '',
    tagline: '',

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

    <ScreenHeader
    title='Edit Profile'
    onBackPress={()=>{props.navigation.goBack()}}
    />
    <View style={styles.container}>
      {/* Use InputHolder component for username input */}

      <Text style={{marginTop:20 , marginBottom:20 ,}}>Change Image</Text>
      <InputHolder
        value={formData.image}
        type="text"
        updateFields={handleInputChange}
        name="image"
        label="Image"
        placeholderText="Upload image"
        isRequired={true}
        showLabel={true}
      />

      {/* Use InputHolder component for password input */}
       <Text  style={{marginTop:20 , marginBottom:20 ,}}>Change Tagline</Text>
      <InputHolder
        value={formData.tagline}
        type="password"
        updateFields={handleInputChange}
        name="tagline"
        label="Tagline"
        placeholderText="Enter your "tagline
        isRequired={true}
        showLabel={true}
      />

      {/* Submit button */}
      <Text style={{marginTop:0 , marginBottom:10 ,}}></Text>
      
      <Button containerStyles={{backgroundColor:'#ef4565'}} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            'Edit Profile'
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

export default EditUserProfile;
