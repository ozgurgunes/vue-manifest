<template>

  <b-container>
  <b-row>

  <b-col id="email-change-view" offset="4" cols="4">
    <h1 class="mb-3">Change email adress</h1>
    <b-alert
      v-if="errors.length == 0"
    show>
      Pleaser enter your email.
    </b-alert>
    <b-alert
    variant="warning"
      v-if="errors.length != 0 && !errors.non_field_errors"
    show>
      Pleaser enter your email.
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
      <p><b-button block type="submit" id="login-button">
        Change email
      </b-button></p>
    </b-form>
    <p>
      Back to <router-link :to="{name: 'user_profile'}">settings</router-link>.
    </p>
  </b-col>

  </b-row>
  </b-container>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'email_change',
	data () {
    return {
      email: ''
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
    submitForm: function () {
      this.$store.dispatch('reactor/EMAIL_CHANGE', this.email)
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

.error {
  color: crimson;
  font-size: 12px;
}
</style>
