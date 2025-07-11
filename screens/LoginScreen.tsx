import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabase/Config';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    if (!email || !password)
      return Alert.alert('Completa todos los campos');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (data.user != null) {
      navigation.navigate("BottonTabs");
    } else {
      Alert.alert("Error", error?.message || "Credenciales incorrectas");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskHub</Text>

      <TextInput
        placeholder="Correo"
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.linkText}>¿No tienes cuenta? <Text style={styles.linkAccent}>Regístrate</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#F2F4F8',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#2D3748',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#2D3748',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    color: '#718096',
    fontSize: 15,
    marginTop: 10,
  },
  linkAccent: {
    color: '#4A90E2',
    fontWeight: '600',
  },
});
