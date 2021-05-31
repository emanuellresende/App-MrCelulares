import React from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, TextInput, Animated, Keyboard } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../imagens/logosemfundo.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Mr Celulares</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Entrar" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Criar Conta"
          color="secondary"
          onPress={() => navigation.navigate('Registrar')}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',


  },
  logoContainer: {
    position: 'absolute',
    top: '30%',
    alignItems: 'center',

  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.primary
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%',
  }
});
