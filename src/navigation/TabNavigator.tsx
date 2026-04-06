import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootTabParamList } from '@/navigation/types'
import HomeStack from '@/navigation/stacks/HomeStack'
import ExploreStack from '@/navigation/stacks/ExploreStack'
import ProfileStack from '@/navigation/stacks/ProfileStack'

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStack}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  )
}
