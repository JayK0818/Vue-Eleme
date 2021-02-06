<template>
	<div class="loading">
		<div class="loading-icon">
			<a-icon type="loading" />
			<p class='loading-text'>正在加载数据</p>
		</div>
	</div>
</template>

<script>
	import {Icon} from 'ant-design-vue'
	export default {
		name:"loading",
		components:{
			[Icon.name]:Icon
		}
	}
</script>

<style lang="scss" scoped>
	.loading{
		position:relative;
		width:100%;
		height:100%;
		.loading-icon{
			position:absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			text-align:center;
			margin:auto;
			color:#1890ff;
			height:30px;
		}
		.loading-text{
			font-size:10px;
			line-height:24px;
		}
	}
</style>
