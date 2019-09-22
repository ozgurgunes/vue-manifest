<template>
  <b-container>
    <b-row>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Login</h1>
        <form-alert />
        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Username or email"
            :invalid-feedback="errors.password"
          >
            <b-input
              type="text"
              placeholder="Enter your username or email"
              v-model="user.username"
              v-bind:class="{ 'is-invalid': errors.username }"
            />
          </b-form-group>

          <b-form-group label="Password" :invalid-feedback="errors.password">
            <b-input
              type="password"
              placeholder="Enter your password"
              v-model="user.password"
              v-bind:class="{ 'is-invalid': errors.password }"
            />
          </b-form-group>

          <p>
            <b-button block type="submit" id="login-button">Login</b-button>
          </p>
        </b-form>

        <p>
          <b-link :to="{ name: 'auth_register' }">create account</b-link>|
          <b-link :to="{ name: 'password_reset' }">reset password</b-link>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import FormAlert from '../components/FormAlert'

export default {
  name: 'login',
  components: { FormAlert },
  data() {
    return {
      user: { username: '', password: '' }
    }
  },
  computed: {
    ...mapGetters('reactor', ['errors'])
  },
  methods: {
    fieldError: errors => {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm() {
      this.$store.dispatch('reactor/LOGIN', this.user).then(() => {
        if (this.errors.length <= 0) {
          this.$router.push(
            this.$route.query.next || { name: 'profile_settings' }
          )
        }
      })
    }
  }
}
</script>
