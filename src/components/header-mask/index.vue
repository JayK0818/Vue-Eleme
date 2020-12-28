<template>
	<transition name="my-fade" appear>
		<div class="header-mask">
			<div class="content">
				<div class="seller-title">{{seller['name']}}</div>
			</div>
			<div class="footer-wrapper">
				<a-icon type="close" class='close-icon' @click.stop="close"/>
			</div>
		</div>
	</transition>
</template>

<script>
	import {Icon} from 'ant-design-vue'
	export default {
		name:'header-mask',
		components:{
			[Icon.name]:Icon
		},
		methods:{
			close(){
				this.$emit("close")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-mask{
		display:flex;
		flex-direction:column;
		position:fixed;
		top:0;
		bottom:0;
		width:100%;
		z-index:1000;
		background-color:rgba(7,17,27,.8);
		.content{
			flex:1;
			overflow:auto;
			.seller-title{
				padding:64px 0 16px 0;
				text-align:center;
				font-size:16px;
				color:rgb(255,255,255);
				line-height:16px;
				font-weight:700;
			}
		}
		.footer-wrapper{
			text-align:center;
			padding:12px 0;
		}
		.close-icon{
			font-size:24px;
			color:#ffffff;
		}
	}
	.my-fade-enter-active,.my-fade-leave-active{
		transition:opacity .2s;
	}
	.my-fade-enter,.my-fade-leave-to{
		opacity:0;
	}
</style>
