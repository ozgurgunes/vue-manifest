import { shallowMount } from "@vue/test-utils"
import Activate from "@/views/Activate.vue"
import EmailChange from "@/views/EmailChange.vue"
import EmailChangeConfirm from "@/views/EmailChangeConfirm.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import PasswordChange from "@/views/PasswordChange.vue"
import PasswordReset from "@/views/PasswordReset.vue"
import PasswordResetConfirm from "@/views/PasswordResetConfirm.vue"
import ProfileSettings from "@/views/ProfileSettings.vue"
import ProfileUpdate from "@/views/ProfileUpdate.vue"
import PictureUpload from "@/views/PictureUpload.vue"
import Logout from "@/views/Logout.vue"
import UserList from "@/views/UserList.vue"
import UserDetail from "@/views/UserDetail.vue"
import service from "@/service"

import { localVue, router, store, mockPromise } from "./tools"

beforeEach(() => {
  store.dispatch = mockPromise.resolve()
})

afterEach(() => {
  jest.resetAllMocks()
})

describe("Login.vue", () => {
  service.login = mockPromise.resolve()
  store.getters = jest.fn()
  store.getters["manifest/errors"] = {}
  let wrapper = shallowMount(Login, { localVue, router, store })
  it("displays login form.", () => {
    expect(wrapper.text()).toMatch("Login")
  })

  //it("submits login form", () => {
  //  let data = {
  //    form: { username: "john", password: "pass" },
  //    redirect: { name: "profileSettings" }
  //  }
  //  store.dispatch = jest.fn(() => Promise.resolve())
  //  wrapper.vm.$router.push = jest.fn(() => Promise.resolve())
  //  wrapper.setData(data)
  //  wrapper.vm.submitForm()
  //  expect(store.dispatch).toHaveBeenCalledWith("manifest/LOGIN", data.form)
  //})

  //it("displays form errors", () => {
  //  wrapper.vm.$store.state.manifest.errors = { username: ["username error"] }
  //  expect(wrapper.html()).toMatch("username error")
  //})
})

describe("Logout.vue", () => {
  service.logout = mockPromise.resolve()
  store.commit = jest.fn()
  let wrapper = shallowMount(Logout, { localVue, router, store })
  it("logs user out.", () => {
    expect(wrapper.text()).toMatch("Logged out")
  })
})

describe("Register.vue", () => {
  store.getters = jest.fn()
  store.getters["manifest/user"] = null
  store.getters["manifest/errors"] = {}
  let wrapper = shallowMount(Register, { localVue, router, store })
  it("activates user account.", () => {
    expect(wrapper.text()).toMatch("Register")
  })
})

describe("Activate.vue", () => {
  service.activate = mockPromise.resolve()
  store.getters = jest.fn()
  store.getters["manifest/errors"] = null
  let wrapper = shallowMount(Activate, { localVue, router, store })
  it("activates user account.", () => {
    expect(wrapper.text()).toMatch("Account activation successful.")
  })

  //it("validates token", () => {
  //  let data = {
  //    activation: { username: "john", token: "fake-token" }
  //  }
  //  wrapper.vm.activation = data
  //  service.activate = mockPromise.resolve()
  //  store.dispatch = mockPromise.resolve()
  //  wrapper.vm.activate()
  //  expect(store.dispatch).toHaveBeenCalledWith("manifest/ACTIVATE", data)
  //})
})


describe("ProfileSettings.vue", () => {
  service.profileSettings = mockPromise.resolve()
  service.profileOptions = mockPromise.resolve()
  store.getters = jest.fn()
  store.getters["manifest/user"] = { email: "john@example.com" }
  store.getters["manifest/message"] = null
  store.getters["manifest/errors"] = {}
  let wrapper = shallowMount(ProfileSettings, { localVue, router, store })
  it("profile settings options.", () => {
    expect(wrapper.text()).toMatch("Personal Information")
  })
})

describe("ProfileUpdate.vue", () => {
  let wrapper = shallowMount(ProfileUpdate, { localVue, router, store })
  it("profile settings options.", () => {
    expect(wrapper.text()).toMatch("Update Profile")
  })
})

describe("PictureUpload.vue", () => {
  let wrapper = shallowMount(PictureUpload, { localVue, router, store })
  it("uploads profile picture.", () => {
    expect(wrapper.text()).toMatch("Upload Profile")
  })
  it("submits form", () => {
    store.dispatch = mockPromise.resolve()
    wrapper.vm.$router.push = mockPromise.resolve()
    wrapper.vm.submitForm()
    let formData = new FormData()
    formData.append("picture", "")
    expect(store.dispatch).toHaveBeenCalledWith(
      "manifest/PICTURE_UPLOAD",
      formData
    )
  })
})

describe("EmailChange.vue", () => {
  let wrapper = shallowMount(EmailChange, { localVue, router, store })
  it("activates user account.", () => {
    expect(wrapper.text()).toMatch("Change email adress")
  })
})

describe("EmailChangeConfirm.vue", () => {
  store.dispatch = mockPromise.resolve()
  let wrapper = shallowMount(EmailChangeConfirm, { localVue, router, store })
  it("confirms email change", () => {
    expect(wrapper.text()).toMatch("Token is invalid. Email address changed.")
  })
})

describe("PasswordChange.vue", () => {
  store.dispatch = mockPromise.resolve()
  let wrapper = shallowMount(PasswordChange, { localVue, router, store })
  it("confirms email change", () => {
    expect(wrapper.text()).toMatch("Change Password")
  })
})

describe("PasswordReset.vue", () => {
  store.dispatch = mockPromise.resolve()
  let wrapper = shallowMount(PasswordReset, { localVue, router, store })
  it("resets password", () => {
    expect(wrapper.text()).toMatch("Reset Password")
  })
})

describe("PasswordResetConfirm.vue", () => {
  store.dispatch = mockPromise.resolve()
  let wrapper = shallowMount(PasswordResetConfirm, { localVue, router, store })
  it("confirms password reset", () => {
    expect(wrapper.text()).toMatch("Reset Password")
  })
})

describe("UserList.vue", () => {
  store.dispatch = mockPromise.resolve()
  let wrapper = shallowMount(UserList, { localVue, router, store })
  it("lists users", () => {
    expect(wrapper.text()).toMatch("Users")
  })
})

describe("UserDetail.vue", () => {
  store.dispatch = mockPromise.resolve()
  let wrapper = shallowMount(UserDetail, { localVue, router, store })
  it("displays user info", () => {
    expect(wrapper.text()).toMatch("User Profile")
  })
})
