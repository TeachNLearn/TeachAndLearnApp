import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface timeInputProps {
  updateFields: any;
  name: string;
  placeholderText?: string;
}

const TimeInput = (props: timeInputProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const timeHandler = (inputTime: Date) => {
    setOpen(false);
    setDate(inputTime);
    console.log(inputTime);

    // const ISOString = inputDate.toISOString();
    // props.updateFields({[props.name]: ISOString});

    // let year = inputDate.getFullYear();
    // let monthIdx = inputDate.getMonth();
    // let month = months[monthIdx];
    // let day = inputDate.getDate();
    // setReadableDate(month + ' ' + day + ', ' + year);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.datePicker}>
          <Text style={styles.insideText}>{props.placeholderText}</Text>
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={time => {
          timeHandler(time);
        }}
        mode="time"
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    width: '100%',
    paddingVertical: 14,
    paddingRight: 0,
    paddingLeft: 10,
    borderWidth: 1.5,
    borderColor: '#d5d9eb',
    borderRadius: 8,
  },
  insideText: {
    color: '#acacac',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default TimeInput;
