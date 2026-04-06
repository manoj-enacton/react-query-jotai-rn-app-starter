import { Linking, Platform } from 'react-native'
import Toast from 'react-native-toast-message'

// ─── Open URL ─────────────────────────────────────────────────────────────────

export async function openUrl(url: string): Promise<void> {
  try {
    const supported = await Linking.canOpenURL(url)
    if (!supported) {
      Toast.show({ type: 'error', text1: 'Cannot open this link.' })
      return
    }
    await Linking.openURL(url)
  } catch {
    Toast.show({ type: 'error', text1: 'Failed to open link.' })
  }
}

// ─── Open Email ──────────────────────────────────────────────────────────────

interface EmailOptions {
  to: string
  subject?: string
  body?: string
}

export async function openEmail({ to, subject = '', body = '' }: EmailOptions): Promise<void> {
  const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  await openUrl(url)
}

// ─── Open Phone ──────────────────────────────────────────────────────────────

export async function openPhone(phone: string): Promise<void> {
  const url = `tel:${phone.replace(/\s/g, '')}`
  await openUrl(url)
}

// ─── Open SMS ────────────────────────────────────────────────────────────────

export async function openSms(phone: string, message = ''): Promise<void> {
  const separator = Platform.OS === 'ios' ? '&' : '?'
  const url = `sms:${phone.replace(/\s/g, '')}${separator}body=${encodeURIComponent(message)}`
  await openUrl(url)
}

// ─── Open Maps ───────────────────────────────────────────────────────────────

interface MapOptions {
  lat: number
  lng: number
  label?: string
}

export async function openMaps({ lat, lng, label = '' }: MapOptions): Promise<void> {
  const encodedLabel = encodeURIComponent(label)
  const url =
    Platform.OS === 'ios'
      ? `maps://?q=${encodedLabel}&ll=${lat},${lng}`
      : `geo:${lat},${lng}?q=${lat},${lng}(${encodedLabel})`
  await openUrl(url)
}

// ─── Open App Store / Play Store ─────────────────────────────────────────────

interface StoreOptions {
  appStoreId: string    // iOS App Store numeric ID  e.g. "123456789"
  playStoreId: string   // Android package name      e.g. "com.yourapp"
}

export async function openStore({ appStoreId, playStoreId }: StoreOptions): Promise<void> {
  const url =
    Platform.OS === 'ios'
      ? `https://apps.apple.com/app/id${appStoreId}`
      : `https://play.google.com/store/apps/details?id=${playStoreId}`
  await openUrl(url)
}
