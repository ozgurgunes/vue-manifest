<template>
  <b-container>
    <b-row v-if="user">
      <h2>We just sent an email to {{ user.email }}.</h2>
    </b-row>

    <b-row v-if="!user">
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Register</h1>
        <form-alert />
        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Username"
            :invalid-feedback="errors && fieldError(errors.username)"
          >
            <b-form-input
              type="text"
              placeholder="Pick a username"
              v-model="form.username"
              :class="{ 'is-invalid': errors && errors.username }"
            />
          </b-form-group>

          <b-form-group
            label="Email address"
            :invalid-feedback="errors && fieldError(errors.email)"
          >
            <b-form-input
              type="email"
              placeholder="Enter your email address"
              v-model="form.email"
              :class="{ 'is-invalid': errors && errors.email }"
            />
          </b-form-group>

          <b-form-group
            label="Password"
            :invalid-feedback="errors && fieldError(errors.password1)"
          >
            <b-form-input
              type="password"
              placeholder="Enter a password"
              v-model="form.password1"
              :class="{ 'is-invalid': errors && errors.password1 }"
            />
          </b-form-group>

          <b-form-group
            label="Confirm password"
            :invalid-feedback="errors && fieldError(errors.password2)"
          >
            <b-form-input
              type="password"
              placeholder="Enter password again"
              v-model="form.password2"
              :class="{ 'is-invalid': errors && errors.password2 }"
            />
          </b-form-group>

          <p>
            <b-button block type="submit" variant="primary"
              >Create Account</b-button
            >
          </p>
        </b-form>

        <p>
          Back to
          <b-link :to="{ name: 'authLogin' }">login</b-link>.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormMixin from "../mixins/FormMixin.js"
import { mapGetters } from "vuex"

export default {
  name: "register",
  mixins: [FormMixin],
  data() {
    return {
      form: {
        username: "",
        password1: "",
        password2: "",
        email: ""
      },
      dispatch: "manifest/REGISTER"
    }
  },
  computed: {
    ...mapGetters("manifest", ["user"])
  }
}
</script>
