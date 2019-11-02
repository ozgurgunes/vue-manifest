import AxiosMockAdapter from "axios-mock-adapter"
import service, { api } from "@/service"

const mock = new AxiosMockAdapter(api)

describe("service", () => {
  it("retrieves jwt", () => {
    let data = { token: "fake-token" }
    let username = "john"
    let password = "pass"
    mock.onPost("/jwt/obtain/", { username, password }).reply(200, data)
    return service.login(username, password).then(response => {
      expect(response).toEqual(data)
    })
  })
  it("refresh token", () => {
    let data = { token: "fake-token" }
    let token = "old-token"
    mock.onPost("/jwt/refresh/", { token }).reply(200, data)
    return service.refresh(token).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("logs out user", () => {
    let data = { token: "fake-token" }
    mock.onPost("/logout/", {}).reply(200, data)
    return service.logout({}).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("registers user", () => {
    let data = { detail: "done" }
    let username = "john"
    let password1 = "pass"
    let password2 = password1
    let email = "john@example.com"
    mock
      .onPost("/register/", { username, password1, password2, email })
      .reply(200, data)
    return service
      .register(username, password1, password2, email)
      .then(response => {
        expect(response).toEqual(data)
      })
  })

  it("activates user account", () => {
    let data = { detail: "done" }
    let username = "john"
    let token = "john@example.com"
    mock.onPost("/activate/", { username, token }).reply(200, data)
    return service.activate(username, token).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("resets password", () => {
    let data = { detail: "done" }
    let email = "john@example.com"
    mock.onPost("/password/reset/", email).reply(200, data)
    return service.passwordReset(email).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("verifies password reset", () => {
    let data = { detail: "done" }
    let uid = "john"
    let token = "fake-token"
    mock.onPost("/password/reset/verify/", { uid, token }).reply(200, data)
    return service.passwordResetVerify(uid, token).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("confirms password reset", () => {
    let data = { detail: "done" }
    let uid = "john"
    let token = "fake-token"
    let newPassword1 = "pass"
    let newPassword2 = newPassword1
    mock
      .onPost("/password/reset/confirm/", {
        uid,
        token,
        newPassword1,
        newPassword2
      })
      .reply(200, data)
    return service
      .passwordResetConfirm(uid, token, newPassword1, newPassword2)
      .then(response => {
        expect(response).toEqual(data)
      })
  })

  it("gets profile settings", () => {
    let data = { detail: "done" }
    mock.onGet("/profile/", {}).reply(200, data)
    return service.profileSettings().then(response => {
      expect(response).toEqual(data)
    })
  })

  it("gets profile options", () => {
    let data = { detail: "done" }
    mock.onGet("/profile/options/", {}).reply(200, data)
    return service.profileOptions().then(response => {
      expect(response).toEqual(data)
    })
  })

  it("updates profile", () => {
    let data = { detail: "done" }
    let firstName = "John"
    let lastName = "Smith"
    let gender = "M"
    let birthDate = "1979/01/01"
    let timezone = "Europe/Istanbul"
    let locale = "tr"
    mock
      .onPut("/profile/", {
        firstName,
        lastName,
        gender,
        birthDate,
        timezone,
        locale
      })
      .reply(200, data)
    return service
      .profileUpdate(firstName, lastName, gender, birthDate, timezone, locale)
      .then(response => {
        expect(response).toEqual(data)
      })
  })

  it("uploads picture", () => {
    let data = { detail: "done" }
    let picture = ""
    mock.onPost("/picture/upload/", picture).reply(200, data)
    return service.pictureUpload(picture).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("changes email", () => {
    let data = { detail: "done" }
    let email = "john@example.com"
    mock.onPost("/email/change/", email).reply(200, data)
    return service.emailChange(email).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("confirms email change", () => {
    let data = { detail: "done" }
    let username = "john"
    let token = "fake-token"
    mock.onPost("/email/change/confirm/", { username, token }).reply(200, data)
    return service.emailChangeConfirm(username, token).then(response => {
      expect(response).toEqual(data)
    })
  })

  it("changes password", () => {
    let data = { detail: "done" }
    let oldPassword = "pass"
    let newPassword1 = "new-pass"
    let newPassword2 = newPassword1
    mock
      .onPatch("/password/change/", { oldPassword, newPassword1, newPassword2 })
      .reply(200, data)
    service
      .passwordChange(oldPassword, newPassword1, newPassword2)
      .then(response => {
        expect(response.data).toEqual(data)
      })
  })

  it("lists users", () => {
    let data = { detail: "done" }
    mock.onGet("/users/", {}).reply(200, data)
    return service.userList().then(response => {
      expect(response).toEqual(data)
    })
  })

  it("displays user info", () => {
    let data = { detail: "done" }
    let username = "john"
    mock.onGet("/users/", { username }).reply(200, data)
    return service.userDetail(username).then(response => {
      expect(response).toEqual(data)
    })
  })
})
