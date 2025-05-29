import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function Original() {
  const [criptos, setCriptos] = useState([]);
  const [orden, setOrden] = useState('desc');
  const [loading, setLoading] = useState(true);

  const obtenerCriptos = async () => {
    try {
      setLoading(true);
      const respuesta = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await respuesta.json();
      const ordenadas = [...data].sort((a, b) =>
        orden === 'asc'
          ? a.current_price - b.current_price
          : b.current_price - a.current_price
      );
      setCriptos(ordenadas);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener criptomonedas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCriptos();
  }, [orden]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title={`Ordenar por precio: ${orden === 'asc' ? 'Ascendente' : 'Descendente'}`}
        onPress={() => setOrden(orden === 'asc' ? 'desc' : 'asc')}
      />
      <FlatList
        data={criptos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>{item.name}</Text>
            <Text style={styles.precio}>💲{item.current_price} USD</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { marginBottom: 16, padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  precio: { fontSize: 16 },
});
