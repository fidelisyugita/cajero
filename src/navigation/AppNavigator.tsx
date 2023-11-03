import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './StackNavigator';

function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
