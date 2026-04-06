import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAtomValue } from 'jotai'
import BootSplash from 'react-native-bootsplash'
import { navigationRef } from '@/navigation/navigationRef'
import { RootStackParamList } from '@/navigation/types'
import { isAuthenticatedAtom } from '@/store/atoms/authAtoms'
import AuthStack from '@/navigation/stacks/AuthStack'
import TabNavigator from '@/navigation/TabNavigator'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function Navigator() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const [isReady, setIsReady] = useState(false)

  async function onNavigationReady() {
    setIsReady(true)
    await BootSplash.hide({ fade: true })
  }

  return (
    // opacity:0 keeps the navigator invisible until it has fully mounted
    // and determined the correct stack (Auth or Main).
    // BootSplash sits on top natively during this window.
    // Once onReady fires: navigator becomes visible + BootSplash fades out simultaneously.
    <View style={[styles.container, !isReady && styles.hidden]}>
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <RootStack.Screen name="Main" component={TabNavigator} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hidden: { opacity: 0 },
})
