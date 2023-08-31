import React from 'react';
import {Text, View} from 'react-native';
import {getReadableDate, getReadableTime} from '../../utils/helperFunctions';

interface dateProps {
  date: string;
  classEndsAt: string;
  classStartsAt: string;
}

const ClassDate = (props: dateProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '500',
          color: '#4A5578',
        }}>
        {getReadableDate(props.date)}
      </Text>
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 10,
          backgroundColor: '#4A5578',
        }}></View>
      <Text
        style={{
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '500',
          color: '#4A5578',
        }}>
        {getReadableTime(props.classStartsAt)}
        {' - '}
        {getReadableTime(props.classEndsAt)}
      </Text>
    </View>
  );
};

export default ClassDate;