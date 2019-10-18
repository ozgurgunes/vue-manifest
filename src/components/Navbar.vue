<template>
  <b-navbar-nav>
    <b-nav-item :to="{ name: 'auth_login' }" v-if="!authenticated"
      >login</b-nav-item
    >
    <b-nav-item :to="{ name: 'auth_register' }" v-if="!authenticated"
      >register</b-nav-item
    >
    <b-nav-item :to="{ name: 'profile_settings' }" v-if="authenticated"
      >profile</b-nav-item
    >
    <b-nav-item :to="{ name: 'auth_logout' }" v-if="authenticated"
      >logout</b-nav-item
    >
  </b-navbar-nav>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "navbar-manifest",
  computed: mapGetters("manifest", ["authenticated"])
}
</script>
