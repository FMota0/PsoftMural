import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import store from './store/store'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(VueResource)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
