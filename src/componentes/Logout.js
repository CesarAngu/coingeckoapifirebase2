import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const navigation = useNavigation();

  useEffect(() => {
    signOut(auth).then(() => {
      navigation.navigate('Login');
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
