import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/Config';

type Tarea = {
  id: string;
  titulo: string;
  materia: string;
  fecha_entrega: string;
};

export default function TareasScreen() {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .order('fecha_entrega', { ascending: true });

    if (!error && data) {
      setTareas(data);
    } else {
      console.error('Error al cargar tareas', error);
    }
  }

  const renderItem = ({ item }: { item: Tarea }) => (
    <View style={styles.tarea}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.label}>📘 {item.materia}</Text>
      <Text style={styles.label}>📅 {item.fecha_entrega}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 25,
    textAlign: 'center',
  },
  tarea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 6,
    borderLeftColor: '#4A90E2',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: '#4A5568',
    marginBottom: 4,
  },
});
