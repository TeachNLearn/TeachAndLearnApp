import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider, {AuthContext} from './src/store/auth-context';
import TabNavigation from './src/Navigation/TabNavigation';
import StackNavigation from './src/Navigation/StackNavigation';
import {AppAsyncUserStorage} from './src/utils/globalContants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForumOverview from './src/components/forum-components/ForumOverview';
import Login from './src/screens/auth/Login';

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return authCtx.isAuthenticated ? <TabNavigation /> : <StackNavigation />;
};

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedUserData = await AsyncStorage.getItem(AppAsyncUserStorage);

      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        authCtx.setLocalUser(parsedData);
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

const Stack = createNativeStackNavigator();

const NavigationScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="BottomTabs"
          component={Root}
          options={{
            title: 'Bottom Tabs',
            headerShown: false,
          }}
        />
        <Stack.Screen name="ForumOverview" component={ForumOverview} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <NavigationScreens />
    </AuthContextProvider>
  );
};

export default App;
