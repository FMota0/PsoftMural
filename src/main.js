import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(VueResource)

let store = {
  user: {
    isLogged: false,
    login: '',
    password: ''
  },
  messages: [],
  firstLoad: false,
  notificationStatus: {
    succ: false,
    error: false
  }
};

new Vue({
  el: '#app',
  data: store,
  render: h => h(App),
  methods: {

  },
  created: function () {

  }
})
