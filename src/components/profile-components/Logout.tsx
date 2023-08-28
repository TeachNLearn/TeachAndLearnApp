import React, {useContext} from 'react';
import {AuthContext} from '../../store/auth-context';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Logout = () => {
  const authCtx = useContext(AuthContext);

  const logouthandler = () => {
    authCtx.logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logouthandler}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Logout;
