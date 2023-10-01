import React, {useContext, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../../store/auth-context';
import { FONT_FAMILY } from '../../utils/globalContants';

interface userChipProps {
  name: string;
  photo: string;
  userId: string;
  imgBorder: string;
  textColor: string;
  hasUnderline?: boolean;
  shouldntNavigate?: boolean;
}

const UserChip = (props: userChipProps) => {
  const authCtx = useContext(AuthContext);
  const [localuserToken, setLocaluserToken] = useState(authCtx.token);

  // set navigation here

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, {borderColor: props.imgBorder}]}
        source={{uri: props.photo}}
      />
      <Text
        style={[
          styles.text,
          {color: props.textColor},
          props.hasUnderline && {textDecorationLine: 'underline'},
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
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 28,
    objectFit: 'cover',
  },
  text: {
    fontWeight: '500',
    fontSize: 17,
    fontFamily:FONT_FAMILY.NUNITO_SEMIBOLD

  },
});

export default UserChip;
