/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IntroOne from '../screens/intro/IntroOne';
import IntroTwo from '../screens/intro/IntroTwo';
import IntroThree from '../screens/intro/IntroThree';

import TabNavigation from './TabNavigation';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import PreLogin from '../screens/extraScreens/PreLogin';
import CardScreen from '../screens/extraScreens/CardScreen';
import Community from '../screens/extraScreens/Community';
import Skeleton from '../screens/extraScreens/skeletonUi/Skeleton';
import See from '../screens/extraScreens/skeletonUi/See';
// import LearnCardOverviewNavigator from './LearnCardOverview';


type RootStackParamList = {
  IntroOne: undefined;
  IntroTwo: undefined;
  IntroThree: undefined;
  TabNavigation: undefined;
 
  Hometab: undefined;
  Login: undefined;
  Signup: undefined;

  LearnCardOverview:undefined ;
  


};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (


   
      // <Stack.Navigator screenOptions={{headerShown: false,}}>
      //   <Stack.Screen name="IntroOne" component={IntroOne} />
      //   <Stack.Screen name="Hometab" component={Home} />
        
        
      //   <Stack.Screen name="IntroTwo" component={IntroTwo} />
      //   <Stack.Screen name="IntroThree" component={IntroThree} />
      //   <Stack.Screen name="Login" component={Login} />
      //   <Stack.Screen name="Signup" component={Signup} />
      // </Stack.Navigator>
   

    // <Stack.Navigator screenOptions={{headerShown: false}}>
    //   <Stack.Screen name="IntroOne" component={IntroOne} />
    //   <Stack.Screen name="IntroTwo" component={IntroTwo} />
    //   <Stack.Screen name="IntroThree" component={IntroThree} />
   
    // </Stack.Navigator>


    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="IntroOne" component={IntroOne} />
      <Stack.Screen name="Hometab" component={TabNavigation} />
      <Stack.Screen name="IntroTwo" component={IntroTwo} />
      <Stack.Screen name="IntroThree" component={IntroThree} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>

  );
};

export default StackNavigation;
