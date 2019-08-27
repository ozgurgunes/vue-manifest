<template>

  <b-container>
  <b-row>
  <b-col id="login-view" offset="4" cols="4">

    <h1 class="mb-3">Register</h1>

    <b-alert
      v-if="errors.length == 0"
    show>
      Pleaser fill all fields.
    </b-alert>
    <b-alert
    variant="warning"
      v-if="errors.length != 0 && !errors.non_field_errors"
    show>
      Pleaser fill all fields.
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
    
      <b-form-group label="Username"
        :invalid-feedback="fieldError(errors.username)">
        <b-input type="text" id="username" placeholder="Pick a username"
          v-model="user.username" :class="{ 'is-invalid': errors.username }" />
      </b-form-group>

      <b-form-group label="Email address"
        :invalid-feedback="fieldError(errors.email)">
        <b-input type="email" id="email" placeholder="Enter your email address"
          v-model="user.email" :class="{ 'is-invalid': errors.email }" />
      </b-form-group>

      <b-form-group label="Password"
        :invalid-feedback="fieldError(errors.password1)">
        <b-input type="password" id="password1" placeholder="Enter a password"
          v-model="user.password1" :class="{ 'is-invalid': errors.password1 }" />
      </b-form-group>

      <b-form-group label="Confirm password"
        :invalid-feedback="fieldError(errors.password2)">
        <b-input type="password" id="password2" placeholder="Enter password again"
          v-model="user.password2" :class="{ 'is-invalid': errors.password2 }" />
      </b-form-group>

      <p><b-button block type="submit" id="register-button">
        Create Account
      </b-button></p>

    </b-form>

    <p>
      Back to <router-link :to="{name: 'auth_login'}">login</router-link>.
    </p>

  </b-col>
  </b-row>
  </b-container>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import FormField from '../components/FormField.vue'

export default {
  name: 'register',
  components: { FormField },
  data() {
    return {
      value: '',
      user: {
        username: '',
        password1: '',
        password2: '',
        email: '',
      }
    }
  },
  computed: {
    ...mapState({
      errors: s => s.reactor.errors
    }),
  },
  methods: {
    fieldError: (errors) => {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm () {
      this.$store.dispatch('reactor/REGISTER', this.user)
        .then(() => {
          if (this.errors.length <= 0) {
            this.$router.push('profile/')
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

<style>
form input {
  display: block
}

.error {
  color: crimson;
  font-size: 12px;
}
</style>
