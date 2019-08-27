import { AUTH_TOKEN_KEY } from '../defaults'
import { api } from '../service'

export default {
  REACTOR_BEGIN (state, message) {
    state.status = 'loading'
    state.message = message || 'Loading'
  },
  REACTOR_SUCCESS (state, message) {
    state.status = 'success'
    state.message = message || ''
    state.errors = []
  },
  REACTOR_ERROR (state, errors, message) {
    state.status = 'error'
    state.message = message || 'Error'
    state.errors = errors
  },
  AUTHENTICATE (state, token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    api.defaults.headers.Authorization = `JWT ${token}`
    state.user = JSON.parse(atob(token.split('.')[1]))
    state.authenticated = true
  },
  LOGOUT (state) {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    delete api.defaults.headers.Authorization
    state.user = {}
    state.authenticated = false
    state.errors = []
  },
  USER_PROFILE (state, user) {
    state.profile = user
    //state.profile.birthDate = new Date(user.birthDate)
  },
  USER_OPTIONS (state, options) {
    state.options = options
  }
}
