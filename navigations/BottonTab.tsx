// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AñadirTareaScreen from '../screens/AñadirTareaScreen';  
    // Historial tareas
import { Ionicons } from '@expo/vector-icons';
import TareasScreen from '../screens/TareasScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Crear Tarea" component={AñadirTareaScreen} />
      <Tab.Screen name="Historial" component={TareasScreen} />
    </Tab.Navigator>
  );
}
