import { manifestGetters as getters } from "@/store"
import { localStorageMock, store } from "./tools"
import { AUTH_TOKEN_KEY } from "@/defaults"

global.localStorage = localStorageMock

const state = {
  status: "loading",
  message: "Loading",
  errors: { error: "error message" },
  user: { name: "John Smith" },
  authenticated: true,
  profile: { gender: "M" },
  options: { gender: ["M", "F"] },
  userList: [],
  userDetail: {}
}

beforeEach(() => {
  localStorage.setItem(AUTH_TOKEN_KEY, "fake-token")
})
afterEach(() => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
})

describe("status", () => {
  it("returns status", () => {
    let status = getters.status(state)
    expect(status).toEqual("loading")
  })
})

describe("message", () => {
  it("returns message", () => {
    let message = getters.message(state)
    expect(message).toEqual("Loading")
  })
})

describe("errors", () => {
  it("returns errors", () => {
    let errors = getters.errors(state)
    expect(errors).toEqual({ error: "error message" })
  })
})

describe("user", () => {
  it("returns user", () => {
    let user = getters.user(state)
    expect(user).toEqual({ name: "John Smith" })
  })
})

describe("authenticated", () => {
  it("returns authenticated", () => {
    let authenticated = getters.authenticated(state)
    expect(authenticated).toBeTruthy()
  })
})

describe("profile", () => {
  it("returns profile", () => {
    let profile = getters.profile(state)
    expect(profile).toEqual({ gender: "M" })
  })
})

describe("options", () => {
  it("returns options", () => {
    let options = getters.options(state)
    expect(options).toEqual({ gender: ["M", "F"] })
  })
})

describe("token", () => {
  it("returns token", () => {
    let token = getters.token()
    expect(token).toEqual("fake-token")
  })
})

describe("userList", () => {
  it("returns user list", () => {
    let userList = getters.userList(state)
    expect(userList).toEqual([])
  })
})

describe("userDetail", () => {
  it("returns user detail", () => {
    let userDetail = getters.userDetail(state)
    expect(userDetail).toEqual({})
  })
})
