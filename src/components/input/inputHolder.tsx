import React, {useEffect, useRef, useState} from 'react';
import {
  InputModeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

interface inputProps {
  value: string;
  type: string;
  updateFields: any;
  name: string;
  label?: string;
  placeholderText?: string;
  hasDropdown?: boolean;
  dropdownData?: string[];
  isRequired?: boolean;
  isTextarea?: boolean;
  textareaLines?: number;
  showLabel?: boolean;
  hasSignleUpdate?: boolean;
}

const InputHolder = (props: inputProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const inputhandler = (inputIdentifier: any, enteredValue: any) => {
    setShowDropdown(true);
    props.updateFields({[inputIdentifier]: enteredValue});
  };

  const dropdownMenuhandler = (data: string) => {
    props.updateFields({[props.name]: data});
    setShowDropdown(false);
  };

  const closeDropDown = () => {
    setShowDropdown(false);
  };

  const singleUpdate = (enteredValue: any) => {
    props.updateFields(enteredValue);
  };

  return (
    <View>
      <TextInput
        style={[styles.input, props.isTextarea && styles.textAreaInput]}
        value={props.value}
        autoCapitalize="none"
        placeholder={props.placeholderText}
        secureTextEntry={props.type == 'password'}
        onChangeText={
          !props.hasSignleUpdate
            ? inputhandler.bind(this, props.name)
            : singleUpdate
        }
        multiline={props.isTextarea}
        numberOfLines={props.textareaLines ? props.textareaLines : 1}
      />
      {props.showLabel && <Text style={[styles.label]}>{props.label}</Text>}
      {props.isRequired && (
        <View style={styles.requiredContainer}>
          <Text style={styles.requiredText}>*required</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   position: "relative",
  //   width: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  // },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingRight: 0,
    paddingLeft: 10,
    borderWidth: 1.5,
    borderColor: '#d5d9eb',
    borderRadius: 8,
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  textAreaInput: {
    paddingTop: 17,
    textAlignVertical: 'top',
  },
  label: {
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
  requiredContainer: {
    marginLeft: 8,
  },
  requiredText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 0.8,
    textTransform: 'capitalize',
  },
});

export default InputHolder;