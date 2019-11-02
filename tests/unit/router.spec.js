import { mount } from "@vue/test-utils"
import App from "./App.vue"
import Test from "./Test.vue"
import Login from "@/views/Login.vue"
import routes from "@/router"
import { localVue, router, store } from "./tools"

beforeEach(() => {
  router.push({ name: "homepage" }).catch(() => {})
})

afterEach(() => {
  jest.resetAllMocks()
  jest.restoreAllMocks()
})

describe("router", () => {
  it("is in history mode", () => {
    expect(router.mode).toEqual("history")
  })
})

describe("authLogin", () => {
  let wrapper = mount(App, { localVue, router, store })
  let route = routes.find(r => r.name == "authLogin")

  it("routes to 'authLogin'.", async () => {
    store.state.manifest.authenticated = false
    await router.push(route.path).catch(() => {})
    expect(wrapper.find(route.component).exists()).toBe(true)
  })

  it("prevents authenticated users access to 'authLogin'", async () => {
    store.state.manifest.authenticated = true
    await router.push(route.path).catch(() => {})
    expect(wrapper.find(Test).exists()).toBe(true)
  })
})

//describe("authRegister", () => {
//  let wrapper = mount(App, { localVue, router, store })
//  let route = routes.find(r => r.name == "authRegister")
//
//  it("routes to 'authRegister'.", () => {
//    router.push(route.path).catch(() => {})
//    expect(wrapper.find(route.component).exists()).toBe(true)
//  })
//
//  it("prevents access to 'authRegister' from authenticated users", () => {
//    store.getters["manifest/authenticated"] = true
//    router.push(route.path).catch(() => {})
//    expect(wrapper.find(Test).exists()).toBe(true)
//  })
//})

describe("profileSettings", () => {
  let wrapper = mount(App, { localVue, router, store })
  let route = routes.find(r => r.name == "profileSettings")

  it("routes to 'profileSettins'.", async () => {
    store.state.manifest.user = {}
    store.state.manifest.authenticated = true
    await router
      .push(route.path)
      .then(() => {})
      .catch(() => {})
    expect(wrapper.find(route.component).exists()).toBe(true)
  })

  it("prevents unauthenticated users access to 'profileSettings'", async () => {
    store.state.manifest.user = {}
    store.state.manifest.authenticated = false
    await router
      .push(route.path)
      .then(() => {})
      .catch(() => {})
    expect(wrapper.find(Login).exists()).toBe(true)
  })
})

//describe("profileUpdate", () => {
//  let wrapper = mount(App, { localVue, router, store })
//  let route = routes.find(r => r.name == "profileUpdate")
//
//  it("routes to 'profileUpdate'.", () => {
//    store.getters["manifest/authenticated"] = true
//    router.push(route.path).catch(() => {})
//    expect(wrapper.find(route.component).exists()).toBe(true)
//  })
//
//  it("prevents access to 'profileUpdate' from unauthenticated users", () => {
//    store.getters["manifest/authenticated"] = false
//    router.push(route.path).catch(() => {})
//    expect(wrapper.find(Login).exists()).toBe(true)
//  })
//})

//describe("authActivate", () => {
//  let wrapper = mount(App, { localVue, router, store })
//  let route = routes.find(r => r.name == "authActivate")
//
//  it("routes to 'authActivate'.", () => {
//    store.getters["manifest/authenticated"] = false
//    router.push(route.path).catch(() => {})
//    expect(wrapper.find(route.component).exists()).toBe(true)
//  })
//})
