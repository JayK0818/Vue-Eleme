import Vue from 'vue'
import App from './App.vue'
import './common/css/reset.scss'
import router from './router'
import store from './store'
import axios from './api';
import FastClick from 'fastclick';
import LazyLoad from 'vue-lazyload';
FastClick.attach(document.body);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(LazyLoad,{
	loading:require('./assets/load.jpg')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
