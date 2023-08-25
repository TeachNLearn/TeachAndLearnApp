import React from 'react';
import {View, Image} from 'react-native';

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

export default cardBanner;
