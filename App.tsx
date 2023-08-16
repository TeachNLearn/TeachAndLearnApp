import {View, Text} from 'react-native';
import React from 'react';
import StackNavigation from './src/Navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/screens/auth/Login';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigation/> */}
      <Login />
    </NavigationContainer>
  );
};

export default App;
