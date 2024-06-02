import { AUTH_TOKEN_KEY } from "@/defaults"
import service from "@/service"

const handleError = error => {
  if (error.response && error.response.data) {
    return error.response.data
  }
  //console.log(error)
  return error
}

export default {
  async AUTHENTICATE({ commit, state }) {
    let token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token && !state.user.authenticated) {
      commit("MANIFEST_BEGIN", "Authenticating with token.")
      return service
        .refresh(token)
        .then(data => commit("AUTHENTICATE", data.token))
        .then(() => commit("MANIFEST_SUCCESS"))
        .catch(error => {
          commit("MANIFEST_ERROR", handleError(error))
          commit("LOGOUT")
        })
    } else {
      commit("LOGOUT")
    }
  },
  async LOGIN({ commit }, { username, password }) {
    commit("MANIFEST_BEGIN", "Authenticating with password.")
    return service
      .login(username, password)
      .then(data => commit("AUTHENTICATE", data.token))
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async LOGOUT({ commit }) {
    return service
      .logout()
      .then(() => commit("LOGOUT"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
        commit("LOGOUT")
      })
  },
  async REGISTER({ commit }, { username, password1, password2, email }) {
    commit("MANIFEST_BEGIN", "Registering user account.")
    return service
      .register(username, password1, password2, email)
      .then(data => commit("REGISTER", data.user))
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async ACTIVATE({ commit }, { username, token }) {
    commit("MANIFEST_BEGIN", "Activating user account.")
    return service
      .activate(username, token)
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => commit("MANIFEST_ERROR", handleError(error)))
  },
  async PASSWORD_RESET({ commit }, email) {
    commit("MANIFEST_BEGIN")
    return service
      .passwordReset(email)
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => commit("MANIFEST_ERROR", handleError(error)))
  },
  async PASSWORD_RESET_VERIFY({ commit }, { uid, token }) {
    commit("MANIFEST_BEGIN")
    return service
      .passwordResetVerify(uid, token)
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => commit("MANIFEST_ERROR", handleError(error)))
  },
  async PASSWORD_RESET_CONFIRM(
    { commit },
    { uid, token, newPassword1, newPassword2 }
  ) {
    commit("MANIFEST_BEGIN")
    return service
      .passwordResetConfirm(uid, token, newPassword1, newPassword2)
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => commit("MANIFEST_ERROR", handleError(error)))
  },
  async PROFILE_SETTINGS({ commit }) {
    commit("MANIFEST_BEGIN")
    return service
      .profileSettings()
      .then(user => commit("PROFILE_SETTINGS", user))
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async PROFILE_OPTIONS({ commit }) {
    commit("MANIFEST_BEGIN")
    return service
      .profileOptions()
      .then(options => commit("PROFILE_OPTIONS", options))
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async PROFILE_UPDATE(
    { commit },
    { firstName, lastName, gender, birthDate, timezone, locale }
  ) {
    commit("MANIFEST_BEGIN")
    return service
      .profileUpdate(firstName, lastName, gender, birthDate, timezone, locale)
      .then(() => commit("MANIFEST_SUCCESS", "Profile updated"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async PICTURE_UPLOAD({ commit }, picture) {
    commit("MANIFEST_BEGIN")
    return service
      .pictureUpload(picture)
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async EMAIL_CHANGE({ commit }, email) {
    commit("MANIFEST_BEGIN")
    return service
      .emailChange(email)
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async EMAIL_CHANGE_CONFIRM({ commit }, { username, token }) {
    commit("MANIFEST_BEGIN")
    return service
      .emailChangeConfirm(username, token)
      .then(() => commit("MANIFEST_SUCCESS"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async PASSWORD_CHANGE(
    { commit },
    { oldPassword, newPassword1, newPassword2 }
  ) {
    commit("MANIFEST_BEGIN")
    return service
      .passwordChange(oldPassword, newPassword1, newPassword2)
      .then(() => commit("MANIFEST_SUCCESS", "Password changed"))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async USER_LIST({ commit }) {
    commit("MANIFEST_BEGIN")
    return service
      .userList()
      .then(data => commit("USER_LIST", data))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  },
  async USER_DETAIL({ commit }, { username }) {
    commit("MANIFEST_BEGIN")
    return service
      .userDetail(username)
      .then(data => commit("USER_DETAIL", data))
      .catch(error => {
        commit("MANIFEST_ERROR", handleError(error))
      })
  }
}
