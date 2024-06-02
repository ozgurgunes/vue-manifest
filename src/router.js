import { default as Login } from "@/views/Login"
import { default as Logout } from "@/views/Logout"
import { default as PictureUpload } from "@/views/PictureUpload"
import { default as EmailChange } from "@/views/EmailChange"
import { default as EmailChangeConfirm } from "@/views/EmailChangeConfirm"
import { default as PasswordReset } from "@/views/PasswordReset"
import { default as PasswordChange } from "@/views/PasswordChange"
import { default as PasswordResetConfirm } from "@/views/PasswordResetConfirm"
import { default as ProfileSettings } from "@/views/ProfileSettings"
import { default as ProfileUpdate } from "@/views/ProfileUpdate"
import { default as Register } from "@/views/Register"
import { default as Activate } from "@/views/Activate"
import { default as UserList } from "@/views/UserList"
import { default as UserDetail } from "@/views/UserDetail"

export const manifestGuard = (router, store) => {
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
