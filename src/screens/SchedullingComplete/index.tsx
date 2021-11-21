import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

export function SchedullingComplete() {

  const navigation = useNavigation()

  function handleConfirmRental() {
    navigation.navigate("Home" as undefined)
  }

  const { width } = useWindowDimensions()

  return (
    <Container>
      <StatusBar  
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} /> 
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pagar o seu automóvel.
        </Message>
        <Footer>
          <ConfirmButton title="OK" onPress={handleConfirmRental} />
        </Footer>
          
      </Content>
    </Container>
 );
}