import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';
import { StatusBar, Alert } from 'react-native';
import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import ArrowSvg from '../../assets/arrow.svg';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

import { 
  Calendar,
  DayProps, 
  generateInterval,
  MarkedDatesProps
} from '../../components/Calendar';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO
}

export function Scheduling() {

  const [lastSelectedDate, setLastSelectedDate] = React.useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = React.useState<MarkedDatesProps>({} as MarkedDatesProps)
  const [rentalPeriod, setRentalPeriod] = React.useState<RentalPeriod>({} as RentalPeriod)

  const route = useRoute()
  const { car } = route.params as Params;

  const theme = useTheme()
  const navigation = useNavigation()

  function handleConfirmRental() {

    navigation.navigate("SchedulingDetails" as undefined, {
      car,
      dates: Object.keys(markedDates)
    })
  }
  
  function handleGoBack() {
    navigation.goBack()
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end)
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
  
  }

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
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted} >{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          enabled
          title="Confirmar"
          onPress={handleConfirmRental}
          isEnabled={!!rentalPeriod.startFormatted} 
        />
      </Footer>

    </Container>
 );
}