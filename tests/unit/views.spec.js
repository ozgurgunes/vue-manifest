import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import VueRouter from "vue-router"
import Login from "@/views/Login.vue"
import BVue from "bootstrap-vue"

import { manifestRoutes } from "@/router"
import { manifestGetters } from "@/store"

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BVue)

describe("Login.vue", () => {
  let router
  let store

  beforeEach(() => {
    router = new VueRouter({
      manifestRoutes
    })
    store = new Vuex.Store({
      modules: {
        manifest: {
          namespaced: true,
          getters: manifestGetters
        }
      }
    })
  })

  it("handles login form.", () => {
    const wrapper = shallowMount(Login, {
      localVue,
      router,
      store
    })
    expect(wrapper.html()).toMatch("Username or email")
  })
})
