import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Pressable, View} from 'react-native';

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
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    // line-height: normal;
  },
});

export default Button;
