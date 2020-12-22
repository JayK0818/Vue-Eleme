import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		path:'/goods',
		component:() => import("@/views/goods")
	},
	{
		path:"/ratings",
		component:() => import("@/views/ratings")
	},
	{
		path:"/seller",
		component:() => import("@/views/seller")
	},
	{
		path:"/*",
		redirect:"/goods"
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
	linkActiveClass:'active'
})

export default router
