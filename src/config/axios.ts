import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_URL}/api/`,
  headers: {
    'Content-type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || 'Network Error'),
)
export default api
