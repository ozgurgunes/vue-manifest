<template>
  <b-container>
    <b-row v-if="user">
      <h2>We just sent an email to {{ user.email }}.</h2>
    </b-row>

    <b-row v-if="!user">
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Register</h1>

        <b-alert :show="errors.length == 0">
          Pleaser fill all fields.
        </b-alert>

        <b-alert
          :show="errors.length != 0 && !errors.non_field_errors"
          variant="warning"
        >
          Pleaser fill all fields.
        </b-alert>

        <b-alert :show="errors.non_field_errors" variant="danger">
          <div v-for="(error, index) in errors.nonFieldErrors" :key="index">
            {{ error }}
          </div>
        </b-alert>

        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Username"
            :invalid-feedback="fieldError(errors.username)"
          >
            <b-form-input
              type="text"
              placeholder="Pick a username"
              v-model="form.username"
              :class="{ 'is-invalid': errors.username }"
            />
          </b-form-group>

          <b-form-group
            label="Email address"
            :invalid-feedback="fieldError(errors.email)"
          >
            <b-form-input
              type="email"
              placeholder="Enter your email address"
              v-model="form.email"
              :class="{ 'is-invalid': errors.email }"
            />
          </b-form-group>

          <b-form-group
            label="Password"
            :invalid-feedback="fieldError(errors.password1)"
          >
            <b-form-input
              type="password"
              placeholder="Enter a password"
              v-model="form.password1"
              :class="{ 'is-invalid': errors.password1 }"
            />
          </b-form-group>

          <b-form-group
            label="Confirm password"
            :invalid-feedback="fieldError(errors.password2)"
          >
            <b-form-input
              type="password"
              placeholder="Enter password again"
              v-model="form.password2"
              :class="{ 'is-invalid': errors.password2 }"
            />
          </b-form-group>

          <p>
            <b-button block type="submit" variant="primary"
              >Create Account</b-button
            >
          </p>
        </b-form>

        <p>Back to <b-link :to="{ name: 'auth_login' }">login</b-link>.</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      form: {
        username: '',
        password1: '',
        password2: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState({
      errors: s => s.reactor.errors,
      user: s => s.reactor.user
    })
  },
  methods: {
    fieldError: errors => {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm() {
      this.$store.dispatch('reactor/REGISTER', this.form)
    }
  }
}
</script>
