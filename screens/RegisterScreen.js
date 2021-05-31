import React, { useState, Alert } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { registerWithEmail } from '../components/Firebase/firebase';
import useStatusBar from '../hooks/useStatusBar';
import firebase from 'firebase';
const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Digite seu nome')
    .label('Nome'),
  email: Yup.string()
    .required('Digite seu e-mail')
    .email()
    .label('Email'),
  password: Yup.string()
    .required('Digite sua senha')
    .min(6, 'Sua senha deve ter mais de 6 caracteres')
    .label('Senha'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirme sua senha')
    .required('É necessario confirmar a senha'),
  phone_number: Yup.string()
    .matches(phoneRegex, "Numero Invalido").required("Digite o Numero")

});

export default function RegisterScreen({ navigation }) {
  function gravar(email, name, phone_number) {
    var userId = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref('users/' + userId)
      .set({
        email: email,
        name: name,
        phone: phone_number
      });
      
  }
  async function storeHighScore(values, actions) {
    const { email, name, phone_number } = values;
    await gravar(email, name, phone_number);
  }
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const { email, password, phone_number, name } = values;


    try {
      await registerWithEmail(email, password), storeHighScore(values);

    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone_number: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnSignUp(values)}
      >
        <FormField
          name="name"
          leftIcon="account"
          placeholder="Digite seu nome"
          autoFocus={true}
        />
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Digite seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Digite sua senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <FormField
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Confirme sua senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
        />
        <FormField
          name="phone_number"
          leftIcon="phone"
          placeholder="Digite seu numero"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCapitalize="none"
        />

        <FormButton title={'Criar Conta'} onPress={values => storeHighScore(values)} />
        {<FormErrorMessage error={registerError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.white}
        size={30}
        onPress={() => navigation.goBack()}

      />
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
