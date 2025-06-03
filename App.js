import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import BenchmarksScreen from './screens/BenchmarksScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Clases"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1c1c1c',
        },
        drawerLabelStyle: {
          color: 'white',
          fontSize: 16,
        },
        drawerActiveTintColor: '#00BFFF',
        drawerInactiveTintColor: '#ccc',
        drawerActiveBackgroundColor: '#333',
      }}
    >
      <Drawer.Screen name="Clases" component={MainScreen} />
      <Drawer.Screen 
        name="Ajustes" 
        component={SettingsScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Benchmarks" 
        component={BenchmarksScreen} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainDrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 