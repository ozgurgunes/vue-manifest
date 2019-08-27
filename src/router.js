import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import PictureUpload from './views/PictureUpload.vue'
import EmailChange from './views/EmailChange.vue'
import EmailChangeConfirm from './views/EmailChangeConfirm.vue'
import PasswordReset from './views/PasswordReset.vue'
import PasswordChange from './views/PasswordChange.vue'
import PasswordResetConfirm from './views/PasswordResetConfirm.vue'
import Profile from './views/Profile.vue'
import ProfileUpdate from './views/ProfileUpdate.vue'
import Register from './views/Register.vue'
import Activate from './views/Activate.vue'
import UserList from './views/UserList.vue'
import UserDetail from './views/UserDetail.vue'

//import store from './store'

export const reactorGuard = (router, store) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      if (!store.getters['reactor/authenticated']) {
        store.dispatch('reactor/AUTHENTICATE')
          .then(() => {
            if (!store.getters['reactor/authenticated']) {
              next({ name: 'auth_login', query: { next: to.fullPath } })
            } else {
              next()
            }
          })
      } else {
        next()
      }
    } else if (to.meta.guest) {
      if (!store.getters['reactor/authenticated']) {
        store.dispatch('reactor/AUTHENTICATE')
          .then(() => {
            if (!store.getters['reactor/authenticated']) {
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

export default [
  {
    path: '/login',
    name: 'auth_login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/logout',
    name: 'auth_logout',
    component: Logout,
    //beforeEnter: redirectLogout
  },
  {
    path: '/register',
    name: 'auth_register',
    component: Register,
    meta: { guest: true }
  },
  {
    path: '/activate/:username/:key',
    name: 'auth_activate',
    component: Activate
  },
  {
    path: '/password/reset',
    name: 'password_reset',
    component: PasswordReset
  },
  {
    path: '/password/reset/:uid/:token',
    name: 'password_reset_confirm',
    component: PasswordResetConfirm
  },
  {
    path: '/profile',
    name: 'user_profile',
    component: Profile,
    meta: { auth: true }
  },
  {
    path: '/profile/update',
    name: 'user_update',
    component: ProfileUpdate,
    meta: { auth: true }
  },
  {
    path: '/picture/upload',
    name: 'picture_upload',
    component: PictureUpload,
    meta: { auth: true }
  },
  {
    path: '/email/change',
    name: 'email_change',
    component: EmailChange,
    meta: { auth: true }
  },
  {
    path: '/email/change/:username/:token',
    name: 'email_change_confirm',
    component: EmailChangeConfirm
  },
  {
    path: '/password/change',
    name: 'password_change',
    component: PasswordChange,
    meta: { auth: true }
  },
  {
    path: '/users',
    name: 'user_list',
    component: UserList,
    meta: { auth: true }
  },
  {
    path: '/users/:uid',
    name: 'user_detail',
    component: UserDetail,
    meta: { auth: true }
  }
]
