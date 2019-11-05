import Login from "./views/Login.vue"
import Logout from "./views/Logout.vue"
import PictureUpload from "./views/PictureUpload.vue"
import EmailChange from "./views/EmailChange.vue"
import EmailChangeConfirm from "./views/EmailChangeConfirm.vue"
import PasswordReset from "./views/PasswordReset.vue"
import PasswordChange from "./views/PasswordChange.vue"
import PasswordResetConfirm from "./views/PasswordResetConfirm.vue"
import ProfileSettings from "./views/ProfileSettings.vue"
import ProfileUpdate from "./views/ProfileUpdate.vue"
import Register from "./views/Register.vue"
import Activate from "./views/Activate.vue"
import UserList from "./views/UserList.vue"
import UserDetail from "./views/UserDetail.vue"

export const manifestGuard = async (router, store) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      if (!store.getters["manifest/authenticated"]) {
        store.dispatch("manifest/AUTHENTICATE").then(() => {
          if (!store.getters["manifest/authenticated"]) {
            next({ name: "authLogin", query: { next: to.fullPath } })
          } else {
            next()
          }
        })
      } else {
        next()
      }
    } else if (to.meta.guest) {
      if (!store.getters["manifest/authenticated"]) {
        store.dispatch("manifest/AUTHENTICATE").then(() => {
          if (!store.getters["manifest/authenticated"]) {
            next()
          } else {
            next({ name: "homepage" })
          }
        })
      } else {
        next({ name: "homepage" })
      }
    } else {
      next()
    }
  })
  return router
}

const base = "/manifest"

export default [
  {
    path: base + "/login",
    name: "authLogin",
    component: Login,
    meta: { guest: true }
  },
  {
    path: base + "/logout",
    name: "authLogout",
    component: Logout
    // beforeEnter: redirectLogout
  },
  {
    path: base + "/register",
    name: "authRegister",
    component: Register,
    meta: { guest: true }
  },
  {
    path: base + "/activate/:uid/:token",
    name: "authActivate",
    component: Activate
  },
  {
    path: base + "/password/reset",
    name: "passwordReset",
    component: PasswordReset
  },
  {
    path: base + "/password/reset/confirm/:uid/:token",
    name: "passwordResetConfirm",
    component: PasswordResetConfirm
  },
  {
    path: base + "/profile",
    name: "profileSettings",
    component: ProfileSettings,
    meta: { auth: true }
  },
  {
    path: base + "/profile/update",
    name: "profileUpdate",
    component: ProfileUpdate,
    meta: { auth: true }
  },
  {
    path: base + "/picture/upload",
    name: "pictureUpload",
    component: PictureUpload,
    meta: { auth: true }
  },
  {
    path: base + "/email/change",
    name: "emailChange",
    component: EmailChange,
    meta: { auth: true }
  },
  {
    path: base + "/email/change/confirm/:uid/:token",
    name: "emailChangeConfirm",
    component: EmailChangeConfirm
  },
  {
    path: base + "/password/change",
    name: "passwordChange",
    component: PasswordChange,
    meta: { auth: true }
  },
  {
    path: base + "/users",
    name: "userList",
    component: UserList,
    meta: { auth: true }
  },
  {
    path: base + "/users/:uid",
    name: "userDetail",
    component: UserDetail,
    meta: { auth: true }
  }
]
