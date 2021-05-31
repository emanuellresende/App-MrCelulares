import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Cadastro from '../screens/novoUsuario';
import Listar from '../screens/listartodos';
import Detalhada from '../screens/listadetalhada';
import Busca from '../screens/busca';
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mr Celulares" component={HomeScreen} options={{
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Cadastrar" component={Cadastro} options={{
        headerTitleAlign: 'center',
      }} />

      <Stack.Screen name="Listar" component={Listar} options={{
        headerTitleAlign: 'center',
      }} />

      <Stack.Screen name="Detalhada" component={Detalhada} options={{
        headerTitleAlign: 'center',
      }} />

      <Stack.Screen name="Busca" component={Busca} options={{
        headerTitleAlign: 'center',
      }} />


    </Stack.Navigator>
  );
}
