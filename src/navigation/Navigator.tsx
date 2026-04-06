import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '@/navigation/navigationRef'
import { RootStackParamList } from '@/navigation/types'
import TabNavigator from '@/navigation/TabNavigator'

const RootStack = createNativeStackNavigator<RootStackParamList>()

// All routes live here. App.tsx only renders <Navigator />.
export default function Navigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={TabNavigator} />
        {/* Login screen — navigated to on 401 / force logout */}
        {/* <RootStack.Screen name="Login" component={LoginScreen} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
