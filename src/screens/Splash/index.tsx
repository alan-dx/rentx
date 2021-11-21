import React from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/core';

import {
  Container,
} from './styles';

export function Splash() {

  const splashAnimation = useSharedValue(0)

  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],//target values of splashAnimation
            [0, -50],//value passed to translateX for each target value
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [{
        translateX: interpolate(splashAnimation.value,
          [0, 50],//target values of splashAnimation
          [-50, 0],//value passed to translateX for each target value
          Extrapolate.CLAMP
        )
      }]
    }
  })

  function startApp() {
    navigation.navigate("Home" as undefined)
  }

  React.useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { duration: 1000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    );
  }, [])


  return (
    <Container>
      <Animated.View style={[brandStyle, {position: 'absolute'}]} >
        <BrandSvg width={80} height={50} />
      </Animated.View>
      
      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
 )
}
