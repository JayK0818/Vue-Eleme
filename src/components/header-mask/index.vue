<template>
	<transition name="my-fade" appear v-on:after-leave="leave">
		<div class="header-mask" v-show="visible">
			<div class="content">
				<div class="seller-title">{{seller['name']}}</div>
				<div class="star">
					<star :size="48" :score="seller['foodScore']"/>
				</div>
				<div class="dicount-info"><span class="text">优惠信息</span></div>
			</div>
			<div class="footer-wrapper">
				<span class="close-button" @click.stop="close">X</span>
			</div>
		</div>
	</transition>
</template>

<script>
	import star from '@/components/star'
	export default {
		name:'header-mask',
		data(){
			return {
				visible:true
			}
		},
		components:{star},
		methods:{
			close(){
				this.$emit("close")
			},
			leave(){
				this.$emit("leave")
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
		overflow:hidden;
		.content{
			flex:1;
			overflow:auto;
			color:#ffffff;
			.seller-title{
				padding:64px 0 16px 0;
				text-align:center;
				font-size:16px;
				color:rgb(255,255,255);
				line-height:16px;
				font-weight:700;
			}
			.star{
				text-align:center;
				height:24px;
				line-height:24px;
			}
			.dicount-info{
				display:flex;
				align-items:center;
				padding:28px 36px 24px 36px;
				font-weight:bold;
				font-size:14px;
				.text{
					padding:0 12px;
				}
				&:before,&:after{
					content:"";
					flex:1;
					background-color:rgba(255,255,255,.2);
					height:1px;
				}
			}
		}
		.footer-wrapper{
			text-align:center;
			padding:12px 0;
		}
		.close-button{
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
