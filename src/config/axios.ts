import { default as axiosInstant } from 'axios'

const axios = axiosInstant.create({
  baseURL: `${import.meta.env.VITE_APP_URL}/api/`,
  headers: {
    'Content-type': 'application/json',
  },
})

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor
axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || 'Network Error'),
)
export default axios
