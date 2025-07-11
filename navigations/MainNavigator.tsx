import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegistroScreen from '../screens/RegistroScreen'

import BottomTabNavigator from './BottonTab'



const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Registro' }} />
    <Stack.Screen
          name="BottonTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
}

export default function NavegadorPrincipal() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
