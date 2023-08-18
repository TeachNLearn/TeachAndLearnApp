import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Classes from '../Component/Classes';
import Requests from '../Component/Requests';
import UserClasses from '../Component/UserClasses';

const Tab = createMaterialTopTabNavigator();

const TopTabNaivgation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Classes" component={Classes} />
      <Tab.Screen name="Requests" component={Requests} />
      <Tab.Screen name="UserClasses" component={UserClasses} />
    </Tab.Navigator>
  );
}

export default TopTabNaivgation;
