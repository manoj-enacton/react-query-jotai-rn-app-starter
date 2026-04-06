import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '@/navigation/types'
import { usePost } from '@/hooks/queries/usePost'

type Props = NativeStackScreenProps<HomeStackParamList, 'PostDetail'>

export default function PostDetailScreen({ route }: Props) {
  const { postId } = route.params

  const { data: post, isLoading, isError, error } = usePost(postId)

  if (isLoading) {
    return <ActivityIndicator style={styles.center} size="large" />
  }

  if (isError || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error ?? 'Post not found'}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.id}>Post #{post.id}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  id: { fontSize: 12, color: '#999', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16, textTransform: 'capitalize' },
  body: { fontSize: 15, color: '#444', lineHeight: 24 },
  errorText: { color: '#e00' },
})
