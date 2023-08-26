import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {autoGenerateImage, getHeaders} from '../../utils/helperFunctions';
import axios from 'axios';
import {BASE_URL, apiVersion} from '../../utils/apiRoutes';
import {AuthContext} from '../../store/auth-context';
import FormField from '../../components/general-components/FormField';
import InputHolder from '../../components/input/inputHolder';
import MultipleInput from '../../components/input/multipleInput';
import ArrChip from '../../components/input/arrChip';
import Button from '../../components/general-components/button';
import DateInput from '../../components/input/DateInput';
import TimeInput from '../../components/input/TimeInput';

interface teachCardDetails {
  subject: string;
  topic: string;
  programme: string;
  standard: string;
  preferredLanguage: string;
  photo: string;
  date: string;
  description: string;
  tag: string;
  tags: string[];
  startingTime: string;
  endingTime: string;
}

const initialData: teachCardDetails = {
  subject: '',
  topic: '',
  programme: '',
  standard: '',
  preferredLanguage: '',
  photo: '',
  date: '',
  description: '',
  tag: '',
  tags: [],
  startingTime: '',
  endingTime: '',
};

const CreateTeachCard = ({route}: any) => {
  const [teachCard, setTeachCard] = useState<teachCardDetails>(initialData);
  //   const [learnCardId, setLearnCardId] = useState<string>(route.params.id);
  const [isLearnCardReferred, setIsLearnCardReferred] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  function updateFields(fields: Partial<teachCardDetails>) {
    setTeachCard(prev => {
      return {...prev, ...fields};
    });
  }

  //   add a seEffect to check if its from learn card

  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState(authCtx.token);

  const teachCardHandler = async (e: any) => {
    e.preventDefault();
    console.log(teachCard);
    const img = await autoGenerateImage(teachCard.subject);
    // console.log(img);
    // if (handleValidation()) {
    if (!img) {
      return;
    }
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}${apiVersion}/teach`,
        {
          subject: teachCard.subject,
          topic: teachCard.topic,
          programme: teachCard.programme,
          standard: teachCard.standard,
          date: teachCard.date,
          preferredLanguage: teachCard.preferredLanguage,
          cardBanner: img,
          classStartsAt: teachCard.startingTime,
          classEndsAt: teachCard.endingTime,
          description: teachCard.description,
          tags: teachCard.tags,
        },
        {
          headers: getHeaders(userToken),
        },
      )
      .then(({data}: any) => {
        console.log(data);
        setTeachCard(initialData);
        setIsLoading(false);
      })
      .catch((data: any) => {
        // setTeachCard(initialData);
        setIsLoading(false);
        console.log(data);
      });
    // }
  };

  //   const teachCardOnLeanrCardHandler = async (e: any) => {
  //     const img = autoGenerateImage(teachCard.subject);
  //     // if (handleValidation()) {
  //     setIsLoading(true);
  //     await axios
  //       .post(
  //         `${BASE_URL}${apiVersion}/learn/${learnCardId}/teach`,
  //         {
  //           subject: teachCard.subject,
  //           topic: teachCard.topic,
  //           programme: teachCard.programme,
  //           standard: teachCard.standard,
  //           date: teachCard.date,
  //           preferredLanguage: teachCard.preferredLanguage,
  //           cardBanner: img,
  //           classStartsAt: teachCard.startingTime,
  //           classEndsAt: teachCard.endingTime,
  //           description: teachCard.description,
  //           tags: teachCard.tags,
  //         },
  //         {
  //           headers: getHeaders(userToken),
  //         }
  //       )
  //       .then(({ data }) => {
  //         console.log(data);
  //         setTeachCard(initialData);
  //         setIsLoading(false);
  //       })
  //       .catch((data) => {
  //         setIsLoading(false);
  //         console.log(data);
  //       });
  //     // }
  //   };

  return (
    <ScrollView>
      <KeyboardAvoidingView enabled={true} behavior="height">
        <View style={styles.container}>
          <FormField
            elem={
              <InputHolder
                type="text"
                label="Subject"
                value={teachCard.subject}
                name="subject"
                updateFields={updateFields}
                // hasDropdown={true}
                // dropdownData={subjects}
                placeholderText="Physics, English, Botany, Accounts. etc."
              />
            }
            inputDesc="Subject"
          />
          <FormField
            elem={
              <InputHolder
                label="Topic"
                value={teachCard.topic}
                name="topic"
                updateFields={updateFields}
                type="text"
                textareaLines={4}
                isTextarea={true}
                placeholderText="Pythagoras’ Theorem, World War 2, Balance Sheet, Leibniz Rule, etc."
              />
            }
            inputDesc="Topic"
          />
          <FormField
            elem={
              <InputHolder
                type="text"
                label="Course/Exam/Board/Programme"
                value={teachCard.programme}
                name="programme"
                updateFields={updateFields}
                placeholderText="I.C.S.E, B.Tech, NEET, UPSC, etc."
              />
            }
            inputDesc="Course/Exam/Board/Programme"
          />
          <FormField
            elem={
              <InputHolder
                type="text"
                label="Standard"
                value={teachCard.standard}
                name="standard"
                updateFields={updateFields}
                // hasDropdown={true}
                // dropdownData={standard}
                placeholderText="10th class/2nd year etc (optional)"
              />
            }
            inputDesc="Standard/Year"
          />
          <FormField
            elem={
              <InputHolder
                type="text"
                label="Preferred Language"
                value={teachCard.preferredLanguage}
                name="preferredLanguage"
                updateFields={updateFields}
                // hasDropdown={true}
                // dropdownData={languages}
                placeholderText="Hindi, English, Tamil, Marathi, French etc"
              />
            }
            inputDesc="Preferred Language"
          />
          <FormField
            elem={
              <DateInput
                label="Date"
                name="date"
                updateFields={updateFields}
                placeholderText="Pick a Date"
              />
            }
            inputDesc="Date"
          />
          <FormField
            elem={
              <TimeInput
                name="startingTime"
                updateFields={updateFields}
                placeholderText="Pick Starting Time"
              />
            }
            inputDesc="Starting Time"
          />
          <FormField
            elem={
              <TimeInput
                name="endingTime"
                updateFields={updateFields}
                placeholderText="Pick End Time"
              />
            }
            inputDesc="End Time"
          />
          <FormField
            elem={
              <InputHolder
                type="text"
                label="Description"
                name="description"
                updateFields={updateFields}
                value={teachCard.description}
                textareaLines={6}
                isTextarea={true}
                placeholderText="Can not exceed 400 characters"
              />
            }
            inputDesc="Description of the topic covered"
          />
          <FormField
            elem={
              <View>
                <MultipleInput
                  label="Tag"
                  elemName="tag"
                  value={teachCard.tag}
                  name="tags"
                  arr={teachCard.tags}
                  updateFields={updateFields}
                  placeholder="#Physics, #BusinessManagement (optional)"
                />
                {teachCard.tags.length != 0 ? (
                  <ArrChip
                    listArr={teachCard.tags}
                    // name="tags"
                    // updateFields={updateFields}
                  />
                ) : null}
              </View>
            }
            inputDesc="Tags"
          />
          <Button onPress={teachCardHandler}>
            {isLoading ? (
              <ActivityIndicator size={24} color="white" />
            ) : (
              'Create Teach Card'
            )}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 24,
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
});

export default CreateTeachCard;
