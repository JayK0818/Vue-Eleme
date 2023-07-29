import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/goods',
    name: 'goods',
    component: () => import(/* webpackChunkName: 'goods' */ '@/views/goods/index.vue')
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: () => import(/* webpackChunkName: 'ratings' */ '@/views/ratings/index.vue')
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import(/* webpackChunkName: 'seller' */ '@/views/seller/index.vue')
  },
  {
    path: '/',
    redirect: '/goods'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
