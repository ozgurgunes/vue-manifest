<template>
  <b-container>
    <h1>Logged out</h1>
    <p>
      <router-link to="/login">Login back</router-link>
    </p>
  </b-container>
</template>

<script>
export default {
  name: "logout",
  created() {
    this.$store.dispatch("manifest/LOGOUT").then(() => {
      this.$router.push({ name: "homepage" })
    })
  }
}
</script>
