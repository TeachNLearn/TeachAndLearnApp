import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, TouchableWithoutFeedback, ImageSourcePropType, ViewStyle } from 'react-native';

interface ImagePickerButtonProps {
  handleImagePicker: (source: 'gallery' | 'camera') => void;
  profileImage: { uri?: string };
  defaultImageSource: ImageSourcePropType;
  style?: ViewStyle; // Optional style prop
}

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  handleImagePicker,
  profileImage,
  defaultImageSource,
  style,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleImagePicker('gallery')}>
      <View style={style}>
        <Image
          source={profileImage.uri ? { uri: profileImage.uri } : defaultImageSource}
          style={styles.UserImg}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImagePickerButton;

const styles =  StyleSheet.create({
    UserImg: {
        borderRadius:50 ,
    }
})
 
