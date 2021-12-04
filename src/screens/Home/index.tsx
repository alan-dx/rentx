import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Alert, StatusBar } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo'

import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../databases';
import { Car as ModelCar } from '../../databases/model/Car'


// import { useTheme } from 'styled-components';

// import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring
// } from 'react-native-reanimated';

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import api from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

export function Home() {

  const [cars, setCars] = React.useState<ModelCar[]>([])
  const [loading, setLoading] = React.useState(true)
  
  const navigation = useNavigation()
  const netInfo = useNetInfo()

  // const theme = useTheme()

  // const positionY = useSharedValue(0)
  // const positionX = useSharedValue(0)

  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value},
  //       { translateY: positionY.value},
  //     ]
  //   }
  // })

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any){
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value
  //   },
  //   onActive(event, ctx: any){
  //     positionX.value = ctx.positionX + event.translationX;
  //     positionY.value = ctx.positionY + event.translationY;
  //   },
  //   onEnd(){
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0)
  //   }
  // });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {//Função responsável por verificar as mudanças na api.
        //lastPulledAt contém o ts da última vez q os dados foram sincronizados pelo dispositivo
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        //no backend, verifica-se o lastPulledAt é menor doq o updated_at do item na tabela. Caso seja, isso indica
        //que os dados locais não estão sincronizados

        const { changes, latestVersion } = response.data
        return { changes, timestamp: latestVersion }

      },
      pushChanges: async ({ changes }) => {//Envia as informações locais para o backend
        const user = changes.users;
        await api.post('/users/sync', user)
      }
    });
  }

  React.useEffect(() => {

    let isMounted = true

    async function fetchCars() {

      try {

        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()

        console.log(cars)

        if (isMounted) {
          setCars(cars)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }

    }

    fetchCars()

    return () => {
      isMounted = false
    }

  }, [])

  React.useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize()
    }
  }, [netInfo.isConnected])

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      {
        loading ? <LoadAnimation /> :
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Car onPress={() => handleCarDetails(item)} data={item} />}
        />
      }
      {/* <PanGestureHandler onGestureEvent={onGestureEvent} >
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated 
            style={[styles.button, { backgroundColor: theme.colors.main}]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport" 
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
 );
}

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })