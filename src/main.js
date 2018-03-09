import Vue from 'vue';
window.Vue = Vue;

// import user profile component
import UserProfile from './components/UserProfile';
Vue.component('user-profile', UserProfile);

// init vue app
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});