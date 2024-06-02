import axios from "axios"
import * as defaults from "@/defaults"

export const api = axios.create({
  baseURL: defaults.BASE_URL + "manifest",
  timeout: defaults.TIMEOUT,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken"
})

export default {
  async login(username, password) {
    let response = await api.post("/jwt/obtain/", { username, password })
    return response.data
  },
  async refresh(token) {
    let response = await api.post("/jwt/refresh/", { token })
    return response.data
  },
  async logout() {
    let response = await api.post("/logout/", {})
    return response.data
  },
  async register(username, password1, password2, email) {
    let response = await api.post("/register/", {
      username,
      password1,
      password2,
      email
    })
    return response.data
  },
  async activate(username, token) {
    let response = await api.post("/activate/", { username, token })
    return response.data
  },
  async passwordReset(email) {
    let response = await api.post("/password/reset/", email)
    return response.data
  },
  async passwordResetVerify(uid, token) {
    let response = await api.post("/password/reset/verify/", {
      uid,
      token
    })
    return response.data
  },
  async passwordResetConfirm(uid, token, newPassword1, newPassword2) {
    let response = await api.post("/password/reset/confirm/", {
      uid,
      token,
      newPassword1,
      newPassword2
    })
    return response.data
  },
  async profileSettings() {
    let response = await api.get("/profile/")
    return response.data
  },
  async profileOptions() {
    let response = await api.get("/profile/options/")
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
    let response = await api.put("/profile/", {
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
    let response = await api.post("/picture/upload/", picture, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
  },
  async emailChange(email) {
    let response = await api.post("/email/change/", email)
    return response.data
  },
  async emailChangeConfirm(username, token) {
    let response = await api.post("/email/change/confirm/", {
      username,
      token
    })
    return response.data
  },
  passwordChange(oldPassword, newPassword1, newPassword2) {
    return api.patch("/password/change/", {
      oldPassword,
      newPassword1,
      newPassword2
    })
  },
  async userList() {
    let response = await api.get("/users/")
    return response.data
  },
  async userDetail(username) {
    let response = await api.get("/users/", { username })
    return response.data
  }
}
