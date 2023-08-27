import React from 'react';
import {View, Text} from 'react-native';

interface descriptioProps {
  programme: string;
  standard: string;
  description: string;
}

const CardDescription = (props: descriptioProps) => {
  return (
    <View>
      <Text style={{marginTop: 20, color: '#000', fontFamily: 'Nunito'}}>
        For :- {props.programme} {props.standard && ' | '}
        {props.standard ? props.standard : null}
      </Text>
      <Text
        style={{
          marginTop: 20,
          color: '#000',
          fontFamily: 'Nunito',
          fontWeight: '400',
          fontSize: 16,
        }}>
        {props.description}
      </Text>
    </View>
  );
};

export default CardDescription;
