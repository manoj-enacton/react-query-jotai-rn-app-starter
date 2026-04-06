import React from 'react'
import AppProviders from '@/providers/AppProviders'
import Navigator from '@/navigation/Navigator'

export default function App() {
  return (
    <AppProviders>
      <Navigator />
    </AppProviders>
  )
}
