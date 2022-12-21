
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomeScreen from './screens/HomeScreen';
import ModalScreen from './screens/ModalScreen';

type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Modal: undefined,
  Profile: { name: string }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="Modal" component={ModalScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;