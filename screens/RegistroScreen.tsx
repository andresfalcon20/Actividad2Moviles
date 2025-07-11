import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabase/Config';

export default function RegistroScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  async function registro() {
    if (!email || !password || !nombre)
      return Alert.alert('Completa todos los campos');

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return Alert.alert('Error', error.message);

    if (data.user?.id) {
      await supabase.from('usuarios').insert({
        id: data.user.id,
        nombre: nombre,
        correo: email
      });
    }

    Alert.alert('Registro exitoso', 'Ahora inicia sesión');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        placeholder="Nombre completo"
        onChangeText={setNombre}
        style={styles.input}
        placeholderTextColor="#999"
      />
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

      <TouchableOpacity style={styles.button} onPress={registro}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? <Text style={styles.linkAccent}>Inicia sesión</Text></Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 35,
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
    backgroundColor: '#50C878',
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
    color: '#50C878',
    fontWeight: '600',
  },
});
