<template>
  <b-container>
    <b-row>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Change Password</h1>

        <b-alert v-if="errors.length == 0" show>
          Pleaser enter new password.
        </b-alert>
        <b-alert
          variant="warning"
          v-if="errors.length != 0 && !errors.non_field_errors"
          show
        >
          Pleaser enter new password.
        </b-alert>
        <b-alert variant="danger" v-if="errors.non_field_errors" show>
          <div v-for="(error, index) in errors.nonFieldErrors" :key="index">
            {{ error }}
          </div>
        </b-alert>

        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Old Password"
            :invalid-feedback="fieldError(errors.oldPassword)"
          >
            <b-input
              type="password"
              id="old_password"
              placeholder="Enter a password"
              v-model="form.oldPassword"
              :class="{ 'is-invalid': errors.oldPassword }"
            />
          </b-form-group>

          <b-form-group
            label="New Password"
            :invalid-feedback="fieldError(errors.newPassword1)"
          >
            <b-input
              type="password"
              id="new_password1"
              placeholder="Enter a password"
              v-model="form.newPassword1"
              :class="{ 'is-invalid': errors.newPassword1 }"
            />
          </b-form-group>

          <b-form-group
            label="Confrim password"
            :invalid-feedback="fieldError(errors.newPassword2)"
          >
            <b-input
              type="password"
              id="new_password2"
              placeholder="Enter password again"
              v-model="form.newPassword2"
              :class="{ 'is-invalid': errors.newPassword2 }"
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
import { mapState } from 'vuex'

export default {
  name: 'password_reset_confirm',
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      }
    }
  },
  computed: {
    ...mapState({
      errors: s => s.reactor.errors
    })
  },
  methods: {
    fieldError(errors) {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm() {
      this.$store
        .dispatch('reactor/PASSWORD_CHANGE', this.form)
        .then(() => {
          if (this.errors.length <= 0) {
            this.$router.push({ name: 'profile_settings' })
          }
        })
        .catch(err => {
          console.log(err)
          this.$store.state.reactor.errors = err
        })
    }
  }
}
</script>
