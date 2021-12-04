import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';


export function SignUpFirstStep() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [driverLicense, setDriverLicense] = React.useState("");

  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  async function handleNavigateSecondStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required("CNH é obrigatória"),
        email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
        name: Yup.string()
        .required("Nome é obrigatório"),
      })

      const data = { name, email, driverLicense };
      await schema.validate(data);
      
      navigation.navigate("SignUpSecondStep", { user: data })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message)
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>
            Crie sua {'\n'}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input 
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <Input 
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button 
            title="Próximo"
            onPress={handleNavigateSecondStep}
          />

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

 );
}