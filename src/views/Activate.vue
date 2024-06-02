<template>
  <div id="activate-account-view">
    <h2 v-if="status == 'loading'" class="text-center">
      Activating account...
    </h2>
    <h2 v-else-if="errors" class="text-center">An error occured.</h2>
    <h2 v-else class="text-center">Account activation successful.</h2>
  </div>
</template>

<script>
import VerificationMixin from "@/mixins/VerificationMixin"

export default {
  name: "activate",
  mixins: [VerificationMixin],
  data() {
    return {
      verification: {
        username: this.$route.params.uid,
        token: this.$route.params.token
      },
      dispatch: "manifest/ACTIVATE"
    }
  }
}
</script>
