import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button, Alert } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';
import Colors from '../utils/colors';
import AppButton from '../components/AppButton';

export default function HomeScreen({ navigation }) {
  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.cabecalho}>
      <AppButton title="Cadastrar" onPress={() => navigation.navigate('Cadastrar')} />
      <AppButton title={"Mostrar Todos"} onPress={() => navigation.navigate('Listar')} />
      <AppButton title={"Pesquisar Celular"} onPress={() => navigation.navigate('Busca')} > </AppButton>
      <AppButton title={"Sair"} onPress={handleSignOut}> </AppButton>




    </View >
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flex: 1,
    width: '100%',
    padding: 15,
    justifyContent: 'space-around',
    backgroundColor: Colors.mediumGrey,

  },

});
