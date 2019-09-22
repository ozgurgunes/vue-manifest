<template>
  <b-container>
    <b-row>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Login</h1>
        <b-alert v-if="errors.length == 0" show>
          Pleaser enter your email.
        </b-alert>
        <b-alert
          variant="warning"
          v-if="errors.length != 0 && !errors.non_field_errors"
          show
        >
          Pleaser enter your email.
        </b-alert>
        <b-alert variant="danger" v-if="errors.non_field_errors" show>
          <div v-for="(error, index) in errors.nonFieldErrors" :key="index">
            {{ error }}
          </div>
        </b-alert>
        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Email"
            :invalid-feedback="fieldError(errors.email)"
          >
            <b-input
              type="text"
              id="email"
              placeholder="Enter your email"
              v-model="email"
              v-bind:class="{ 'is-invalid': errors.email }"
            />
          </b-form-group>
          <p>
            <b-button block type="submit" id="login-button">
              Reset Password
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
import { mapGetters } from 'vuex'

export default {
  name: 'password_reset',
  data() {
    return {
      email: ''
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
      this.$store
        .dispatch('reactor/PASSWORD_RESET', this.email)
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
