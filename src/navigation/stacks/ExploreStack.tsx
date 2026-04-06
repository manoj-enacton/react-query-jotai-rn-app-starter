import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ExploreStackParamList } from '@/navigation/types'
import ExploreScreen from '@/screens/ExploreScreen'

const Stack = createNativeStackNavigator<ExploreStackParamList>()

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Explore" component={ExploreScreen} options={{ title: 'Users' }} />
    </Stack.Navigator>
  )
}
