import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface bannerProps {
  image: string;
}

const ClassBanner = (props: bannerProps) => {
  console.log(props.image);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: props.image}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 190,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 190,
    objectFit: 'cover',
    borderRadius: 8,
  },
});

export default ClassBanner;
