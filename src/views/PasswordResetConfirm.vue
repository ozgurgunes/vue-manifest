<template>
  <b-container>
    <b-alert variant="danger" v-if="errors && errors.token" show
      >Token is invalid.</b-alert
    >
    <b-row v-else>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Reset Password</h1>

        <form-alert />

        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="Password"
            :invalid-feedback="errors && fieldError(errors.newPassword1)"
          >
            <b-input
              type="password"
              id="password1"
              placeholder="Enter a password"
              v-model="form.newPassword1"
              :class="{ 'is-invalid': errors && errors.newPassword1 }"
            />
          </b-form-group>

          <b-form-group
            label="Confirm password"
            :invalid-feedback="errors && fieldError(errors.newPassword2)"
          >
            <b-input
              type="password"
              id="password2"
              placeholder="Enter password again"
              v-model="form.newPassword2"
              :class="{ 'is-invalid': errors && errors.newPassword2 }"
            />
          </b-form-group>
          <input type="hidden" name="uid" :value="form.uid" />
          <input type="hidden" name="token" :value="form.token" />

          <p>
            <b-button block type="submit" id="register-button"
              >Set Password</b-button
            >
          </p>
        </b-form>

        <p>
          Back to
          <router-link :to="{ name: 'authLogin' }">login</router-link>.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormMixin from "../mixins/FormMixin.js"

export default {
  name: "passwordResetConfirm",
  mixins: [FormMixin],
  data() {
    return {
      form: {
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        newPassword1: "",
        newPassword2: ""
      },
      verification: {
        uid: this.$route.params.uid,
        token: this.$route.params.token
      },
      dispatch: "manifest/PASSWORD_RESET_CONFIRM",
      redirect: { name: "profileSettings" }
    }
  },
  created() {
    this.submitVerification()
  },
  methods: {
    submitVerification() {
      this.$store
        .dispatch("manifest/PASSWORD_RESET_VERIFY", this.verification)
        .catch(e => console.error(e))
    }
  }
}
</script>
