import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@/navigation/types'
import OnboardingScreen from '@/screens/auth/OnboardingScreen'
import LoginScreen from '@/screens/auth/LoginScreen'
import SignupScreen from '@/screens/auth/SignupScreen'
import PasswordResetScreen from '@/screens/auth/PasswordResetScreen'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ headerShown: true, title: 'Reset Password' }} />
    </Stack.Navigator>
  )
}
