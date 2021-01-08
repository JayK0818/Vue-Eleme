<template>
	<div class="cart-wrapper">
		<div class="cart-content">
			<div class="left-content" @click.stop="toggle_cart_detail">
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
		<transition name="my-slide" appear>
			<div class="cart-detail" v-show="show_detail">
				<div class="cart-detail-content">
					<div class="cart-title">
						<span class="text">购物车</span>
						<span class="clear" @click.stop="clear">清空</span>
					</div>
					<div class="cart-list-container" ref="cart_container">
						<ul class="cart-list">
							<li v-for="(food,index) in cart" :key="'food-'+index" class="food-item">
								<span class="food-name">{{food['name']}}</span>
								<div class="right-info">
									<span class="price">{{food['price']}}</span>
									<a-icon type="minus-circle" theme="filled" class='icon' @click.stop="reduce(food['id'])"></a-icon>
									<span class="count">{{food['count']}}</span>
									<a-icon type="plus-circle" theme="filled" class='icon' @click.stop="add(food['id'])"></a-icon>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	import {_message} from '@/components/message'
	// import BScroll from 'better-scroll'
	export default {
		name:'cart',
		data(){
			return {
				fold:true
			}
		},
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
			},
			show_detail(){	// 如果没有数据,肯定是折叠状态,否则,判断当前是折叠还是隐藏,对其值取反
				console.log('计算了吗');
				if(!this.total_count){
					this.toggle_fold();
					return false;
				}
				let show = !this.fold;
				return show;
			}
		},
		methods:{
			...mapMutations(['add_food','reduce_food','clear_food']),
			toggle_fold(){
				this.fold = true;
			},
			reduce(id){
				this.reduce_food({id})
			},
			add(id){
				this.add_food({id})
			},
			toggle_cart_detail(){
				if(!this.total_count) return;
				this.fold = !this.fold;
			},
			clear(){
				_message({
					content:"确定要清空购物车吗?",
					okText:"确定",
					cancelText:'取消',
					confirm:() => {
						this.clear_food();
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '../../common/css/mixin.scss';
	.my-slide-enter-active,.my-slide-leave-active{
		transition:all .5s;
	}
	.my-slide-enter,.my-slide-leave-to{
		translate3d:translate(0,-100%,0);
	}
	.cart-wrapper{
		.cart-detail{
			position:fixed;
			left:0;
			right:0;
			bottom:0;
			top:0;
			background-color:rgba(7,17,27,.5);
			z-index:300;
		}
		.cart-detail-content{
			position:absolute;
			left:0;
			right:0;
			bottom:0;
			background-color:#ffffff;
			.cart-title{
				display:flex;
				justify-content:space-between;
				align-items:center;
				height:40px;
				padding:0 18px;
				background-color:#f3f5f7;
				color:rgb(7,17,27);
				font-size:14px;
				@include border-bottom-1px(rgba(7,17,27,.1));
			}
			.cart-list-container{
				max-height:220px;
				padding-bottom:46px;
				width:100%;
				overflow:auto;
			}
			.clear{
				color:rgb(0,160,220);
			}
			.cart-list{
				padding:0 18px;
				background-color:#ffffff;
				.food-item{
					display:flex;
					align-items:center;
					justify-content:space-between;
					height:48px;
					@include border-bottom-1px(rgba(7,17,27,.1))
				}
				.food-name{
					flex:1;
					min-width:0;
					overflow:hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
					color:rgb(7,17,27);
					font-size:14px;
				}
				.right-info{
					display:flex;
					align-items:center;
				}
				.price{
					padding:0 12px 0 18px;
					color:rgb(240,20,20);
					font-weight:bold;
					font-size:14px;
				}
				.price:before{
					content:"¥";
					font-size:10px;
					font-weight:normal;
				}
				.icon{
					color:#00a0dc;
					font-size:18px;
				}
				.count{
					width:24px;
					text-align:center;
					color:rgb(147,153,159);
					font-size:10px;
				}
			}
		}
		.cart-content{
			position:absolute;
			display:flex;
			width:100%;
			height:46px;
			bottom:0;
			left:0;
			right:0;
			z-index:310;
		}
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
