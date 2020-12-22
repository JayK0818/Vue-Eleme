<template>
  <div id="app">
		<top-nav/>
		<div class="content">
			<router-view/>
		</div>
  </div>
</template>

<script>
	import TopNav from '@/components/top-nav'
	export default {
		name:"app",
		created(){
			this.axios({
				url:'/api/goods',
				method:'get',
			}).then(response => {
				console.log(response);
			})
		},
		components:{
			TopNav,
		}
	}
</script>

<style lang="scss" scoped>
	#app{
		display:flex;
		flex-direction:column;
		height:100%;
		.content{
			flex:1;
		}
	}
</style>
