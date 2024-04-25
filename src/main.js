// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'

window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }
    fire(event, data = null) {
        this.vue.$emit(event, data);
    }
    listen(event, callback) {
        this.vue.$on(event, callback);
    }
}

Vue.use(N3Components)

// var $http = Axios.create({
// 	baseURL: 'http://localhost:8888',
// 	timeout: 3000,
// 	withCredentials:true
// })

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
