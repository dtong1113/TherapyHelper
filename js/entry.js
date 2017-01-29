import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router/dist/vue-router.js';
import $ from 'jquery/dist/jquery.js'

import Home from './components/Home.vue';
import About from './components/About.vue';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';

import auth from './auth.js'

Vue.use(VueRouter);


function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/Login',
      query: {redirect: to.fullPath}
    })
  } else {
    next();
  }
}

// Create the router
var router = new VueRouter({
  mode: 'hash',
  base: window.location.href,
  routes: [
      {path: '/', component: Home},
      {path: '/About', component: About},
      {path: '/Dashboard', component: Dashboard, beforeEnter: requireAuth},
      {path: '/Login', component: Login},
      {path: '*', redirect: '/'}
    ]
});

var app = new Vue({
    router,
    data: {},
    methods: {
      loggedIn: auth.loggedIn
    }
}).$mount('#app');