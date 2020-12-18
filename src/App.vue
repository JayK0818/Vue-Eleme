<template>
  <div id="app">
		hello world
		<a-button type="primary">hello</a-button>
		<a-icon type="step-backward" />
  </div>
</template>

<script>
	import {Button} from 'ant-design-vue';
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
			[Button.name]:Button
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
