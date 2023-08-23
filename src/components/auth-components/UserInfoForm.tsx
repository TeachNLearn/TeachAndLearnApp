import React from 'react';
import {StyleSheet, View} from 'react-native';
import InputHolder from '../input/inputHolder';
import MultipleInput from '../input/multipleInput';
import ArrChip from '../input/arrChip';

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
          hasDropdown={false}
          maxLimit={5}
        />
        {props.interestedSubjects.length != 0 ? (
          <ArrChip
            listArr={props.interestedSubjects}
            // updateFields={props.updateFields}
            // name="interestedSubjects"
          />
        ) : null}
      </View>
      <View style={styles.inputWrapper}>
        <MultipleInput
          label="Subjects you can help others in"
          value={props.strongSubject}
          elemName="strongSubject"
          name="strongSubjects"
          updateFields={props.updateFields}
          arr={props.strongSubjects}
          // hasDropdown={true}
          // dropdownData={subjects}
          maxLimit={5}
          placeholder="Subject you can help others in"
          showLabel={true}
        />
        {props.strongSubjects.length != 0 ? (
          <ArrChip
            listArr={props.strongSubjects}
            // updateFields={props.updateFields}
            // name="strongSubjects"
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
          // hasDropdown={true}
          // dropdownData={languages}
          maxLimit={3}
        />
        {props.preferredLanguages.length != 0 ? (
          <ArrChip
            listArr={props.preferredLanguages}
            // updateFields={props.updateFields}
            // name="preferredLanguages"
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
});

export default UserInfoForm;
