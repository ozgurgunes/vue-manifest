import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import PictureUpload from './views/PictureUpload.vue'
import EmailChange from './views/EmailChange.vue'
import EmailChangeConfirm from './views/EmailChangeConfirm.vue'
import PasswordReset from './views/PasswordReset.vue'
import PasswordChange from './views/PasswordChange.vue'
import PasswordResetConfirm from './views/PasswordResetConfirm.vue'
import ProfileSettings from './views/ProfileSettings.vue'
import ProfileUpdate from './views/ProfileUpdate.vue'
import Register from './views/Register.vue'
import Activate from './views/Activate.vue'
import UserList from './views/UserList.vue'
import UserDetail from './views/UserDetail.vue'

// import store from './store'

export const manifestGuard = (router, store) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      if (!store.getters['manifest/authenticated']) {
        store.dispatch('manifest/AUTHENTICATE').then(() => {
          if (!store.getters['manifest/authenticated']) {
            next({ name: 'auth_login', query: { next: to.fullPath } })
          } else {
            next()
          }
        })
      } else {
        next()
      }
    } else if (to.meta.guest) {
      if (!store.getters['manifest/authenticated']) {
        store.dispatch('manifest/AUTHENTICATE').then(() => {
          if (!store.getters['manifest/authenticated']) {
            next()
          } else {
            next('/')
          }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
  return router
}

const base = '/manifest'

export default [
  {
    path: base + '/login',
    name: 'auth_login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: base + '/logout',
    name: 'auth_logout',
    component: Logout
    // beforeEnter: redirectLogout
  },
  {
    path: base + '/register',
    name: 'auth_register',
    component: Register,
    meta: { guest: true }
  },
  {
    path: base + '/activate/:username/:token',
    name: 'auth_activate',
    component: Activate
  },
  {
    path: base + '/password/reset',
    name: 'password_reset',
    component: PasswordReset
  },
  {
    path: base + '/password/reset/:uid/:token',
    name: 'password_reset_confirm',
    component: PasswordResetConfirm
  },
  {
    path: base + '/profile',
    name: 'profile_settings',
    component: ProfileSettings,
    meta: { auth: true }
  },
  {
    path: base + '/profile/update',
    name: 'profile_update',
    component: ProfileUpdate,
    meta: { auth: true }
  },
  {
    path: base + '/picture/upload',
    name: 'picture_upload',
    component: PictureUpload,
    meta: { auth: true }
  },
  {
    path: base + '/email/change',
    name: 'email_change',
    component: EmailChange,
    meta: { auth: true }
  },
  {
    path: base + '/email/change/confirm/:username/:token',
    name: 'email_change_confirm',
    component: EmailChangeConfirm
  },
  {
    path: base + '/password/change',
    name: 'password_change',
    component: PasswordChange,
    meta: { auth: true }
  },
  {
    path: base + '/users',
    name: 'user_list',
    component: UserList,
    meta: { auth: true }
  },
  {
    path: base + '/users/:uid',
    name: 'user_detail',
    component: UserDetail,
    meta: { auth: true }
  }
]
