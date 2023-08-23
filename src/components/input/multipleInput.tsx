import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface InputProps {
  value: string;
  label: string;
  name: string;
  arr: string[];
  elemName: string;
  updateFields: any;
  hasDropdown?: boolean;
  dropdownData?: string[];
  maxLimit?: number;
  placeholder: string;
  showLabel?: boolean;
}

const MultipleInput = (props: InputProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const inputhandler = (inputIdentifier: any, enteredValue: any) => {
    setShowDropdown(true);
    props.updateFields({[inputIdentifier]: enteredValue});
  };

  const keyhandler = (e: any) => {
    if (props.value == '') return;
    props.arr?.push(props.value);
    console.log(props.arr);
    props.updateFields({[props.name]: props.arr, [props.elemName]: ''});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={inputhandler.bind(this, props.elemName)}
        autoCapitalize="none"
        onEndEditing={keyhandler}
        editable={props.maxLimit ? props.arr.length < props.maxLimit : true}
      />
      <Text style={styles.label}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    paddingRight: 0,
    paddingLeft: 10,
    borderWidth: 1.5,
    borderColor: '#d5d9eb',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 10,
    pointerEvents: 'none',
    zIndex: 100,
    fontSize: 11,
    backgroundColor: '#ffffff',
    color: '#b3b8db',
    paddingVertical: 0,
    paddingHorizontal: 5,
    transform: [{translateY: -5}],
  },
});

export default MultipleInput;
