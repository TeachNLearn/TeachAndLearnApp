import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import InputHolder from '../inputComponents/inputHolder';
import MultipleInput from '../inputComponents/multipleInput';
import ArrChip from '../inputComponents/arrChip';
import ImagePicker from 'react-native-image-crop-picker';
import DocUploadSvg from '../svgComponents/DocUploadSvg';
import {subjects} from '../../data/SUBJECT_LIST.json';
import {languages} from '../../data/LANGUAGE_LIST.json';
import {standard} from '../../data/STANDARD_LIST.json';

interface UserInfo {
  photo: string;
  number: string;
  course: string;
  standard: string;
  interestedSubject: string;
  interestedSubjects: string[];
  strongSubject: string;
  strongSubjects: string[];
  language: string;
  preferredLanguages: string[];
}

type UserInfoFormProps = UserInfo & {
  updateFields: (fields: Partial<UserInfo>) => void;
};

const UserInfoForm = (props: UserInfoFormProps) => {
  const [image, setImage] = useState<string | undefined>(props.photo);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      setImage(result.path);
      props.updateFields({photo: result.path});
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };
  return (
    <View style={styles.formContainer}>
      <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
        <Text style={styles.profilePicLabel}>Profile pic</Text>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image source={{uri: image}} style={styles.image} />
            <Text style={{color: '#000', marginRight: 20}}>
              Profile pic uploaded
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <DocUploadSvg />
            <Text>Click to Upload</Text>
          </View>
        )}
      </TouchableOpacity>
      <InputHolder
        type="text"
        label="Phone Number"
        value={props.number}
        name="number"
        updateFields={props.updateFields}
        placeholderText="Phone Number"
        showLabel={true}
      />
      <InputHolder
        type="text"
        label="Course/Exam/Board/Degree"
        value={props.course}
        name="course"
        updateFields={props.updateFields}
        // hasDropdown={true}
        // dropdownData={}
        isRequired={true}
        placeholderText="Currently preparing for"
        showLabel={true}
      />
      <InputHolder
        type="text"
        label="Standard/Year"
        value={props.standard}
        name="standard"
        updateFields={props.updateFields}
        isRequired={false}
        placeholderText="Standard/Year"
        showLabel={true}
        hasDropdown={true}
        dropdownData={standard}
      />
      <View style={styles.inputWrapper}>
        <MultipleInput
          name="interestedSubjects"
          arr={props.interestedSubjects}
          elemName="interestedSubject"
          value={props.interestedSubject}
          label="Interested Subjects"
          placeholder="Subjects you mostly need help in"
          showLabel={true}
          updateFields={props.updateFields}
          hasDropdown={true}
          dropdownData={subjects}
          maxLimit={5}
        />
        {props.interestedSubjects.length != 0 ? (
          <ArrChip
            listArr={props.interestedSubjects}
            updateFields={props.updateFields}
            name="interestedSubjects"
          />
        ) : null}
      </View>
      <View style={styles.inputWrapper}>
        <MultipleInput
          label="Strong Subjects"
          value={props.strongSubject}
          elemName="strongSubject"
          name="strongSubjects"
          updateFields={props.updateFields}
          arr={props.strongSubjects}
          hasDropdown={true}
          dropdownData={subjects}
          maxLimit={5}
          placeholder="Subject you can help others in"
          showLabel={true}
        />
        {props.strongSubjects.length != 0 ? (
          <ArrChip
            listArr={props.strongSubjects}
            updateFields={props.updateFields}
            name="strongSubjects"
          />
        ) : null}
      </View>
      <View style={styles.inputWrapper}>
        <MultipleInput
          label="Preferred Languages"
          value={props.language}
          elemName="language"
          name="preferredLanguages"
          updateFields={props.updateFields}
          arr={props.preferredLanguages}
          placeholder="Preffered languages"
          showLabel={true}
          hasDropdown={true}
          dropdownData={languages}
          maxLimit={3}
        />
        {props.preferredLanguages.length != 0 ? (
          <ArrChip
            listArr={props.preferredLanguages}
            updateFields={props.updateFields}
            name="preferredLanguages"
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 28,
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  imagePicker: {
    width: '100%',
    paddingVertical: 15,
    paddingRight: 0,
    paddingLeft: 10,
    borderWidth: 1.5,
    borderColor: '#d5d9eb',
    borderRadius: 8,
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    flexDirection: 'column',

    position: 'relative', // Added for positioning
  },
  profilePicLabel: {
    position: 'absolute',
    top: 0,
    left: 10,
    pointerEvents: 'none',
    zIndex: 100,
    fontSize: 11,
    backgroundColor: 'white',
    color: '#b3b8db',
    paddingHorizontal: 5,
    transform: [{translateY: -7}],
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default UserInfoForm;
