import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface tagProps {
  tags: string[];
}

const Tagbox = (props: tagProps) => {
  return (
    <View style={styles.container}>
      {props.tags.map((tag, idx) => {
        return (
          <Text key={idx} style={styles.tag}>
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
    // marginTop: 20,
    // marginBottom: 90,
  },
  tag: {
    flex: 1,
    flexWrap: 'wrap',
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    color: '#000',
    width: '20%',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontWeight: '500',
    height: 40,
    fontSize: 16,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default Tagbox;
