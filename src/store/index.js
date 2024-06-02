import { AUTH_TOKEN_KEY } from "@/defaults"
import actions from "@/actions"
import mutations from "@/mutations"

const state = {
  status: "loading",
  message: "Loading",
  errors: {},
  user: {},
  authenticated: false,
  profile: {},
  options: {},
  userList: [],
  userDetail: {}
}

const getters = {
  status: state => state.status,
  message: state => state.message,
  errors: state => state.errors,
  user: state => state.user,
  profile: state => state.profile,
  options: state => state.options,
  authenticated: state => state.authenticated,
  userList: state => state.userList,
  userDetail: state => state.userDetail,
  token: () => localStorage.getItem(AUTH_TOKEN_KEY)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export const manifestState = state
export const manifestGetters = getters
export const manifestActions = actions
export const manifestMutations = mutations
