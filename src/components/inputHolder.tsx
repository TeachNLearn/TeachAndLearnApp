import React, { useEffect, useRef, useState } from "react";
import {
  InputModeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import styled from "styled-components/native";

const Section = styled.View`
  /* border: 1px solid red; */
  position: relative;
  width: 100%;
  box-sizing: border-box;
  /* font-family: "Nunito"; */
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px 0px 15px 10px;

  border: 1.5px solid #d5d9eb;
  border-radius: 8px;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
`;

interface labelProps {
  isValid: boolean;
}

const Label = styled.Text<labelProps>`
  position: absolute;
  top: 0;
  /* font-family: "Nunito"; */
  left: 10px;
  pointer-events: none;
  z-index: 100;
  font-size: 11px;
  background-color: white;
  color: #b3b8db;
  padding: 0 5px;
  transform: translateY(-5px);
`;

const RequiredText = styled.View`
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.8rem;
  text-transform: capitalize;
  margin-left: 0.5rem;
`;

interface inputProps {
  value: string;
  type: string;
  updateFields: any;
  name: string;
  label: string;
  placeholderText?: string;
  hasDropdown?: boolean;
  dropdownData?: string[];
  isRequired?: boolean;
  isMultiInput?: boolean;
}

const InputHolder = (props: inputProps) => {
  const [inputType, setInputType] = useState(props.type);
  const [isValid, setisValid] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlaceholder, setshowPlaceholder] = useState(true);

  useEffect(() => {
    if (typeof props.value == "string") {
      if (props.value?.trim().length > 0) {
        setisValid(true);
      }
    } else if (typeof props.value == "number") {
      if (props.value >= 0) {
        setisValid(true);
      }
    }
  }, [props]);

  const inputhandler = (inputIdentifier: any, enteredValue: any) => {
    // console.log(enteredValue);
    // if (enteredValue == "Enter") {
    //   console.log("fknvnf");

    // }

    setShowDropdown(true);
    props.updateFields({ [inputIdentifier]: enteredValue });

    const value = enteredValue;

    if (value?.trim().length > 0) {
      setisValid(true);
      setshowPlaceholder(false);
    } else {
      // setshowPlaceholder(true);
      setisValid(false);
    }
  };

  const dropdownMenuhandler = (data: string) => {
    props.updateFields({ [props.name]: data });
    setShowDropdown(false);
  };

  const closeDropDown = () => {
    setShowDropdown(false);
  };

  const keyhandler = (e: any) => {
    // console.log(e.nativeEvent.key);
    console.log("kfjvnvnk");
    // console.log(e);
    
    // if (e.nativeEvent.key == "Enter") {
    // }
  };

  return (
    <Section>
      <Input
        value={props.value}
        onFocus={() => setshowPlaceholder(false)}
        placeholder={props.placeholderText}
        onChangeText={inputhandler.bind(this, props.name)}
        autoCapitalize="none"
        secureTextEntry={props.type == "password"}
        onEndEditing={props.isMultiInput ? (e: any) => keyhandler(e) : undefined}
      />
      <Label isValid={isValid}>{props.label}</Label>
      {props.isRequired && (
        <RequiredText>
          <Text>*required</Text>
        </RequiredText>
      )}
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: "relative",
    width: "100%",
    height: 40,
  },
  input: {
    width: "100%",
    height: "100%",
    paddingVertical: 15,
    paddingRight: 0,
    paddingLeft: 10,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#d5d9eb",
    borderRadius: 8,
    color: "#000000",
    fontSize: 16,
    fontWeight: "400",
  },
  label: {
    position: "absolute",
    top: 0,
    left: 10,
    transform: [{ translateY: 19 }],
    pointerEvents: "none",
    fontSize: 16,
    lineHeight: 1,
    borderWidth: 2,
    borderColor: "black",
  },
  validLabel: {
    transform: [{ translateX: 5 }, { translateY: -5 }],
    fontSize: 20,
    backgroundColor: "white",
    // color: "#b3b8db",
    color: "black",
    paddingVertical: 0,
    paddingHorizontal: 5,
  },
  inValidLabel: {
    // transform: [{ translateX: 0 }, { translateY: 0 }],
    fontSize: 16,
    backgroundColor: undefined,
    color: "#564c4d",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  required: {
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: 0.8,
    textTransform: "capitalize",
  },
});

export default InputHolder;
