<template>
	<div class="cart-wrapper">
		<div class="left-content">
			<div class="cart">
				<div class="cart-icon-wrapper">
					<div class="cart-icon" :class="{active:total_count > 0 ? true : false}">
						<a-icon type="shopping-cart" />
					</div>
					<div class="cart-food-count" v-show="total_count > 0">{{total_count > 99 ? 99 : total_count}}</div>
				</div>
				<div class="total-price" :class="{active:total_price > 0 ? true : false}">¥ {{total_price}}</div>
			</div>
			<div class="delivery-price">另需配送费¥4元</div>
		</div>
		<div class="right-content" :class="{active:total_price < min_price ? false : true }">{{total_price_text}}</div>
	</div>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		name:'cart',
		computed:{
			...mapState(['cart','delivery_price','min_price']),
			...mapGetters(['total_price','total_count']),
			total_price_text(){
				let text = ""
				if(this.total_count == 0) {
					text = '¥'+this.min_price + '起送'
				}
				if(this.total_count && this.total_price < this.min_price){
					text = '还需' + (this.min_price - this.total_price) + '元起送'
				}
				if(this.total_count && this.total_price >= this.min_price){
					text = '结算';
				}
				return text;
			}
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
			display:inline-block;
			transform:translateY(-12px);
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
				text-align:center;
				line-height:44px;
				font-size:26px;
				color:#80858d;
				&.active{
					background-color:#00a1dc;
					color:#ffffff;
				}
			}
			.cart-food-count{
				position:absolute;
				width:24px;
				height:16px;
				line-height:16px;
				text-align:center;
				background-color:#e9150d;
				color:#ffffff;
				z-index:300;
				right:-4px;
				top:-2px;
				border-radius:8px;
				font-size:12px;
				box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
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
			display:inline-block;
			width:56px;
			text-align:center;
			vertical-align:top;
			font-weight:bold;
			font-size:12px;
			line-height:46px;
			color:rgba(255,255,255,.4);
			border-right:1px solid rgba(255,255,255,.1);
			&.active{
				color:#ffffff;
			}
		}
		.right-content{
			height:46px;
			width:100px;
			flex:0 0 105px;
			background-color:#2b333b;
			color:rgba(255,255,255,.4);
			font-size:14px;
			font-weight:bold;
			line-height:46px;
			text-align:center;
			&.active{
				background-color:#00c241;
				color:#ffffff;
			}
		}
	}
</style>
