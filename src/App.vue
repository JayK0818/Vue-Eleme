<template>
  <div id="app">
		<v-header :seller="seller"/>
		<top-nav/>
		<div class="content">
			<keep-alive>
				<router-view :seller="seller" @add="add"/>
			</keep-alive>
			<cart ref="cart"/>
		</div>
  </div>
</template>

<script>
	import nav from '@/components/top-nav'
	import header from '@/components/header'
	import cart from '@/components/cart'
	import {mapMutations} from 'vuex'
	export default {
		name:"app",
		data() {
			return {
				seller:{}
			}
		},
		created(){
			this.get_seller()
		},
		components:{
			'top-nav':nav,
			'v-header':header,
			cart
		},
		methods:{
			...mapMutations(['set_delivery_price','set_min_price']),
			get_seller(){
				this.axios({
					url:'/api/seller',
					method:'get'
				}).then(response => {
					this.seller = response;
					this.set_delivery_price(response['deliveryPrice'])
					this.set_min_price(response['minPrice'])
				})
			},
			add(el){
				this.$refs.cart.drop(el);
			}
		}
	}
</script>

<style lang="scss" scoped>
	#app{
		display:flex;
		flex-direction:column;
		height:100%;
		.content{
			position:relative;
			flex:1;
			width:100%;
		}
	}
</style>
