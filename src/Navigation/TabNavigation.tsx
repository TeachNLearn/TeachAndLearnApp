import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import FontAwesom from 'react-native-vector-icons/FontAwesome5';
// import FontAwesom6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Userprofile from '../screens/profile/Userprofile';
;
// import CreateClass from '../screens/classroom/CreateClass';

// import Detail from '../screens/Detail';
import Search from '../screens/Search';
import LearnCardOverview from '../screens/requests/LearnCardOverview';
// import LearnCardOverviewNavigator from './LearnCardOverview';

import Forum from '../screens/Forum/Forum';
import LearnCards from '../screens/Search';
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
          <MaterialIcon name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Forum"
      component={Forum}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <FontAwesom name="wpforms" color={color} size={size} />
        ),
      }}
    />

    

     <Tab.Screen
      name="LearnCards"
      component={LearnCards}

      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
           <FontAwesom name="plus-circle" color={color} size={size} />
        ),
      }}

    />
    <Tab.Screen name="LearnCardOverview" component={LearnCardOverview}options={{ headerShown: false,  }} />
    

    

    <Tab.Screen
      name="Classes"
      component={Classes}

      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <FontAwesom name="book" color={color} size={size} />
        ),
      }}
     
    />

    <Tab.Screen
      name="Userprofile"
      component={Userprofile}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <MaterialIcon name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;
