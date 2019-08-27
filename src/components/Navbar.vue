<template>
    <b-navbar-nav>
      <b-nav-item :to="{name: 'auth_login'}" v-if="!authenticated">login</b-nav-item>
      <b-nav-item :to="{name: 'auth_register'}" v-if="!authenticated">register</b-nav-item>
      <b-nav-item :to="{name: 'user_profile'}" v-if="authenticated">profile</b-nav-item>
      <b-nav-item :to="{name: 'auth_logout'}" v-if="authenticated">logout</b-nav-item>
    </b-navbar-nav>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'navbar-reactor',
  computed: mapGetters('reactor', [
    'authenticated',
  ])
}

</script>

<style scoped>
nav {
  margin-bottom: 2em;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  display: inline;
  float: right;
}

a {
  color: #1a1a1a;
  display: inline-block;
  text-align: center;
  padding: 6px 12px;
  text-decoration: none;
  font-size: 14px;
}

a:hover {
  color: #cc0000;
  text-decoration: none;
}

.navbar-brand {
  font-size: 1.5em;
}

</style>
