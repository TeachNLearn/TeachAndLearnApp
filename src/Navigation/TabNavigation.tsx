import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Tab.Screen name="Search" component={Search} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

export default TabNavigation;
