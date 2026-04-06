import { createStore } from 'jotai'

// Global Jotai store — can be read/written from outside React (e.g. Axios middleware)
export const jotaiStore = createStore()
