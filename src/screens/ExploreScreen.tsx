import React from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { useUsers } from '@/hooks/queries/useUsers'

export default function ExploreScreen() {
  const { data: users, isLoading, isError, error, refetch } = useUsers()

  if (isLoading) {
    return <ActivityIndicator style={styles.center} size="large" />
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.container}
      data={users}
      keyExtractor={item => String(item.id)}
      onRefresh={refetch}
      refreshing={isLoading}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.meta}>@{item.username}</Text>
          <Text style={styles.meta}>{item.email}</Text>
          <Text style={styles.company}>{item.company.name}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  meta: { fontSize: 13, color: '#555', marginBottom: 1 },
  company: { fontSize: 12, color: '#999', marginTop: 4 },
  errorText: { color: '#e00' },
})
