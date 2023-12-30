/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import PreLogin from '../screens/extraScreens/PreLogin';
import UpcomingClasses from '../components/class-component/UpcomingClasses';
import Review from '../components/review/Review';
import CreateTeachCard from '../screens/classroom/CreateTeachCard';

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

  Upcoming:undefined;
  Review:undefined;
  PreLogin:undefined;
  Create_Teach_Cards:undefined


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
      {/* <Stack.Screen name="IntroOne" component={IntroOne} /> */}
      <Stack.Screen name="PreLogin" component={PreLogin}/>
      <Stack.Screen name="Hometab" component={TabNavigation} />
      {/* <Stack.Screen name="IntroTwo" component={IntroTwo} /> */}
      {/* <Stack.Screen name="IntroThree" component={IntroThree} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Upcoming" component={UpcomingClasses}/>
      <Stack.Screen name="Review" component={Review}/>
      <Stack.Screen name="Create_Teach_Cards" component={CreateTeachCard}/>



    </Stack.Navigator>

  );
};

export default StackNavigation;
