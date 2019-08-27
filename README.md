# Vue Reactor 

User registration and authentication frontend library for Django Reactor.

**Still in development.**

## Installation
```bash
npm install vue-reactor
```

## Usage

You need to setup your ```router``` and ```store``` to use.

### Router Setup

Concatenate your routes with Vue Reactor's routes. Your ```route.js``` probably will look like this:

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import { reactorRoutes } from 'vue-reactor'

Vue.use(Router)

const routes = [
  
  // Your routes
  
]

export default new Router({
  routes.concat(reactorRoutes)
})
```

#### Navigation Guards

You can use Vue Reactor's navigation guards in your routes.

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import {reactorRoutes, reactorGuard } from 'vue-reactor'
import store from './store'

Vue.use(Router)

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
    component: Bar
    meta: { guest: true }
    // Authenticated users will be redirected to the home page. 
    // (ex. Don't show login form to authenticated users)
  }
]

const router = Router({
  routes.concat(reactorRoutes)
})

export default reactorGuard(router, store)
```


### Store Setup

Add Vue Reactor's store to your store as a module.

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import { reactorStore } from 'vue-reactor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
  modules: {
    reactor: reactorStore
  }
})
```

### Re-authenticate on page reload

To keep authetication persistent on page reloads, you can dispath Vue Reactor's ```AUTHENTICATE``` action in the ```mounted``` hook of your ```App.vue```.

```javascript
export default {
  name: 'app',
  mounted () {
    this.$store.dispatch('reactor/AUTHENTICATE')
  }
}
```
