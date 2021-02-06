import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		path:'/goods',
		name:'goods',
		component:() => import("@/views/goods"),
		children:[
			{
				path:':id',
				component:() => import("@/components/detail"),
			}
		]
	},
	{
		path:"/ratings",
		name:"ratings",
		component:() => import("@/views/ratings")
	},
	{
		path:"/seller",
		name:'seller',
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
