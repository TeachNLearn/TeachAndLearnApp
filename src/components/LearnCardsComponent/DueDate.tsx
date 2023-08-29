import React from 'react';
import {View, Text} from 'react-native';
import {getReadableDate} from '../../utils/helperFunctions';

interface dueDateProps {
  dueDate: string;
}

const DueDate = ({dueDate}: dueDateProps) => {
  return (
    <View
      style={{
        backgroundColor: '#094067',
        padding: 15,
        width: '50%',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 30,
      }}>
      <Text
        style={{
          color: '#FFF',
          fontSize: 15,
          fontWeight: '600',
          fontFamily: 'Nunito',
        }}>
        Due By- {getReadableDate(dueDate)}
      </Text>
    </View>
  );
};

export default DueDate;
