import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '@/navigation/types'
import { usePosts } from '@/hooks/queries/usePosts'
import { useCreatePost } from '@/hooks/mutations/useCreatePost'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
  const { data: posts, isLoading, isError, error, refetch } = usePosts()
  const { mutate: createPost, isPending } = useCreatePost()

  if (isLoading) {
    return <ActivityIndicator style={styles.center} size="large" />
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={refetch}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        disabled={isPending}
        onPress={() =>
          createPost({ userId: 1, title: 'New Post', body: 'Hello from RNStarter!' })
        }
      >
        <Text style={styles.buttonText}>
          {isPending ? 'Creating...' : '+ Create Post'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        onRefresh={refetch}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          >
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cardBody} numberOfLines={2}>
              {item.body}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  cardBody: { fontSize: 13, color: '#666' },
  button: {
    margin: 16,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#aaa' },
  buttonText: { color: '#fff', fontWeight: '600' },
  errorText: { color: '#e00', marginBottom: 12 },
})
