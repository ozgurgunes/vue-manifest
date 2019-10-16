<template>
  <b-container>
    <b-row>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Change Password</h1>
        <form-alert />
        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Old Password"
            :invalid-feedback="errors && fieldError(errors.oldPassword)"
          >
            <b-input
              type="password"
              id="old_password"
              placeholder="Enter a password"
              v-model="form.oldPassword"
              :class="{ 'is-invalid': errors && errors.oldPassword }"
            />
          </b-form-group>

          <b-form-group
            label="New Password"
            :invalid-feedback="errors && fieldError(errors.newPassword1)"
          >
            <b-input
              type="password"
              id="new_password1"
              placeholder="Enter a password"
              v-model="form.newPassword1"
              :class="{ 'is-invalid': errors && errors.newPassword1 }"
            />
          </b-form-group>

          <b-form-group
            label="Confrim password"
            :invalid-feedback="errors && fieldError(errors.newPassword2)"
          >
            <b-input
              type="password"
              id="new_password2"
              placeholder="Enter password again"
              v-model="form.newPassword2"
              :class="{ 'is-invalid': errors && errors.newPassword2 }"
            />
          </b-form-group>
          <input type="hidden" name="uid" :value="form.uid" />
          <input type="hidden" name="token" :value="form.token" />

          <p>
            <b-button block type="submit" id="register-button">
              Set Password
            </b-button>
          </p>
        </b-form>

        <p>
          Back to <router-link :to="{ name: 'auth_login' }">login</router-link>.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormMixin from '../components/FormMixin.js'

export default {
  name: 'password_reset_confirm',
  mixins: [FormMixin],
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      },
      dispatch: 'manifest/PASSWORD_CHANGE',
      redirect: { name: 'profile_settings' }
    }
  }
}
</script>
