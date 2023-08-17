import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider, {AuthContext} from './src/store/auth-context';
import TabNavigation from './src/Navigation/TabNavigation';
import StackNavigation from './src/Navigation/StackNavigation';
import { AppAsyncStorage } from './src/utils/globalContants';

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
};

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem(AppAsyncStorage);

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <ActivityIndicator />;
  }

  return <Navigation />;
}

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
};

export default App;
