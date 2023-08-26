import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {getReadableTime} from '../../utils/helperFunctions';

interface timeInputProps {
  updateFields: any;
  name: string;
  placeholderText?: string;
}

const TimeInput = (props: timeInputProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [readableTime, setReadableTime] = useState<string | null>(null);

  const timeHandler = (inputTime: Date) => {
    setOpen(false);
    setDate(inputTime);

    const timestampWithOffset = inputTime.getTime();
    const offset = inputTime.getTimezoneOffset() * 60 * 1000;

    const timestampWithoutOffset = timestampWithOffset - offset;

    const dateWithoutOffset = new Date(timestampWithoutOffset);

    const hour = dateWithoutOffset.getHours();
    let minutes = dateWithoutOffset.getMinutes();

    let concatedTime;
    if (minutes < 10) {
      concatedTime = String(hour + ' : ' + '0' + minutes);
    } else {
      concatedTime = String(hour + ' : ' + minutes);
    }

    setReadableTime(concatedTime);

    const ISOString = dateWithoutOffset.toISOString();
    console.log(getReadableTime(ISOString));
    props.updateFields({[props.name]: ISOString});
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.datePicker}>
          <Text
            style={
              !readableTime ? styles.insidePlaceholder : styles.insideText
            }>
            {!readableTime ? props.placeholderText : readableTime}
          </Text>
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
  insidePlaceholder: {
    color: '#acacac',
    fontSize: 16,
    fontWeight: '400',
  },
  insideText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default TimeInput;
