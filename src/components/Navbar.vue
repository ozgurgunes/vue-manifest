<template>
  <b-navbar-nav>
    <b-nav-item :to="{ name: 'authLogin' }" v-if="!authenticated"
      >login</b-nav-item
    >
    <b-nav-item :to="{ name: 'authRegister' }" v-if="!authenticated"
      >register</b-nav-item
    >
    <b-nav-item :to="{ name: 'profileSettings' }" v-if="authenticated"
      >profile</b-nav-item
    >
    <b-nav-item :to="{ name: 'authLogout' }" v-if="authenticated"
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
