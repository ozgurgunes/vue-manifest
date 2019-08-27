<template>

  <b-container>
  <b-row>

  <b-col id="login-view" offset="4" cols="4">
    <h1 class="mb-3">Login</h1>
    <b-alert
      v-if="errors.length == 0"
    show>
      Pleaser enter your username and password.
    </b-alert>
    <b-alert
    variant="warning"
      v-if="errors.length != 0 && !errors.non_field_errors"
    show>
      Pleaser enter your username and password.
    </b-alert>
    <b-alert 
      variant="danger"
      v-if="errors.non_field_errors" 
    show>
      <div v-for="error in errors.non_field_errors">
        {{ error }}
      </div>
    </b-alert>
    <b-form @submit="submitForm()" v-on:submit.prevent>
    <b-form-group 
      label="Username or email"
      :invalid-feedback="fieldError(errors.username)"
    >
      <b-input 
        type="text" 
        id="username" 
        placeholder="Enter your username or email" 
        v-model="user.username" 
        v-bind:class="{ 'is-invalid': errors.username }"
      />
    </b-form-group>
    <b-form-group 
      label="Password"
      :invalid-feedback="fieldError(errors.password)"
    >
      <b-input 
      type="password" id="password" placeholder="Enter your password" 
      v-model="user.password" 
      v-bind:class="{ 'is-invalid': errors.password }"
    />
    </b-form-group>
      <p><b-button block type="submit" id="login-button">
        login
      </b-button></p>
    </b-form>
    <p>
      <router-link :to="{name: 'auth_register'}">create account</router-link> |
      <router-link :to="{name: 'password_reset'}">reset password</router-link>
    </p>
  </b-col>

  </b-row>
  </b-container>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'login',
	data () {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  computed: {
	  ...mapGetters('reactor', ['errors'])
  },
  methods: {
    fieldError: (errors) => {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm () {
      this.$store.dispatch('reactor/LOGIN', this.user)
        .then(() => {
          if (this.errors.length <= 0) {
            this.$router.push(this.$route.query.next || '/')
          }
        })
        .catch(err => {
          this.$store.state.reactor.errors.push(...err)
        })
    }
  }
}
</script>

<style>
form input {
  display: block
}
</style>
