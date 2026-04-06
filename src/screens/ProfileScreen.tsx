import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { useAtom } from 'jotai'
import { useUser } from '@/hooks/queries/useUser'
import { useCreateUser } from '@/hooks/mutations/useCreateUser'
import { themeAtom } from '@/store/atoms/appAtoms'

// Simulating logged-in user with id=1
const DEMO_USER_ID = 1

export default function ProfileScreen() {
  const { data: user, isLoading } = useUser(DEMO_USER_ID)
  const { mutate: createUser, isPending } = useCreateUser()
  const [theme, setTheme] = useAtom(themeAtom)

  if (isLoading) {
    return <ActivityIndicator style={styles.center} size="large" />
  }

  return (
    <View style={styles.container}>
      {/* User info from API */}
      <View style={styles.card}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.meta}>@{user?.username}</Text>
        <Text style={styles.meta}>{user?.email}</Text>
        <Text style={styles.meta}>{user?.phone}</Text>
        <Text style={styles.company}>{user?.company?.name}</Text>
      </View>

      {/* Jotai atom — persisted via MMKV */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Theme Preference</Text>
        <View style={styles.row}>
          {(['light', 'dark', 'system'] as const).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.chip, theme === t && styles.chipActive]}
              onPress={() => setTheme(t)}
            >
              <Text style={[styles.chipText, theme === t && styles.chipTextActive]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mutation demo */}
      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        disabled={isPending}
        onPress={() =>
          createUser({ name: 'New User', username: 'newuser', email: 'new@test.com' })
        }
      >
        <Text style={styles.buttonText}>
          {isPending ? 'Creating User...' : 'Create Demo User'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  meta: { fontSize: 13, color: '#555', marginBottom: 2 },
  company: { fontSize: 12, color: '#999', marginTop: 6 },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  chipActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  chipText: { fontSize: 13, color: '#333' },
  chipTextActive: { color: '#fff' },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#aaa' },
  buttonText: { color: '#fff', fontWeight: '600' },
})
