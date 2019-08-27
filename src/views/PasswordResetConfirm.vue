<template>

  <b-container>
    <b-alert 
      variant="danger"
      v-if="errors.token" 
    show>
        Token is invalid.
    </b-alert>
  <b-row v-if="!errors.token">
  <b-col id="login-view" offset="4" cols="4">

    <h1 class="mb-3">Reset Password</h1>

    <b-alert
      v-if="errors.length == 0"
    show>
      Pleaser enter new password.
    </b-alert>
    <b-alert
    variant="warning"
      v-if="errors.length != 0 && !errors.non_field_errors"
    show>
      Pleaser enter new password.
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
    
      <b-form-group label="Password"
        :invalid-feedback="fieldError(errors.new_password1)">
        <b-input type="password" id="password1" placeholder="Enter a password"
          v-model="form.newPassword1" :class="{ 'is-invalid': errors.new_password1 }" />
      </b-form-group>

      <b-form-group label="Confrim password"
        :invalid-feedback="fieldError(errors.new_password2)">
        <b-input type="password" id="password2" placeholder="Enter password again"
          v-model="form.newPassword2" :class="{ 'is-invalid': errors.new_password2 }" />
      </b-form-group>
      <input type="hidden" name="uid" :value="form.uid">
      <input type="hidden" name="token" :value="form.token">

      <p><b-button block type="submit" id="register-button">
        Set Password
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
  name: 'password_reset_confirm',
  components: { FormField },
  data() {
    return {
      form: {
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        newPassword1: '',
        newPassword2: '',
      }
    }
  },
  computed: {
    ...mapState({
      errors: s => s.reactor.errors
    }),
  },
  created () {
    let verification = {
      uid: this.$route.params.uid,
      token: this.$route.params.token,
    }
    this.$store.dispatch('reactor/PASSWORD_RESET_VERIFY', verification)
    .catch(err => {
      console.log(err)
        this.$store.state.reactor.errors = err
    })
  },
  methods: {
    fieldError: (errors) => {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm () {
      this.$store.dispatch('reactor/PASSWORD_RESET_CONFIRM', this.form)
        .then(() => {
          if (this.errors.length <= 0) {
            this.$router.push({name: 'user_profile'})
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
