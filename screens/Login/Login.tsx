import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, Alert, TextInput } from 'react-native'
import { Container, Title, CreateAccountButton, CreateAccountButtonText } from './styles';
import Icon from 'react-native-vector-icons/Feather'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErros'

import Input from '../../components/input'
import Button from '../../components/button'
import { useAuth } from '../../hooks/AuthContext'


import Logo from '../../assets/images/fastcheck_logo.png'

interface SingInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const navigation = useNavigation();
  const {signIn} = useAuth()
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)




  const handleSignIn = useCallback(async (data: SingInFormData) => {
    try {
      formRef.current?.setErrors({});
       const schema = Yup.object().shape({
         email: Yup.string()
           .required('Email obrigatório')
           .email('Digite um email válido'),
         password: Yup.string().required('Senha obrigatória'),
       });
       await schema.validate(data, { abortEarly: false });
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, cheque as credenciais')
    }
  },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={Logo}  resizeMode="center" resizeMethod='scale' />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form style={{ width: '100%' }} ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button onPress={() => {
                formRef.current?.submitForm();
              }}>Entrar</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('Register')} >
        <Icon name="log-in" size={20} color="#666" />
        <CreateAccountButtonText>
          Criar uma conta
          </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default SignIn;
