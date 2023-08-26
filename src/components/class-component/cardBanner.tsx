import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface bannerProps {
  image: string;
}

const cardBanner = (props: bannerProps) => {
  return (
    <View>
      <Image source={{uri: props.image}} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        
    }
})

export default cardBanner;
