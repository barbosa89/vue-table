import Vue from 'vue'
import App from './App.vue'
import YourComponent from '../src/wrapper'

Vue.component('YourComponent', YourComponent)

new Vue({
  el: '#app',
  render: h => h(App)
})
