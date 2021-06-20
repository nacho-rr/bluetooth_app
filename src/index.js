import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BleManager } from 'react-native-ble-plx';

import Home from './screens/Home';
import Details from './screens/Details';

const Stack = createStackNavigator();
export const manager = new BleManager();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home'     component={Home}       options={{ headerShown: false }} />
        <Stack.Screen name='Detail'  component={Details}    options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;