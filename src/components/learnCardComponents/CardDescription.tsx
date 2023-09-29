import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FONT_FAMILY } from '../../utils/globalContants';

interface descriptioProps {
  programme: string;
  standard: string;
  description: string;
}

const CardDescription = (props: descriptioProps) => {
  return (
    <View>
      <Text style={styles.programme}>
        For :- {props.programme}
        {props.standard && ' | '}
        {props.standard && props.standard}
      </Text>
      <Text style={styles.desc}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  programme: {
    color: '#000',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
  },
  desc: {
    color: '#4A5578',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CardDescription;
