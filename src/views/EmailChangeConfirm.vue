<template>
  <b-container>
    <b-alert :show="!!errors" variant="danger">Token is invalid.</b-alert>
    <b-alert :show="!errors" variant="success">Email address changed.</b-alert>
    
  </b-container>
</template>

<script>
import VerificationMixin from "@/mixins/VerificationMixin"

export default {
  name: "emailChangeConfirm",
  mixins: [VerificationMixin],
  data() {
    return {
      verification: {
        username: this.$route.params.uid,
        token: this.$route.params.token
      },
      dispatch: "manifest/EMAIL_CHANGE_CONFIRM"
    }
  }
}
</script>
