import {Link} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ArrowIcon from '../SVGComponents/ArrowIcon';
import {Linking} from 'react-native';

interface callProps {
  callLink: string;
}

const JoinClass = (props: callProps) => {
  return (
    <View>
      {!props.callLink ? null : (
        <TouchableOpacity
          style={styles.container}
          onPress={() => Linking.openURL(props.callLink)}>
          <Text style={styles.text}>Join Class</Text>
          <ArrowIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    alignSelf: 'flex-start',
    backgroundColor: '#094067',
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: 1,
    color: '#ffffff',
  },
});

export default JoinClass;
