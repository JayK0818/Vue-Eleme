<template>
	<div class="cart-wrapper">
		<div class="left-content">
			<div class="cart">
				<div class="cart-icon-wrapper">
					<div class="cart-icon"></div>
				</div>
				<div class="total-price">¥{{total_price}}</div>
			</div>
			<div class="delivery-price">另需配送费¥{{delivery_price}}元</div>
		</div>
		<div class="right-content">
			¥20起送
		</div>
	</div>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		name:'cart',
		computed:{
			...mapState(['cart','delivery_price']),
			...mapGetters(['total_price','total_count'])
		},

	}
</script>

<style lang='scss' scoped>
	.cart-wrapper{
		display:flex;
		height:46px;
		position:absolute;
		bottom:0;
		left:0;
		right:0;
		.left-content{
			display:flex;
			flex:1;
			background-color:#141d27;
		}
		.cart-icon-wrapper{
			transform:translateY(-8px);
			position:relative;
			background-color:#141d27;
			padding:6px;
			width:56px;
			height:56px;
			border-radius:50%;
			.cart-icon{
				width:44px;
				height:44px;
				border-radius:50%;
				background-color:#2b343c;
			}
		}
		.delivery-price{
			flex:1;
			font-size:12px;
			color:rgba(255,255,255,.4);
			font-weight:200;
			line-height:46px;
			text-align:center;
		}
		.total-price{
			padding:0 12px 0 18px;
			font-weight:bold;
			font-size:16px;
			color:rgba(255,255,255,.4);
			line-height:46px;
			border-right:1px solid rgba(255,255,255,.1);
		}
		.right-content{
			height:46px;
			width:105px;
			flex:0 0 105px;
			background-color:#2b333b;
			color:rgba(255,255,255,.4);
			font-size:12px;
			font-weight:bold;
			line-height:46px;
			text-align:center;
		}
	}
</style>
