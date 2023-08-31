import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Userprofile from '../screens/profile/Userprofile';

import HomeSvg from '../components/SVGComponents/HomeIconSvg';
import UserprofileSvg from '../components/SVGComponents/UserProfileIconSvg';
import BookClasedSvg from '../components/SVGComponents/BookCloasedSvg';
import ForumSvg from '../components/SVGComponents/ForumSvg';
import ClassesSvg from '../components/SVGComponents/ClassesSvg';
import BuyClass from '../screens/Modals/BuyClass';
// import LearnCards from '../screens/Search';
import Forum from '../screens/Forum/Forum';
import Signup from '../screens/auth/Signup';
import LearnCards from '../screens/requests/LearnCards';
import Classes from '../screens/classroom/Classes';
import Login from '../screens/auth/Login';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#9695A5',

      tabBarLabelStyle: {
        fontSize: 9,
        fontWeight: 'bold',
      },
      tabBarStyle: {
        backgroundColor: '#2D2B4E',
        position: 'absolute',
        bottom: 10,
        left: 20,

        right: 20,
        elevation: 0,
        borderRadius: 40,
        height: 60,
      },
      tabBarShowLabel: false,
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <HomeSvg fill={color} height={size} width={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Forum"
      component={Forum}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <ForumSvg fill={color} height={size} width={size} />
        ),
      }}
    />
    <Tab.Screen
      name="LearnCards"
      component={LearnCards}
      options={{
        headerShown: false,

        tabBarIcon: ({color, size}) => (
          <BookClasedSvg fill={color} height={size} width={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Classes"
      component={Classes}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <ClassesSvg fill={color} height={size} width={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Userprofile"
      component={Userprofile}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <UserprofileSvg
            fill={color}
            height={size}
            width={size}
            active={focused}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;
