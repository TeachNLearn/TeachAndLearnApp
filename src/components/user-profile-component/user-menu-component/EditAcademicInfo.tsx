import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InputHolder from '../../inputComponents/inputHolder'; // Make sure the import path is correct
import Button from '../../general-components/button';
import MultipleInput from '../../inputComponents/multipleInput'; // Import the MultipleInput component
// import ArrChip from '../../input/arrChip';


interface FormData {
  username: string;
  tags: string[]; // Add a tags property to store multiple tags
}

interface MyFormProps {}

const EditAcademicInfo: React.FC<MyFormProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    tags: [], // Initialize tags as an empty array
  });

  const handleInputChange = (inputIdentifier: keyof FormData, enteredValue: string) => {
    // Update the formData state with the new value
    setFormData({ ...formData, [inputIdentifier]: enteredValue });
  };

  const handleSubmit = () => {
    // Handle form submission with formData
    console.log(formData);
  };

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#FFF' }}>
      <View style={styles.container}>
        {/* Use InputHolder component for username input */}
        <Text style={{ marginTop: 20, marginBottom: 20 }}>Change Course</Text>
        <InputHolder
          value={formData.username}
          type="text"
          updateFields={handleInputChange}
          name="username"
          label="Course"
          placeholderText="Enter your Course"
          isRequired={true}
          showLabel={true}
        />

        {/* Use MultipleInput component to add tags */}
        <MultipleInput
          value={formData.tags}
          label="Add Tags"
          name="tags"
          arr={formData.tags}
          elemName="tag"
          updateFields={handleInputChange}
          placeholder="Enter a tag"
          showLabel={true}
          maxLimit={5} // Set your desired maximum limit
        />
          {/* .tags.length != 0 ? (
          <ArrChip
            listArr={formData.tags}
            // updateFields={props.updateFields}
            // name="interestedSubjects"
          />
        ) : null} */}

        <Button onPress={handleSubmit}>Edit Academic Info</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 40,
    backgroundColor: '#FFF',
  },
});

export default EditAcademicInfo;
