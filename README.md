# Vue Manifest 

User registration and authentication frontend library for Django Manifest.

**Still in development.**

## Installation
```bash
npm install vue-manifest
```

## Usage

You need to setup your ```router``` and ```store``` to use.

### Router Setup

Concatenate your routes with Vue Manifest's routes. Your ```route.js``` probably will look like this:

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import { manifestRoutes } from 'vue-manifest'

Vue.use(VueRouter)

const routes = [
  
  // Your routes
  
]

export default new VueRouter({
  routes.concat(manifestRoutes)
})
```

#### Navigation Guards

You can use Vue Manifest's navigation guards in your routes.

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import { manifestRoutes, manifestGuard } from 'vue-manifest'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/foo',
    component: Foo,
    meta: { auth: true }
    // Requires authentication. Unauthenticated users 
    // will be redirected to the login page.
  },
  {
    path: '/bar',
    component: Bar,
    meta: { guest: true }
    // Authenticated users will be redirected to the home page. 
    //(ex. Don't show login form to authenticated users.)
  }
]

const router = VueRouter({
  routes.concat(manifestRoutes)
})

export default manifestGuard(router, store)
```


### Store Setup

Add Vue Manifest's store to your store as a module.

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import { manifestStore } from 'vue-manifest'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... },
  modules: {
    manifest: manifestStore
  }
})
```

### Re-authenticate on page reload

To keep authetication persistent on page reloads, you can dispath Vue Manifest's ```AUTHENTICATE``` action in the ```created``` hook of your ```App.vue```.

```javascript
export default {
  name: 'app',
  created () {
    this.$store.dispatch('manifest/AUTHENTICATE')
  }
}
```
