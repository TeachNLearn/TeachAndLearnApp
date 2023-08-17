import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../store/auth-context';

const Forum = () => {

  const authCtx = useContext(AuthContext);
  const [userToken, setUserToken] = useState(authCtx.token);

  

  return (
    <View>
      <Text>Forum</Text>
    </View>
  )
}

export default Forum