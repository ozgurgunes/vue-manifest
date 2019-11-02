<template>
  <div class="profile">
    <div class="container">
      <h1>Users</h1>
      <p>{{ user_list }}</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "userList",
  data() {
    return {}
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.$store.dispatch("manifest/USER_LIST")
    }
  }
}
</script>
