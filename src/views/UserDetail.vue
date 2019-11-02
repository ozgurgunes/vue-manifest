<template>
  <div class="profile">
    <div class="container">
      <h1>User Profile</h1>
      <p>{{ user_detail }}</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "userDetail",
  data() {
    return {}
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$store.dispatch("manifest/USER_DETAIL")
    }
  }
}
</script>
