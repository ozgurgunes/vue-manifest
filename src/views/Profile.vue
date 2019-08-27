<template>

  <b-container>
  <b-alert
    :variant="status"
    v-if="message"
  show>
    {{ message }}
  </b-alert>
  
  <b-row>
  <b-col id="login-view" cols="8">

    <h1 class="mb-3">Settings</h1>

    <h4><router-link :to="{name: 'user_update'}">Personal Information</router-link></h4>
    <p>Update your personal information. Let others know more about you.</p>
    <h4><router-link :to="{name: 'picture_upload'}">Upload Profile Picture</router-link></h4>
    <p>You can change your profile picture.</p>
    <h4><router-link :to="{name: 'email_change'}">Email Address</router-link></h4>
    <p>You can change your email adress. (<b>{{ user.email }}</b>)</p>
    <h4><router-link :to="{name: 'password_change'}">Password</router-link></h4>
    <p>Change your password here. Please do not share your password with others.</p>

  </b-col>
  </b-row>
  </b-container>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('reactor', ['user', 'status', 'message']),    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
