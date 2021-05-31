
import React, {useState } from "react";
import {
    StyleSheet,
} from "react-native";

import Colors from '../utils/colors';
import firebase from 'firebase';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';


export default function Busca(props) {

    const initialState = {
        nome: '',
        modelo: '',
        datas: '',
        problema: '',
        estado: '',
        ordem: '',
    };

    const [user, setUser] = useState(initialState);
    const [state, setstate] = useState({
        nome: '',
        modelo: '',
        valor: '',
        problema: '',
        estado: '',
        ordem: '',

    })

    const verificar = (value) => {
        firebase.firestore()
            .collection("celulares")
            // Filter results
            .where('ordem', 'in', [value])
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {

                    props.navigation.navigate("Detalhada", {
                        userId: doc.id,
                    });


                });

            }

            )



    }

    const mudar_texto = (name, value) => {
        setstate({ ...state, [name]: value })

    }


    return (

        <SafeView style={styles.container}>
            <Form>
                <AppTextInput
                    name="nome"
                    leftIcon="account-search"
                    placeholder="Digite a Ordem de Serviço"
                    autoFocus={true}
                    onChangeText={(value) => mudar_texto('nome', value)}


                />
            </Form>


            <AppButton title={"Pesquisar"} onPress={() => verificar(state.nome)}></AppButton>
        </SafeView>




    );
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
