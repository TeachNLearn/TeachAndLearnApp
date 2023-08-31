import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PlusSvg from '../SVGComponents/PlusSvg';

const PostForumBtn = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <PlusSvg color="#ffffff" />
      <Text style={styles.text}>Post your query</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    columnGap: 10,
    backgroundColor: '#ef4565',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 25,
    color: '#ffffff',
  },
});

export default PostForumBtn;
