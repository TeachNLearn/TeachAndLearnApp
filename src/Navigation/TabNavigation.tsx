import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Userprofile from '../screens/profile/Userprofile';
import OtherUser from '../screens/other-userprofile/OtherUser';
import HomeSvg from '../components/svgComponents/HomeIconSvg';
import UserprofileSvg from '../components/svgComponents/UserProfileIconSvg';
import BookClasedSvg from '../components/svgComponents/BookCloasedSvg';
import ForumSvg from '../components/svgComponents/ForumSvg';
import ClassesSvg from '../components/svgComponents/ClassesSvg';
import Forum from '../screens/forum/Forum';
import LearnCards from '../screens/requests/LearnCards';
import Classes from '../screens/classroom/Classes';



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
