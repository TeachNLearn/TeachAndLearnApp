import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Pressable, View} from 'react-native';
import { COLORS_ELEMENTS, FONT_FAMILY } from '../../utils/globalContants';

interface btnProps {
  children: string | JSX.Element;
  onPress: any;
  containerStyles: Object;
}

const Button = ({children, onPress, containerStyles}: btnProps) => {
  return (
    <TouchableOpacity
      style={[styles.pressableContainer, containerStyles]}
      onPress={onPress}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 4,
        }}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  text: {
    color: COLORS_ELEMENTS.buttonTxt,
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',

    // line-height: normal;
  },
});

export default Button;
