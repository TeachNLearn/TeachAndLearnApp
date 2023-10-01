import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONT_FAMILY} from '../../utils/globalContants';
import {View} from 'react-native';

interface UserInfoProps {
  name: string;
  educationInfo: string;
}

const UserNameAndTagline: React.FC<UserInfoProps> = ({name, educationInfo}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        rowGap: 4,
        marginBottom: 6,
      }}>
      <Text style={styles.userName}>{name}</Text>
      {educationInfo && <Text style={styles.userEduInfo}>{educationInfo}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    color: '#000',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontSize: 24,
    letterSpacing: 0.4,
  },
  userEduInfo: {
    color: '#697586',
    textAlign: 'center',
    fontFamily: FONT_FAMILY.NUNITO_SEMIBOLD,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
    width: '90%',
  },
});

export default UserNameAndTagline;
