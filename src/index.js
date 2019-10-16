import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

export { default as manifestRoutes, manifestGuard } from './router.js'
export { default as manifestStore } from './store/index.js'
export { default as Login } from './views/Login.vue'
export { default as Logout } from './views/Logout.vue'
export { default as PictureUpload } from './views/PictureUpload.vue'
export { default as EmailChange } from './views/EmailChange.vue'
export { default as EmailChangeConfirm } from './views/EmailChangeConfirm.vue'
export { default as PasswordReset } from './views/PasswordReset.vue'
export { default as PasswordChange } from './views/PasswordChange.vue'
export {
  default as PasswordResetConfirm
} from './views/PasswordResetConfirm.vue'
export { default as ProfileSettings } from './views/ProfileSettings.vue'
export { default as ProfileUpdate } from './views/ProfileUpdate.vue'
export { default as Register } from './views/Register.vue'
export { default as Activate } from './views/Activate.vue'
export { default as UserList } from './views/UserList.vue'
export { default as UserDetail } from './views/UserDetail.vue'
export { default as NavbarManifest } from './components/Navbar.vue'
export { default as FormAlert } from './components/FormAlert.vue'
