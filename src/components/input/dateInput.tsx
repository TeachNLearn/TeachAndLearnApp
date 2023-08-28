import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {months} from '../../utils/globalContants';

interface dateInputProps {
  updateFields: any;
  name: string;
  label: string;
  placeholderText?: string;
  showLabel?: boolean;
}

const DateInput = (props: dateInputProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [readableDate, setReadableDate] = useState<string | null>(null);

  const dateHandler = (inputDate: Date) => {
    setOpen(false);
    setDate(inputDate);

    const ISOString = inputDate.toISOString();
    props.updateFields({[props.name]: ISOString});

    let year = inputDate.getFullYear();
    let monthIdx = inputDate.getMonth();
    let month = months[monthIdx];
    let day = inputDate.getDate();
    setReadableDate(month + ' ' + day + ', ' + year);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.datePicker}>
          <Text style={styles.insideText}>
            {!readableDate ? props.placeholderText : readableDate}
          </Text>
        </View>
        {props.showLabel && <Text style={[styles.label]}>{props.label}</Text>}
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          dateHandler(date);
        }}
        mode="date"
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
});

export default DateInput;
