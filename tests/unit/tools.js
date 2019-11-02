/* istanbul ignore file */
import { createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import BVue from "bootstrap-vue"
import Router from "vue-router"
import manifestRoutes, { manifestGuard } from "@/router"
import {
  manifestGetters,
  manifestActions,
  manifestState,
  manifestMutations
} from "@/store"
import TestRoute from "./Test.vue"

const localStorageMock = new (class {
  store = {}
  setItem = (key, val) => (this.store[key] = val)
  getItem = key => this.store[key]
  removeItem = key => delete this.store[key]
  clear = () => (this.store = {})
})()

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(BVue)

const store = new Vuex.Store({
  modules: {
    manifest: {
      namespaced: true,
      state: manifestState,
      getters: manifestGetters,
      actions: manifestActions,
      mutations: manifestMutations
    }
  }
})

const routes = [
  {
    path: "/",
    name: "homepage",
    component: TestRoute
  }
].concat(manifestRoutes)

const router = new Router({
  mode: "history",
  base: process.env.publicPath,
  saveScrollPosition: true,
  routes: routes
})

const mockPromise = {
  resolve: response => {
    return jest.fn(() => Promise.resolve(response || "success-message"))
  },
  reject: response => {
    return jest.fn(() =>
      Promise.reject(response || { response: { data: "error-message" } })
    )
  }
}

manifestGuard(router, store)

export { localStorageMock, localVue, store, router, mockPromise }
