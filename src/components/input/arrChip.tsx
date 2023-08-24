import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatList, View} from 'react-native';

interface arrChipProps {
  listArr: string[];
  // name: string;
  // updateFields: any;
}

const ArrChip = (props: arrChipProps) => {
  return (
    <View style={styles.container}>
      {props.listArr.map((sub, idx) => {
        return (
          <View key={idx} style={styles.chip}>
            <Text style={styles.chipText}>{sub}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 7,
    width: '100%',
  },
  chip: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
    backgroundColor: '#d8eefe',
    borderRadius: 22,
  },
  chipText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 19,
    color: '#000',
  },
});

export default ArrChip;
