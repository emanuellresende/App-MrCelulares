import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button, Alert, ScrollView } from 'react-native';

import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import firebase from 'firebase';
import Colors from '../utils/colors';


export default function novoUsuario({ navigation }) {

    const [state, setstate] = useState({
        nome: '',
        modelo: '',
        valor: '',
        problema: '',
        estado: '',
        ordem: '',

    })

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    function gravar() {
        firebase.firestore().collection("celulares").add({
            nome: state.nome,
            modelo: state.modelo,
            valor: state.valor,
            problema: state.problema,
            estado: state.estado,
            ordem: state.ordem,

        });
    }

    const salvar_usuario = async () => {
        if (state.nome === '' || state.modelo === '' || state.problema === '' || state.estado == '' || state.ordem == '') {
            alert("Preencha todos os campos");
        }
        else {
            await gravar();
            alert("Salvo !!!");
            navigation.navigate('Mr Celulares');

        }
    }


    const mudar_texto = (name, value) => {
        setstate({ ...state, [name]: value })

    }
    return (
        <SafeView style={styles.container}>
        <ScrollView>
            <Form

            >
                <AppTextInput
                    name="nome"
                    leftIcon="account"
                    placeholder="Nome"
                    autoFocus={true}
                    onChangeText={(value) => mudar_texto('nome', value)}


                />

                <AppTextInput
                    name="phone"
                    leftIcon="cellphone"
                    placeholder="Modelo/Marca"
                    onChangeText={(value) => mudar_texto('modelo', value)}
                />

                <AppTextInput
                    name="problema"
                    leftIcon="account"
                    placeholder="Problema"
                    onChangeText={(value) => mudar_texto('problema', value)}
                />

                <AppTextInput
                    name="ordem"
                    leftIcon="chat"
                    placeholder="O.S"
                    onChangeText={(value) => mudar_texto('ordem', value)}

                />

                <AppTextInput
                    name="estado"
                    leftIcon="check"
                    placeholder="estado"
                    onChangeText={(value) => mudar_texto('estado', value)}
                    keyboardType="phone-pad"

                />
                <AppTextInput
                    name="valor"
                    leftIcon="account-cash"
                    placeholder="valor"
                    onChangeText={(value) => mudar_texto('valor', value)}
                    keyboardType="phone-pad"

                />

            </Form>
            <AppButton title={"Salvar"} onPress={() => salvar_usuario()}> </AppButton>
        </ScrollView>
        </SafeView>
    )
}


const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: Colors.mediumGrey
    },
    backButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    }
  });
  