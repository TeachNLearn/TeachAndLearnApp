import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import InputHolder from "../../components/input/inputHolder";
import { AuthContext } from "../../store/auth-context";
import { getHeaders } from "../../utils/helperFunctions";
import { BASE_URL, apiVersion } from "../../utils/apiRoutes";
import axios from "axios";
import FormField from "../../components/general-components/FormField";
import MultipleInput from "../../components/input/multipleInput";
import Button from "../../components/general-components/button";
import ArrChip from "../../components/input/arrChip";

interface learnCardDetails {
  subject: string;
  topic: string;
  programme: string;
  standard: string;
  preferredLanguage: string;
  description: string;
  expectation: string;
  tag: string;
  tags: string[];
  dueDate: string;
}

const initialData: learnCardDetails = {
  subject: "",
  topic: "",
  programme: "",
  standard: "",
  preferredLanguage: "",
  description: "",
  expectation: "",
  tag: "",
  tags: [],
  dueDate: "",
};

const CreateLearnCard = () => {
  const [learnCard, setLearnCard] = useState<learnCardDetails>(initialData);

  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string>(authCtx.token);
  const [isLoading, setIsLoading] = useState(false);

  function updateFields(fields: Partial<learnCardDetails>) {
    setLearnCard((prev) => {
      return { ...prev, ...fields };
    });
  }

  const learnCardHandler = async (e: any) => {
    e.preventDefault();
    console.log(learnCard);
    // if (handleValidation()) {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}${apiVersion}/learn`,
        {
          subject: learnCard.subject,
          topic: learnCard.topic,
          programme: learnCard.programme,
          standard: learnCard.standard,
          preferredLanguage: learnCard.preferredLanguage,
          description: learnCard.description,
          tags: learnCard.tags,
          dueDate: learnCard.dueDate,
        },
        {
          headers: getHeaders(userToken),
        }
      )
      .then(({ data }) => {
        console.log(data);
        setLearnCard(initialData);
        setIsLoading(false);
        //   navigate("/requests");
      })
      .catch((data) => {
        setIsLoading(false);
        console.log(data);

        //   const errors = data.response.data.error.errors;
        //   Object.keys(errors).forEach(function (err, index) {
        //     toast.error(errors[err].message, toastOptions);
        //   });
      });
    // }
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<string>("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormField
          elem={
            <InputHolder
              type="text"
              label="Subject"
              value={learnCard.subject}
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
              name="topic"
              value={learnCard.topic}
              updateFields={updateFields}
              placeholderText="Pythagoras’ Theorem, World War 2, Balance Sheet, Leibniz Rule, etc."
              type="text"
              isTextarea={true}
              textareaLines={4}
            />
          }
          inputDesc="Topic"
        />
        <FormField
          elem={
            <InputHolder
              type="text"
              label="Course/Exam/Board/Programme"
              value={learnCard.programme}
              name="programme"
              updateFields={updateFields}
              hasDropdown={false}
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
              value={learnCard.standard}
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
              value={learnCard.preferredLanguage}
              name="preferredLanguage"
              updateFields={updateFields}
              // hasDropdown={true}
              // dropdownData={languages}
              placeholderText="Hindi, English, Tamil, Marathi, French etc"
            />
          }
          inputDesc="Preferred Language"
        />
        {/* <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        /> */}
        <FormField
          elem={
            <InputHolder
              type="text"
              label="Description"
              name="description"
              updateFields={updateFields}
              value={learnCard.description}
              placeholderText="Can not exceed 400 characters"
              isTextarea={true}
              textareaLines={8}
            />
          }
          inputDesc="Description of the query"
        />
        <FormField
          elem={
            <View>
              <MultipleInput
                label="Tags"
                elemName="tag"
                value={learnCard.tag}
                name="tags"
                arr={learnCard.tags}
                updateFields={updateFields}
                maxLimit={5}
                placeholder="Physics, #BusinessManagement (optional)"
              />
              {learnCard.tags.length != 0 ? (
                <ArrChip
                  listArr={learnCard.tags}
                  // updateFields={updateFields}
                  // name="tags"
                />
              ) : null}
            </View>
          }
          inputDesc="Tags to add"
        />
        <Button onPress={learnCardHandler}>
          {isLoading ? <ActivityIndicator size={24} color="white"    /> : "Create Learn Card"}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 40,
    display: "flex",
    flexDirection: "column",
    rowGap: 24,
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
});

export default CreateLearnCard;