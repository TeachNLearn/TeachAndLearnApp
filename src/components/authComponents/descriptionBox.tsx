import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import CircleSvg1 from '../svgComponents/CircleSvg1';
import CircleSvg2 from '../svgComponents/CircleSvg2';

interface descriptionBoxProps {
  heading: string;
  subHeading: string;
  text: string;
}

const DescriptionBox = (props: descriptionBoxProps) => {
  return (
    <View style={styles.upperContainer}>
      <View style={styles.upperCircle}>
        <CircleSvg1 />
      </View>
      <View style={styles.lowerCircle}>
        <CircleSvg2 />
      </View>
      <Text style={styles.text}>{props.heading}</Text>
      <Text style={styles.text}>{props.subHeading}</Text>
      <Text style={styles.smallerText}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#094067',
    width: '100%',
    paddingTop: 90,
    paddingBottom: 30,
    paddingLeft: 16,
    position: 'relative',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: 46,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 52,
  },
  smallerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '300',
    marginTop: 12,
  },
  upperCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    transform: [{translateX: -35}, {translateY: -25}],
  },
  lowerCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
    transform: [{translateX: -50}, {translateY: -20}],
  },
});

export default DescriptionBox;
