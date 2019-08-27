<template>

  <b-container>
    <b-alert 
      variant="danger"
      v-if="errors.token" 
    show>
        Token is invalid.
    </b-alert>
    <b-alert 
      variant="success"
      v-if="!errors.lenth" 
    show>
        Email address changed.
    </b-alert>
  </b-container>

</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'email_change_confirm',
  computed: {
    ...mapState({
      errors: s => s.reactor.errors
    }),
  },
  created () {
    let verification = {
      username: this.$route.params.username,
      token: this.$route.params.token,
    }
    this.$store.dispatch('reactor/EMAIL_CHANGE_CONFIRM', verification)
    .catch(err => {
      console.log(err)
        this.$store.state.reactor.errors = err
    })
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
