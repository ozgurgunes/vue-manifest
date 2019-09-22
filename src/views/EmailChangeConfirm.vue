<template>
  <b-container>
    <b-alert :show="errors.token" variant="danger">
      Token is invalid.
    </b-alert>
    <b-alert :show="!errors.lenth" variant="success">
      Email address changed.
    </b-alert>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'email_change_confirm',
  computed: {
    ...mapState({
      errors: s => s.reactor.errors
    })
  },
  created() {
    let verification = {
      username: this.$route.params.username,
      token: this.$route.params.token
    }
    this.$store
      .dispatch('reactor/EMAIL_CHANGE_CONFIRM', verification)
      .catch(err => {
        console.log(err)
        this.$store.state.reactor.errors = err
      })
  }
}
</script>
