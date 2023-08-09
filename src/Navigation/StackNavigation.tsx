import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroOne from '../screens/IntroOne';
import IntroTwo from '../screens/IntroTwo';
import IntroThree from '../screens/IntroThree';

import TabNavigation from '../Navigation/TabNavigation';

type RootStackParamList = {
  IntroOne: undefined;
  IntroTwo: undefined;
  IntroThree: undefined;
  // Home: undefined;
  TabNavigation:undefined ;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
   
      <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name="IntroOne" component={IntroOne} />
        <Stack.Screen name="Hometab" component={TabNavigation} />
       
        <Stack.Screen name="IntroTwo" component={IntroTwo} />
        <Stack.Screen name="IntroThree" component={IntroThree} />
      </Stack.Navigator>
   
  );
};

export default StackNavigation;
