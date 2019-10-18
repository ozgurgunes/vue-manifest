<template>
  <div id="activate-account-view">
    <h2 v-if="status == 'loading'" class="text-center">
      Activating account...
    </h2>
    <h2 v-else-if="status == 'error'" class="text-center">An error occured.</h2>
    <h2 v-else-if="status == 'success'" class="text-center">
      Email address changed.
    </h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters("manifest", ["isAuthenticated"])
  },
  created() {
    this.activateAccount(this.$route.params)
  },
  beforeRouteLeave(to, from, next) {
    this.clearActivationStatus()
    next()
  }
}
</script>
