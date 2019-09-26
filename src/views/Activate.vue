<template>
  <div id="activate-account-view">
    <h2 v-if="status == 'loading'" class="text-center">
      Activating account...
    </h2>
    <h2 v-else-if="errors" class="text-center">An error occured.</h2>
    <h2 v-else class="text-center">
      Account activation successful.
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      status: s => s.reactor.status,
      message: s => s.reactor.message,
      errors: s => s.reactor.errors
    })
  },
  created() {
    let activation = {
      username: this.$route.params.username,
      token: this.$route.params.token
    }
    this.$store.dispatch('reactor/ACTIVATE', activation).catch(err => {
      console.log(err)
      this.$store.state.reactor.errors = err
    })
  }
}
</script>
