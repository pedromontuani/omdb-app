import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home';
import { IFilmDetails } from '../types';
import DetailsScreen from '../screens/details';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    filmDetails: IFilmDetails;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
