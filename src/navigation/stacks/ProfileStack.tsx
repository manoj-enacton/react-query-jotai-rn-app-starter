import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '@/navigation/types'
import ProfileScreen from '@/screens/ProfileScreen'

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  )
}
