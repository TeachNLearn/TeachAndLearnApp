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
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 200,
  },
  image: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 200,
  },
});

export default ClassBanner;
