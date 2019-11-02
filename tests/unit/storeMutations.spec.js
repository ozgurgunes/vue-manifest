import mutations from "@/store/mutations"

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBTbWl0aCJ9" +
  ".Pal-pduYcZ54HqMINX8zMwrzeEEidnMpuc_HpAjhHBQ"

describe("MANIFEST_BEGIN", () => {
  const state = {
    status: "",
    message: "",
    errors: null
  }

  it("sets status and default message", () => {
    mutations.MANIFEST_BEGIN(state)
    expect(state).toEqual({
      status: "loading",
      message: "Loading",
      errors: null
    })
  })

  it("sets status and given message", () => {
    mutations.MANIFEST_BEGIN(state, "test-message")
    expect(state).toEqual({
      status: "loading",
      message: "test-message",
      errors: null
    })
  })
})

describe("MANIFEST_SUCCESS", () => {
  const state = {
    status: "",
    message: "",
    errors: null
  }

  it("sets status and default message", () => {
    mutations.MANIFEST_SUCCESS(state)
    expect(state).toEqual({
      status: "success",
      message: "",
      errors: null
    })
  })

  it("sets status and given message", () => {
    mutations.MANIFEST_SUCCESS(state, "test-message")
    expect(state).toEqual({
      status: "success",
      message: "test-message",
      errors: null
    })
  })
})

describe("MANIFEST_ERROR", () => {
  const state = {
    status: "",
    message: "",
    errors: null
  }

  it("sets status and default message", () => {
    mutations.MANIFEST_ERROR(state, { error: "error message" })
    expect(state).toEqual({
      status: "error",
      message: "Something went wrong. Sorry",
      errors: { error: "error message" }
    })
  })

  it("sets status and given message", () => {
    mutations.MANIFEST_ERROR(state, { error: "error message" }, "test-message")
    expect(state).toEqual({
      status: "error",
      message: "test-message",
      errors: { error: "error message" }
    })
  })
})

describe("AUTHENTICATE", () => {
  const state = {
    user: null,
    authenticated: false
  }

  it("sets user and authenticated", () => {
    mutations.AUTHENTICATE(state, token)
    expect(state).toEqual({
      user: {
        name: "John Smith"
      },
      authenticated: true
    })
  })
})

describe("LOGOUT", () => {
  const state = {
    user: {
      name: "John Smith"
    },
    authenticated: true,
    errors: null
  }

  it("unsets user and authenticated", () => {
    mutations.LOGOUT(state)
    expect(state).toEqual({
      user: null,
      authenticated: false,
      errors: null
    })
  })
})

describe("REGISTER", () => {
  const state = {
    user: null
  }

  it("sets user", () => {
    mutations.REGISTER(state, {
      name: "John Smith"
    })
    expect(state).toEqual({
      user: {
        name: "John Smith"
      }
    })
  })
})

describe("PROFILE_SETTINGS", () => {
  const state = {
    profile: null
  }

  it("sets profile", () => {
    mutations.PROFILE_SETTINGS(state, {
      name: "John Smith"
    })
    expect(state).toEqual({
      profile: {
        name: "John Smith"
      }
    })
  })
})

describe("PROFILE_OPTIONS", () => {
  const state = {
    options: null
  }

  it("sets profile", () => {
    mutations.PROFILE_OPTIONS(state, {
      gender: ["F", "M"]
    })
    expect(state).toEqual({
      options: {
        gender: ["F", "M"]
      }
    })
  })
})

describe("USER_LIST", () => {
  const state = { userList: [] }

  it("lists users", () => {
    mutations.USER_LIST(state, [])
    expect(state).toEqual({ userList: [] })
  })
})

describe("USER_DETAIL", () => {
  const state = { userDetail: {} }

  it("display user info", () => {
    mutations.USER_DETAIL(state, {})
    expect(state).toEqual({ userDetail: {} })
  })
})
