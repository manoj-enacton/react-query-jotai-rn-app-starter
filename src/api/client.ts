import axios from 'axios'
import { BASE_URL } from './endpoints'
import { applyMiddleware } from './middleware'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

applyMiddleware(apiClient)

export default apiClient
