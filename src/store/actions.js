import { AUTH_TOKEN_KEY } from '../defaults'
import service from '../service'

export default {
  AUTHENTICATE({ commit, state }) {
    let token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token && !state.user.authenticated) {
      commit('REACTOR_BEGIN')
      return service
        .refresh(token)
        .then(data => commit('AUTHENTICATE', data.token))
        .then(() => commit('REACTOR_SUCCESS'))
        .catch(error => {
          commit('REACTOR_ERROR', error.response.data)
          commit('LOGOUT')
        })
    } else {
      commit('LOGOUT')
    }
  },
  async LOGIN({ commit }, { username, password }) {
    commit('REACTOR_BEGIN')
    return service
      .login(username, password)
      .then(data => commit('AUTHENTICATE', data.token))
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  LOGOUT({ commit }) {
    service.logout().then(() => commit('LOGOUT'))
  },
  REGISTER({ commit }, { username, password1, password2, email }) {
    commit('REACTOR_BEGIN')
    return service
      .register(username, password1, password2, email)
      .then(data => commit('REGISTER', data.user))
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  ACTIVATE({ commit }, { username, token }) {
    commit('REACTOR_BEGIN')
    return service
      .activate(username, token)
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => commit('REACTOR_ERROR', error.response.data))
  },
  PASSWORD_RESET({ commit }, email) {
    commit('REACTOR_BEGIN')
    return service
      .passwordReset(email)
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => commit('REACTOR_ERROR', error.response.data))
  },
  PASSWORD_RESET_VERIFY({ commit }, { uid, token }) {
    commit('REACTOR_BEGIN')
    return service
      .passwordResetVerify(uid, token)
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => commit('REACTOR_ERROR', error.response.data))
  },
  PASSWORD_RESET_VERIFYET_CONFIRM(
    { commit },
    { uid, token, newPassword1, newPassword2 }
  ) {
    commit('REACTOR_BEGIN')
    return service
      .passwordResetConfirm(uid, token, newPassword1, newPassword2)
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => commit('REACTOR_ERROR', error.response.data))
  },
  PROFILE_SETTINGS({ commit }) {
    commit('REACTOR_BEGIN')
    return service
      .profileSettings()
      .then(user => commit('PROFILE_SETTINGS', user))
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  PROFILE_OPTIONS({ commit }) {
    commit('REACTOR_BEGIN')
    return service
      .profileOptions()
      .then(options => commit('PROFILE_OPTIONS', options))
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  PROFILE_UPDATE(
    { commit },
    { firstName, lastName, gender, birthDate, timezone, locale }
  ) {
    commit('REACTOR_BEGIN')
    return service
      .profileUpdate(firstName, lastName, gender, birthDate, timezone, locale)
      .then(() => commit('REACTOR_SUCCESS', 'Profile updated'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  PICTURE_UPLOAD({ commit }, picture) {
    commit('REACTOR_BEGIN')
    return service
      .pictureUpload(picture)
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  EMAIL_CHANGE({ commit }, email) {
    commit('REACTOR_BEGIN')
    return service
      .emailChange(email)
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  EMAIL_CHANGE_CONFIRM({ commit }, { username, token }) {
    commit('REACTOR_BEGIN')
    return service
      .emailChangeConfirm(username, token)
      .then(() => commit('REACTOR_SUCCESS'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  },
  PASSWORD_CHANGE({ commit }, { oldPassword, newPassword1, newPassword2 }) {
    commit('REACTOR_BEGIN')
    return service
      .passwordChange(oldPassword, newPassword1, newPassword2)
      .then(() => commit('REACTOR_SUCCESS', 'Password changed'))
      .catch(error => {
        commit('REACTOR_ERROR', error.response.data)
      })
  }
}
