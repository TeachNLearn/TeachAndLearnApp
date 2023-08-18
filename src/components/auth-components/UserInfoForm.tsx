import React from 'react';
import {StyleSheet, View} from 'react-native';
import InputHolder from '../input/inputHolder';
import MultipleInput from '../input/multipleInput';

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
  return (
    <View style={styles.formContainer}>
      <InputHolder
        type="text"
        label="Phone Number"
        value={props.number}
        name="number"
        updateFields={props.updateFields}
        placeholderText="Phone Number"
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
      />
      <InputHolder
        type="text"
        label="Standard/Year"
        value={props.standard}
        name="standard"
        updateFields={props.updateFields}
        isRequired={false}
        placeholderText="Standard/Year"
        isMultiInput={true}
      />
      <View>
        <MultipleInput
          name="interestedSubjects"
          arr={props.interestedSubjects}
          elemName="interestedSubject"
          value={props.interestedSubject}
          label="Interested Subjects"
          updateFields={props.updateFields}
          // dropdownData={}
          hasDropdown={false}
          maxLimit={5}
        />
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
});

export default UserInfoForm;
