import axios from 'axios'
import * as defaults from './defaults'

export const api = axios.create({
  baseURL: defaults.BASE_URL + '/',
  timeout: defaults.TIMEOUT,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
})

export default {
  async login(username, password) {
    const response = await api.post('/jwt/obtain/', { username, password })
    return response.data
  },
  async refresh(token) {
    const response = await api.post('/jwt/refresh/', { token })
    return response.data
  },
  logout() {
    return api.post('/logout/', {})
  },
  async register(username, password1, password2, email) {
    const response = await api.post('/register/', {
      username,
      password1,
      password2,
      email
    })
    return response.data
  },
  async activate(username, token) {
    const response = await api.post('/activate/', { username, token })
    return response.data
  },
  passwordReset(email) {
    return api.post('/password/reset/', { email })
  },
  async passwordResetVerify(uid, token) {
    const response = await api.post('/password/reset/verify/', {
      uid,
      token
    })
    return response.data
  },
  passwordResetConfirm(uid, token, newPassword1, newPassword2) {
    return api.post('/password/reset/confirm/', {
      uid,
      token,
      newPassword1,
      newPassword2
    })
  },
  async profileSettings() {
    const response = await api.get('/profile/')
    return response.data
  },
  async profileOptions() {
    const response = await api.get('/profile/options/')
    return response.data
  },
  async profileUpdate(
    firstName,
    lastName,
    gender,
    birthDate,
    timezone,
    locale
  ) {
    const response = await api.put('/profile/', {
      firstName,
      lastName,
      gender,
      birthDate,
      timezone,
      locale
    })
    return response.data
  },
  async pictureUpload(picture) {
    const response = await api.post('/picture/upload/', picture, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
  emailChange(email) {
    return api.post('/email/change/', { email })
  },
  async emailChangeConfirm(username, token) {
    const response = await api.post('/email/change/confirm/', {
      username,
      token
    })
    return response.data
  },
  passwordChange(oldPassword, newPassword1, newPassword2) {
    return api.patch('/password/change/', {
      oldPassword,
      newPassword1,
      newPassword2
    })
  },
  async userList() {
    const response = await api.get('/users/')
    return response.data
  },
  async userDetail(username) {
    const response = await api.get('/users/', { username })
    return response.data
  }
}
