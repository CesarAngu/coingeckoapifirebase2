import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';

export default function Perfil() {
  const [usuarioData, setUsuarioData] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUsuarioData(docSnap.data());
          }
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatosUsuario();
  }, []);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!usuarioData) {
    return (
      <View style={styles.center}>
        <Text>No se encontraron datos del usuario.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil de Usuario</Text>
      <Text><Text style={styles.label}>Nombre:</Text> {usuarioData.nombre}</Text>
      <Text><Text style={styles.label}>Correo:</Text> {usuarioData.correo}</Text>
      <Text><Text style={styles.label}>Fecha de nacimiento:</Text> {usuarioData.fecha}</Text>
      <Text><Text style={styles.label}>Teléfono:</Text> {usuarioData.telefono}</Text>
      <Text><Text style={styles.label}>Ganados:</Text> {usuarioData.ganados}</Text>
      <Text><Text style={styles.label}>Perdidos:</Text> {usuarioData.perdidos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold' }
});
