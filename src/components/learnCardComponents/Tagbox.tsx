import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FONT_FAMILY } from '../../utils/globalContants';

interface tagProps {
  tags: string[];
}

const Tagbox = (props: tagProps) => {
  return (
    <View style={styles.container}>
      {props.tags.map((tag, idx) => {
        return (
          <Text key={idx} style={[styles.tag, idx == 0 && styles.lang]}>
            {tag}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 10,
  },
  tag: {
    borderColor: 'grey',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: '#000',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontWeight: '500',
    fontSize: 16,
    borderRadius: 6,
  },
  lang: {
    color: '#ef4565',
    fontWeight: '700',
  },
});

export default Tagbox;
