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
import LearnCardOverview from './src/screens/requests/LearnCardOverview';
import BuyClass from './src/screens/Modals/BuyClass';
import ClassOverview from './src/screens/classroom/ClassOverview';
import CreateLearnCard from './src/screens/requests/CreateLearnCard';
import CreateTeachCard from './src/screens/classroom/CreateTeachCard';
import CreateForum from './src/screens/forum/CreateForum';
import PostForumAnswer from './src/components/forum-components/postForumAnswer';
import SingleClassroom from './src/screens/classroom/SingleClassroom';

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
      console.log(storedUserData);

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
        <Stack.Screen name="CreateForum" component={CreateForum} />
        <Stack.Screen name="CreateForumAnswer" component={PostForumAnswer} />
        <Stack.Screen name="LearnCardOverview" component={LearnCardOverview} />

        <Stack.Screen name="BuyClass" component={BuyClass} />

        <Stack.Screen name="CreateLearnCard" component={CreateLearnCard} />
        <Stack.Screen name="ClassOverview" component={ClassOverview} />
        <Stack.Screen name="SingleClassroom" component={SingleClassroom} />
        <Stack.Screen name="CreateTeachCard" component={CreateTeachCard} />
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
