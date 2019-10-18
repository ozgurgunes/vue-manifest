import actions from "@/store/actions"
import service from "@/service"

describe("AUTHENTICATE", () => {
  let commit = jest.fn()
  let state = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
  })

  // TODO: Find a way to test with localstorage token.

  it("logouts user if no token", async () => {
    await actions.AUTHENTICATE({ commit, state })
    expect(commit).toHaveBeenCalledWith("LOGOUT")
  })
})

describe("LOGIN", () => {
  let commit = jest.fn()
  let username = "john"
  let password = "pass"

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("authenticates user", async () => {
    service.login = jest.fn(() => Promise.resolve({ token: "fake-token" }))
    await actions.LOGIN({ commit }, { username, password })
    expect(commit).toHaveBeenCalledWith("AUTHENTICATE", "fake-token")
  })

  it("returns errors", async () => {
    service.login = jest.fn(() =>
      Promise.reject({ response: { data: "error-data" } })
    )
    await actions.LOGIN({ commit }, { username, password })
    expect(commit).toHaveBeenCalledWith("MANIFEST_ERROR", "error-data")
  })
})
