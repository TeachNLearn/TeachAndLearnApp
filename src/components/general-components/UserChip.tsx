import React, {useContext, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../../store/auth-context';
import {FONT_FAMILY} from '../../utils/globalContants';

interface userChipProps {
  name: string;
  photo: string;
  userId: string;
  imgBorder: string;
  textColor: string;
  hasUnderline?: boolean;
  shouldntNavigate?: boolean;
  imgSize?: number;
  textSize?: number;
}

const UserChip = (props: userChipProps) => {
  const authCtx = useContext(AuthContext);
  const [localuserToken, setLocaluserToken] = useState(authCtx.token);

  // set navigation here

  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.image,
          {borderColor: props.imgBorder},
          props.imgSize
            ? {width: props.imgSize, height: props.imgSize}
            : styles.imageSize,
        ]}
        source={{uri: props.photo}}
      />
      <Text
        style={[
          styles.text,
          {color: props.textColor},
          props.hasUnderline && {textDecorationLine: 'underline'},
          props.textSize ? {fontSize: props.textSize} : styles.textSize,
        ]}>
        {props.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 6,
  },
  image: {
    borderWidth: 1,
    borderRadius: 28,
    objectFit: 'cover',
  },
  imageSize: {
    width: 32,
    height: 32,
  },
  text: {
    fontWeight: '500',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
  },
  textSize: {
    fontSize: 19,
  },
});

export default UserChip;
