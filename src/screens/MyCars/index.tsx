import React from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { StatusBar, FlatList } from 'react-native';
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  car: CarDTO;
  id: string;
  user_id: string;
  endDate: string;
  startDate: string;
}

export function MyCars() {

  const [cars, setCars] = React.useState<CarProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation();
  const theme = useTheme()

  function handleGoBack() {
    navigation.goBack()
  }

  React.useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={() => handleGoBack()}/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <SubTitle>
          Conforto segurança e praticidade.
        </SubTitle>
      </Header>
      { loading 
      ? 
        <LoadAnimation /> 
      : 
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10}}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />


        </Content>
      }
    </Container>
 );
}