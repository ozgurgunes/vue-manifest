import actions from "@/store/actions"
import service from "@/service"
import { localStorageMock, mockPromise } from "./tools"
import { AUTH_TOKEN_KEY } from "@/defaults"
import { manifestState } from "@/store"

global.localStorage = localStorageMock

let commit = jest.fn()
let state = manifestState

afterEach(() => {
  jest.resetAllMocks()
  localStorage.removeItem(AUTH_TOKEN_KEY)
})

describe("AUTHENTICATE", () => {
  it("logouts user if has no token", async () => {
    await actions.AUTHENTICATE({ commit, state })
    expect(commit).toHaveBeenCalledWith("LOGOUT")
  })

  it("authenticates user if has token", async () => {
    service.refresh = mockPromise.resolve()
    localStorage.setItem(AUTH_TOKEN_KEY, "new-token")
    await actions.AUTHENTICATE({ commit, state })
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.refresh = mockPromise.reject("error")
    localStorage.setItem(AUTH_TOKEN_KEY, "new-token")
    await actions.AUTHENTICATE({ commit, state })
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error")
    expect(commit).toHaveBeenCalledWith("LOGOUT")
  })
})

describe("LOGIN", () => {
  it("authenticates user with returned token", async () => {
    service.login = mockPromise.resolve({ token: "fake-token" })
    await actions.LOGIN({ commit }, {})
    expect(commit).toHaveBeenCalledWith("AUTHENTICATE", "fake-token")
  })

  it("returns errors with response data", async () => {
    service.login = mockPromise.reject()
    await actions.LOGIN({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("LOGOUT", () => {
  it("logouts user", async () => {
    service.logout = mockPromise.resolve()
    await actions.LOGOUT({ commit })
    expect(commit).toHaveBeenCalledWith("LOGOUT")
    expect(commit).not.toHaveBeenCalledWith("MANIFEST_ERROR")
  })

  it("returns errors with response data and logouts user", async () => {
    service.logout = mockPromise.reject()
    await actions.LOGOUT({ commit })
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
    expect(commit).toHaveBeenCalledWith("LOGOUT")
  })
})

describe("REGISTER", () => {
  it("registers user with form data", async () => {
    service.register = mockPromise.resolve({ user: "registered-user" })
    await actions.REGISTER({ commit }, {})
    expect(commit).toHaveBeenCalledWith("REGISTER", "registered-user")
  })

  it("returns errors with response data", async () => {
    service.register = mockPromise.reject()
    await actions.REGISTER({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("ACTIVATE", () => {
  it("activates user with valid token", async () => {
    service.activate = mockPromise.resolve()
    await actions.ACTIVATE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.activate = mockPromise.reject()
    await actions.ACTIVATE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PASSWORD_RESET", () => {
  it("returns success", async () => {
    service.passwordReset = mockPromise.resolve()
    await actions.PASSWORD_RESET({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.passwordReset = mockPromise.reject()
    await actions.PASSWORD_RESET({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PASSWORD_RESET_VERIFY", () => {
  it("returns success if token is valid", async () => {
    service.passwordResetVerify = mockPromise.resolve()
    await actions.PASSWORD_RESET_VERIFY({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.passwordResetVerify = mockPromise.reject()
    await actions.PASSWORD_RESET_VERIFY({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PASSWORD_RESET_CONFIRM", () => {
  it("changes password", async () => {
    service.passwordResetConfirm = jest.fn(() => Promise.resolve())
    await actions.PASSWORD_RESET_CONFIRM({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.passwordResetConfirm = mockPromise.reject()
    await actions.PASSWORD_RESET_CONFIRM({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PROFILE_SETTINGS", () => {
  it("returns user profile", async () => {
    service.profileSettings = mockPromise.resolve()
    await actions.PROFILE_SETTINGS({ commit })
    expect(commit).toHaveBeenCalledWith("PROFILE_SETTINGS", "success-message")
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.profileSettings = mockPromise.reject()
    await actions.PROFILE_SETTINGS({ commit })
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PROFILE_OPTIONS", () => {
  it("returns user profile options", async () => {
    service.profileOptions = mockPromise.resolve()
    await actions.PROFILE_OPTIONS({ commit })
    expect(commit).toHaveBeenCalledWith("PROFILE_OPTIONS", "success-message")
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.profileOptions = mockPromise.reject()
    await actions.PROFILE_OPTIONS({ commit })
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PROFILE_UPDATE", () => {
  it("returns success", async () => {
    service.profileUpdate = mockPromise.resolve()
    await actions.PROFILE_UPDATE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS", "Profile updated")
  })

  it("returns errors with response data", async () => {
    service.profileUpdate = mockPromise.reject()
    await actions.PROFILE_UPDATE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PICTURE_UPLOAD", () => {
  it("returns success", async () => {
    service.pictureUpload = mockPromise.resolve()
    await actions.PICTURE_UPLOAD({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.pictureUpload = mockPromise.reject()
    await actions.PICTURE_UPLOAD({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("EMAIL_CHANGE", () => {
  it("returns success", async () => {
    service.emailChange = mockPromise.resolve()
    await actions.EMAIL_CHANGE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.emailChange = mockPromise.reject()
    await actions.EMAIL_CHANGE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("EMAIL_CHANGE_CONFIRM", () => {
  it("returns success", async () => {
    service.emailChangeConfirm = mockPromise.resolve()
    await actions.EMAIL_CHANGE_CONFIRM({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS")
  })

  it("returns errors with response data", async () => {
    service.emailChangeConfirm = mockPromise.reject()
    await actions.EMAIL_CHANGE_CONFIRM({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("PASSWORD_CHANGE", () => {
  it("returns success", async () => {
    service.passwordChange = mockPromise.resolve()
    await actions.PASSWORD_CHANGE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_SUCCESS", "Password changed")
  })

  it("returns errors with response data", async () => {
    service.passwordChange = mockPromise.reject()
    await actions.PASSWORD_CHANGE({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("USER_LIST", () => {
  it("returns success", async () => {
    service.userList = mockPromise.resolve()
    await actions.USER_LIST({ commit }, {})
    expect(commit).toHaveBeenCalledWith("USER_LIST", "success-message")
  })

  it("returns errors with response data", async () => {
    service.userList = mockPromise.reject()
    await actions.USER_LIST({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})

describe("USER_DETAIL", () => {
  it("returns success", async () => {
    service.userDetail = mockPromise.resolve()
    await actions.USER_DETAIL({ commit }, {})
    expect(commit).toHaveBeenCalledWith("USER_DETAIL", "success-message")
  })

  it("returns errors with response data", async () => {
    service.userDetail = mockPromise.reject()
    await actions.USER_DETAIL({ commit }, {})
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-message")
  })
})
