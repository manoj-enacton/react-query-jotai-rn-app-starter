import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList } from '@/navigation/types'
import HomeScreen from '@/screens/HomeScreen'
import PostDetailScreen from '@/screens/PostDetailScreen'

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Posts' }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Post Detail' }} />
    </Stack.Navigator>
  )
}
