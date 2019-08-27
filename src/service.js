import axios from 'axios'
import * as defaults from './defaults'

export const api = axios.create({
  baseURL: defaults.BASE_URL + '/',
  timeout: defaults.TIMEOUT,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
})

export default {
  login (username, password) {
    return api.post('jwt/obtain/', { username, password })
      .then(response => response.data)
  },
  refresh (token) {
    return api.post('jwt/refresh/', { token })
      .then(response => response.data)
  },
  logout () {
    return api.post('/auth/logout/', {})
  },
  register (username, password1, password2, email) {
    return api.post('/auth/register/', { username, password1, password2, email })
      .then(response => response.data)
  },
  activate (username, token) {
    return api.post('/auth/activate/', { username, token })
      .then(response => response.data)
  },
  passwordReset (email) {
    return api.post('/auth/password/reset/', { email })
  },
  passwordResetVerify (uid, token) {
    return api.post('/auth/password/reset/verify/', { uid, token })
      .then(response => response.data)
  },
  passwordResetConfirm (uid, token, newPassword1, newPassword2) {
    return api.post('/auth/password/reset/confirm/', { uid, token, newPassword1, newPassword2 })
  },
  userProfile () {
    return api.get('/auth/user/').then(response => response.data)
  },
  userOptions () {
    return api.get('/auth/user/options/').then(response => response.data)
  },
  userUpdate (firstName, lastName, gender, birthDate, timezone, locale) {
    return api.put('/auth/user/update/', { firstName, lastName, gender, birthDate, timezone, locale })
      .then(response => response.data)
  },
  pictureUpload (picture) {
    return api.post('/auth/picture/upload/', picture, {
      headers: {'Content-Type':'multipart/form-data'}
    }).then(response => response.data)
  },
  emailChange (email) {
    return api.post('/auth/email/change/', { email })
  },
  emailChangeConfirm (username, token) {
    return api.post('/auth/email/change/confirm/', { username, token })
      .then(response => response.data)
  },
  passwordChange (oldPassword, newPassword1, newPassword2) {
    return api.patch('/auth/password/change/', { oldPassword, newPassword1, newPassword2 })
  },
  userList () {
    return api.get('/users/').then(response => response.data)
  },
  userDetail (username) {
    return api.get('/users/', { username }).then(response => response.data)
  }
}
