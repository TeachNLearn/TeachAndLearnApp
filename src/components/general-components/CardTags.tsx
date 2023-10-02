import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS_ILLUSTRATION, FONT_FAMILY} from '../../utils/globalContants';

interface tagProps {
  tags: string[];
}

const CardTags = (props: tagProps) => {
  return (
    <View style={styles.container}>
      {props.tags.map((tag, idx) => {
        return (
          <Text key={idx} style={[styles.tag]}>
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#fff',
    backgroundColor: COLORS_ILLUSTRATION.highlight,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontWeight: '500',
    fontSize: 16,
    borderRadius: 6,
  },
});

export default CardTags;
