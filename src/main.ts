import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import LazyPlugin from 'vue3-lazy'
import './style/index.scss'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router).use(createPinia()).mount('#app')

LazyPlugin.install(app, {
  loading: require('./assets/loading.png'),
  error: require('./assets/error.png')
})
