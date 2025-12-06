import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Spring 서버 주소
})

// 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)
export const verifyOtp = (data) => api.post('/auth/verify-otp', data)
export const getMe = () => api.get('/user/me')
