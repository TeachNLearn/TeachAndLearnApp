import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface UserInfoProps {
  name: string;
  educationInfo: string;
}

const UserNameAndTagline: React.FC<UserInfoProps> = ({name, educationInfo}) => {
  return (
    <>
      <Text style={styles.userName}>{name}</Text>
      {educationInfo && <Text style={styles.userEduInfo}>{educationInfo}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  userName: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.4,
    margin: 20,
  },
  userEduInfo: {
    color: '#697586',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.2,
    width: '90%',
  },
});

export default UserNameAndTagline;
