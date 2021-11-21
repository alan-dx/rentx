import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedullingComplete } from '../screens/SchedullingComplete';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen 
        name="Splash"
        component={Splash}
      />
      <Screen 
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen 
        name="CarDetails"
        component={CarDetails}
      />
      <Screen 
        name="Scheduling"
        component={Scheduling}
      />
      <Screen 
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen 
        name="SchedullingComplete"
        component={SchedullingComplete}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}