import Vue from 'vue'
import App from './App.vue'
import './common/css/reset.scss'
import router from './router'
import store from './store'
import axios from './common/js/api';
import {Icon} from 'ant-design-vue'
Vue.prototype.axios = axios;
Vue.config.productionTip = false
Vue.component(Icon.name,Icon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
