import { View, Text } from 'react-native';
import React from 'react';
import StackNavigation from './src/Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
   <NavigationContainer>
    <StackNavigation/>
   </NavigationContainer>
   
  );
};

export default App;
