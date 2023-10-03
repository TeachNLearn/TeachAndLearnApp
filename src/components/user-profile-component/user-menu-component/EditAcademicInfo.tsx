import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import InputHolder from '../../inputComponents/inputHolder'; // Make sure the import path is correct
import Button from '../../general-components/button';
import MultipleInput from '../../inputComponents/multipleInput'; // Import the MultipleInput component
import {userProps} from '../../../types/UserTypes';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../../utils/apiRoutes';
import {getHeaders} from '../../../utils/helperFunctions';
import ScreenHeader from '../../general-components/ScreenHeader';
import FormField from '../../general-components/FormField';
import ArrChip from '../../inputComponents/arrChip';
import {subjects} from '../../../data/SUBJECT_LIST.json';
import {languages} from '../../../data/LANGUAGE_LIST.json';
import {COLORS_ILLUSTRATION} from '../../../utils/globalContants';

interface AcademicProps {
  course: string;
  strongSubjects: string[];
  interstedSubjects: Array<string>;
  preferredLanguages: string[];
  strongSubject: string;
  interestedSubject: string;
  language: string;
}

type modalProps = AcademicProps & {
  strongSubject: string;
  interestedSubject: string;
  language: string;
  userToken: string;
  closeModal: any;
  updateFields: (fields: Partial<userProps>) => void;
};

const EditAcademicInfo = (props: modalProps) => {
  const [academicInfo, setAcademicInfo] = useState<AcademicProps>({
    course: props.course,
    interstedSubjects: props.interstedSubjects,
    strongSubjects: props.strongSubjects,
    preferredLanguages: props.preferredLanguages,
    strongSubject: props.strongSubject,
    interestedSubject: props.interestedSubject,
    language: props.language,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    const {course, interstedSubjects, preferredLanguages, strongSubjects} =
      academicInfo;
    if (
      course == '' ||
      interstedSubjects.length == 0 ||
      strongSubjects.length == 0 ||
      preferredLanguages.length == 0
    ) {
      // toast.error("Fill in all the details", toastOptions);
      return false;
    } else if (interstedSubjects.length > 5 || strongSubjects.length > 5) {
      // toast.error("Cannot select more than 5 subjects ", toastOptions);
      return false;
    } else if (preferredLanguages.length > 3) {
      // toast.error("Cannot select more than 3 languages ", toastOptions);
      return false;
    }
    return true;
  };

  const updateFields = (fields: Partial<AcademicProps>) => {
    setAcademicInfo(prev => {
      return {...prev, ...fields};
    });
  };

  const updateUserAcademicInfoHandler = async () => {
    // console.log(academicInfo);
    if (handleValidation()) {
      setIsLoading(true);
      await axios
        .patch(
          `${BASE_URL}${apiVersion}/user/myacademicInfo`,
          {
            enrolledProgramme: academicInfo.course,
            strongSubjects: academicInfo.strongSubjects,
            interestedSubjects: academicInfo.interstedSubjects,
            preferredLanguages: academicInfo.preferredLanguages,
          },
          {
            headers: getHeaders(props.userToken),
          },
        )
        .then(({data}) => {
          console.log(data.updatedUser);
          setIsLoading(false);
        })
        .catch(data => {
          console.log(data);
          setIsLoading(false);
          // error alert
        });
    }
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#FFF'}}>
      <ScreenHeader
        ShowMenuIcon={false}
        title="Academic Info"
        onBackPress={() => {}}
        onMenuPress={() => {}}
      />
      <View style={styles.container}>
        <FormField
          elem={
            <InputHolder
              name="course"
              type="text"
              updateFields={updateFields}
              value={academicInfo.course}
              placeholderText="Enter your Course name"
            />
          }
          inputDesc="Change your course"
        />
        <FormField
          elem={
            <View style={styles.inputWrapper}>
              <MultipleInput
                value={academicInfo.strongSubject}
                elemName="strongSubject"
                name="strongSubjects"
                arr={academicInfo.strongSubjects}
                updateFields={updateFields}
                hasDropdown={true}
                dropdownData={subjects}
                maxLimit={5}
                placeholder="Enter your strong subhjects"
              />
              <ArrChip
                listArr={academicInfo.strongSubjects}
                updateFields={updateFields}
                name="strongSubjects"
              />
            </View>
          }
          inputDesc="Change your striong subjects"
        />
        <FormField
          elem={
            <View style={styles.inputWrapper}>
              <MultipleInput
                value={academicInfo.interestedSubject}
                elemName="interestedSubject"
                name="interstedSubjects"
                arr={academicInfo.interstedSubjects}
                updateFields={updateFields}
                hasDropdown={true}
                dropdownData={subjects}
                maxLimit={5}
                placeholder="Enter your interested subjects"
              />
              <ArrChip
                listArr={academicInfo.interstedSubjects}
                updateFields={updateFields}
                name="interstedSubjects"
              />
            </View>
          }
          inputDesc="Change your Interested Subjects"
        />
        <FormField
          elem={
            <View style={styles.inputWrapper}>
              <MultipleInput
                value={academicInfo.language}
                elemName="language"
                name="preferredLanguages"
                arr={academicInfo.preferredLanguages}
                updateFields={updateFields}
                hasDropdown={true}
                dropdownData={languages}
                maxLimit={3}
                placeholder="Enter your languages"
              />
              <ArrChip
                listArr={academicInfo.preferredLanguages}
                updateFields={updateFields}
                name="preferredLanguages"
              />
            </View>
          }
          inputDesc="Change your Interested Subjects"
        />
        <Button
          onPress={updateUserAcademicInfoHandler}
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
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  button: {
    backgroundColor: COLORS_ILLUSTRATION.tertiary,
  },
});

export default EditAcademicInfo;
