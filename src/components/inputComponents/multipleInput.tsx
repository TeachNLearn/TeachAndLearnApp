import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

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
    if (e.nativeEvent.key == 'Enter') {
      props.arr?.push(props.value);
      console.log(props.arr);
      props.updateFields({[props.name]: props.arr, [props.elemName]: ''});
    }
  };

  const dropdownMenuhandler = (data: string) => {
    props.arr?.push(data);
    props.updateFields({[props.name]: props.arr, [props.elemName]: ''});
    setShowDropdown(false);
  };

  return (
    <View
      style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={inputhandler.bind(this, props.elemName)}
        autoCapitalize="none"
        onEndEditing={keyhandler}
        editable={props.maxLimit ? props.arr.length < props.maxLimit : true}
      />
      {props.showLabel && <Text style={styles.label}>{props.label}</Text>}
      {props.showLabel && props.maxLimit && (
        <View>
          <Text>*Max {props.maxLimit}</Text>
        </View>
      )}
      {props.hasDropdown
        ? props.value == ''
          ? null
          : showDropdown &&
            (props.dropdownData?.filter(val => {
              if (typeof props.value == 'string') {
                return val.toLowerCase().includes(props.value.toLowerCase());
              }
            }).length == 0 ? null : (
              <View style={styles.dropdownContainer}>
                {props.dropdownData
                  ?.filter(val => {
                    if (typeof props.value == 'string') {
                      return val
                        .toLowerCase()
                        .includes(props.value.toLowerCase());
                    }
                  })
                  .map((data, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => dropdownMenuhandler(data)}>
                        <Text style={styles.dropdownText}>{data}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop:10,
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
  maxLimit: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  dropdownContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: '#d5d9eb',
    borderRadius: 8,
    rowGap: 8,
  },
  dropdownText: {
    color: '#000',
  },
});

export default MultipleInput;
