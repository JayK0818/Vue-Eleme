<template>
  <div id="app">
		<v-header :seller="seller"/>
		<top-nav/>
		<div class="content">
			<router-view/>
		</div>
  </div>
</template>

<script>
	import nav from '@/components/top-nav'
	import header from '@/components/header'
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
			'v-header':header
		},
		methods:{
			get_seller(){
				this.axios({
					url:'/api/seller',
					method:'get'
				}).then(response => {
					this.seller = response;
				})
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
