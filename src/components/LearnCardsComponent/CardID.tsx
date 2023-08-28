import React from 'react';
import {View, Text} from 'react-native';

interface cardIdProps {
  id: string;
}

const CardID = (props: cardIdProps) => {
  return (
    <View
      style={{
        backgroundColor: '#094067',
        padding: 16,
        width: '80%',
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
        CardId :- {props.id}
      </Text>
    </View>
  );
};

export default CardID;
