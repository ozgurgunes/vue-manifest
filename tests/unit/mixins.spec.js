import { mount } from "@vue/test-utils"
import FormMixin from "@/mixins/FormMixin"
import VerificationMixin from "@/mixins/VerificationMixin"
import { localVue, router, store, mockPromise } from "./tools"
import service from "@/service"

beforeEach(() => {
  service.activate = mockPromise.resolve()
  store.dispatch = mockPromise.resolve()
  router.push = mockPromise.resolve()
})

afterEach(() => {
  store.state.manifest.errors = null
  jest.resetAllMocks()
})

describe("FormMixin.vue", () => {
  let data = {
    form: { username: "john", password: "pass" },
    dispatch: "manifest/LOGIN",
    redirect: { name: "profileSettings" }
  }
  let FormComponent = {
    name: "form-component",
    mixins: [FormMixin],
    data() {
      return data
    },
    template: "<div>{{ errors && fieldError(errors.username) }}</div>"
  }
  let wrapper = mount(FormComponent, { localVue, router, store })

  it("submits form", () => {
    wrapper.vm.submitForm()
    expect(store.dispatch).toBeCalledWith(data.dispatch, data.form)
  })

  it("displays form errors", () => {
    store.state.manifest.errors = { username: ["username error"] }
    expect(wrapper.html()).toMatch("username error")
  })
})

describe("VerificationMixin.vue", () => {
  let data = {
    verification: { uid: "john", token: "fake-token" },
    dispatch: "manifest/ACTIVATE",
    redirect: { name: "profileSettings" }
  }
  let VerificationComponent = {
    name: "verification-component",
    mixins: [VerificationMixin],
    data() {
      return data
    },
    template: "<div>{{ errors && fieldError(errors.username) }}</div>"
  }
  let wrapper = mount(VerificationComponent, { localVue, router, store })

  it("submits verification", () => {
    wrapper.vm.submitVerification()
    expect(store.dispatch).toBeCalledWith(data.dispatch, data.verification)
  })

  it("displays verification errors", () => {
    store.state.manifest.errors = { username: ["username error"] }
    expect(wrapper.html()).toMatch("username error")
  })
})
