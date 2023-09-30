import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PlusSvg from '../svgComponents/PlusSvg';
import { FONT_FAMILY } from '../../utils/globalContants';

interface btnProps {
  onPressFunc: () => void;
  text: string;
}

const PostForumBtn = (props: btnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPressFunc}>
      <PlusSvg color="#ffffff" />
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
    columnGap: 10,
    backgroundColor: '#ef4565',
    borderRadius: 8,
  },
  text: {
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontStyle: 'normal',
    // fontWeight: '700',
    fontSize: 16,
    lineHeight: 25,
    color: '#ffffff',
  },
});

export default PostForumBtn;
