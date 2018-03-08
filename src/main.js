import Vue from 'vue';
window.Vue = Vue;

// for easy and promise-based ajax calls
import axios from 'axios';
window.axios = axios;

// for easy time and date manipulation
import moment from 'moment';
window.moment = moment;

// scrollbars styling
// import OverlayScrollbars from 'OverlayScrollbars';
// window.OverlayScrollbars = OverlayScrollbars;

// import user profile component as global
import UserProfile from './components/UserProfile';
Vue.component('user-profile', UserProfile);

new Vue({
  el: '#app'
})