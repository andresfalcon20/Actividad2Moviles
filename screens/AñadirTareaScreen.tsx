import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../supabase/Config';

export default function AñadirTareaScreen() {
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [mensaje, setMensaje] = useState('');

  async function guardarTarea() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMensaje('Debes iniciar sesión');
      return;
    }

    const { error } = await supabase.from('tareas').insert([
      { titulo, materia, fecha_entrega: fechaEntrega }
    ]);

    if (error) {
      console.error(error);
      setMensaje('Error al guardar la tarea');
    } else {
      setMensaje('Tarea guardada correctamente');
      setTitulo('');
      setMateria('');
      setFechaEntrega('');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Tarea</Text>

      <TextInput
        placeholder="Título de la tarea"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Materia"
        style={styles.input}
        value={materia}
        onChangeText={setMateria}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Fecha de entrega (YYYY-MM-DD)"
        style={styles.input}
        onChangeText={setFechaEntrega}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={guardarTarea}>
        <Text style={styles.buttonText}>Guardar tarea</Text>
      </TouchableOpacity>

      {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
    color: '#2D3748',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#2D3748',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  message: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 15,
    color: '#4A5568',
  },
});
