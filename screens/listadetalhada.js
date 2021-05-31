import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Button,
    View,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Text,
} from "react-native";
import Colors from '../utils/colors';
import Form from '../components/Forms/Form';
import firebase from 'firebase';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
const UserDetailScreen = (props) => {
    const initialState = {
        id: '',
        nome: '',
        modelo: '',
        datas: '',
        problema: '',
        estado: '',
        ordem: '',
    };

    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const mudar_texto = (name, value) => {
        setUser({ ...user, [name]: value })

    }
    const getUserById = async (id) => {
        const dbRef = firebase.firestore().collection("celulares").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({ ...user, id: doc.id });
        setLoading(false);
    };

    const deleteUser = async () => {
        setLoading(true)
        const dbRef = firebase.firestore()
            .collection("celulares")
            .doc(props.route.params.userId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Listar");
    };

    const openConfirmationAlert = () => {
        Alert.alert(
            "Remover Celular",
            "Voce tem certeza que ele foi entregue??",
            [
                { text: "Sim", onPress: () => deleteUser() },
                { text: "Nao", onPress: () => console.log("Cancelado") },
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateUser = async () => {
        const userRef = firebase.firestore().collection("celulares").doc(user.id);
        await userRef.set({
            nome: user.nome,
            modelo: user.modelo,
            problema: user.problema,
            estado: user.estado,
            ordem: user.ordem,
            valor: user.valor,
        });
        setUser(initialState);
        alert("Atualizado !!!");
        props.navigation.navigate("Listar");
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Form>

                <AppTextInput
                    name="nome"
                    leftIcon="account"
                    placeholder="Nome"
                    autoFocus={true}
                    value={user.nome}
                    onChangeText={(value) => mudar_texto('nome', value)}


                />

                <AppTextInput

                    name="phone"
                    leftIcon="cellphone"
                    placeholder="Modelo/Marca"
                    value={user.modelo}
                    onChangeText={(value) => mudar_texto('modelo', value)}
                />

                <AppTextInput
                    name="problema"
                    leftIcon="account"
                    placeholder="Problema"
                    value={user.problema}
                    onChangeText={(value) => mudar_texto('problema', value)}
                />

                <AppTextInput
                    name="ordem"
                    leftIcon="chat"
                    placeholder="O.S"
                    value={user.ordem}
                    onChangeText={(value) => mudar_texto('ordem', value)}

                />

                <AppTextInput
                    name="estado"
                    leftIcon="check"
                    keyboardType="phone-pad"
                    placeholder="estado"
                    value={user.estado}
                    onChangeText={(value) => mudar_texto('estado', value)}

                />
                <AppTextInput
                    name="valor"
                    leftIcon="account-cash"
                    placeholder="valor"
                    value={user.valor}
                    keyboardType="phone-pad"
                    onChangeText={(value) => mudar_texto('valor', value)}

                />
            </Form>

            <View>
                <AppButton title="Atualizar" onPress={() => updateUser()}></AppButton>
                <AppButton title="Deletar" onPress={() => openConfirmationAlert()}></AppButton>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colors.mediumGrey
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
  
});

export default UserDetailScreen;