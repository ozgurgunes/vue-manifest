<template>
  <b-container>
    <b-row>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Login</h1>
        <form-alert />
        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Email"
            :invalid-feedback="fieldError(errors && errors.email)"
          >
            <b-input
              type="text"
              id="email"
              placeholder="Enter your email"
              v-model="form.email"
              v-bind:class="{ 'is-invalid': errors && errors.email }"
            />
          </b-form-group>
          <p>
            <b-button block type="submit" id="login-button">
              Reset Password
            </b-button>
          </p>
        </b-form>
        <p>
          Back to <router-link :to="{ name: 'authLogin' }">login</router-link>.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormMixin from "../mixins/FormMixin.js"

export default {
  name: "passwordReset",
  mixins: [FormMixin],
  data() {
    return {
      form: { email: "" },
      dispatch: "manifest/PASSWORD_RESET",
      redirect: { name: "profileSettings" }
    }
  }
}
</script>
