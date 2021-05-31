import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Bem Vindo" headerMode="none">
      <Stack.Screen name="Bem Vindo" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registrar" component={RegisterScreen} />
      <Stack.Screen name="Recuperar Senha" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
