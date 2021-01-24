import Vue from 'vue'
import App from './App.vue'
import './common/css/reset.scss'
import router from './router'
import store from './store'
import axios from './api';
import {Icon} from 'ant-design-vue'
import FastClick from 'fastclick';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper.scss'
FastClick.attach(document.body);
Vue.prototype.axios = axios;
Vue.config.productionTip = false
Vue.component(Icon.name,Icon)
Vue.use(VueAwesomeSwiper);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
