import React from 'react';
import {View, Text} from 'react-native';

const InterestedButton = () => {
  return (
    <View
      style={{
        backgroundColor: '#ef4565',
        padding: 16,
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: '#FFF',
          fontWeight: '700',
          fontSize: 16,
          letterSpacing: 1,
        }}>
        Interested
      </Text>
    </View>
  );
};

export default InterestedButton;
