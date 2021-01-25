<template>
	<div class="cart-wrapper">
		<div class="cart-content">
			<div class="left-content" @click.stop="toggle_cart_detail">
				<div class="cart">
					<div class="cart-icon-wrapper">
						<div class="cart-icon" :class="{active:total_count > 0 ? true : false}">
							<a-icon type="shopping-cart"/>
						</div>
						<div class="cart-food-count" v-show="total_count > 0">{{total_count > 99 ? 99 : total_count}}</div>
					</div>
					<div class="total-price" :class="{active:total_price > 0 ? true : false}">¥ {{total_price}}</div>
				</div>
				<div class="delivery-price">另需配送费¥4元</div>
			</div>
			<div class="right-content" :class="{active:total_price < min_price ? false : true }" @click.stop="settlement">{{total_price_text}}</div>
		</div>
		<transition name="slide-fade">
			<div class="cart-detail-content" v-show="show_detail">
				<div class="cart-title">
					<span class="text">购物车</span>
					<span class="clear" @click.stop="clear">清空</span>
				</div>
				<div class="cart-list-container" ref="cart_container">
					<ul class="cart-list">
						<template v-for="(food,index) in cart">
							<li class="food-item" v-if="food['count']" :key="'food-'+index">
								<span class="food-name">{{food['name']}}</span>
								<div class="right-info">
									<span class="price">{{food['price']}}</span>
									<a-icon type="minus-circle" theme="filled" class='icon' @click.stop="reduce(food)"></a-icon>
									<span class="count">{{food['count']}}</span>
									<a-icon type="plus-circle" theme="filled" class='icon' @click.stop="add(food['id'],$event)"></a-icon>
								</div>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="cart-mask">
			<div class="cart-list-mask" v-show="show_detail" @click.stop="toggle_cart_detail"></div>
		</transition>
		<div class="ball-container">
			<div v-for="(ball,index) in balls" :key="'ball-'+index" >
				<transition
					v-on:before-enter='before_drop'
					v-on:enter='dropping'
					v-on:after-enter="after_drop"
				>
					<div class="ball" v-show="ball.show">
						<div class="inner"></div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import {_message} from '@/components/message'
	import {tip} from '@/components/tip'
	import BScroll from 'better-scroll'
	let BALL_LENGTH = 10;
	function create_ball(){
		const ret = [];
		for(let i = 0; i < BALL_LENGTH; i++){
			ret.push({show:false})
		}
		return ret;
	}
	export default {
		name: 'cart',
		data() {
			return {
				fold: true,
				balls:create_ball()
			}
		},
		created(){
			this.drop_ball = [];
			this.timer = null;
		},
		props:{
			delivery_price:{
				type:Number,
				required:true
			},
			min_price:{
				type:Number,
				required:true
			}
		},
		computed: {
			...mapState(['cart']),
			...mapGetters(['total_price', 'total_count']),
			total_price_text() {
				let text = ""
				if (this.total_count == 0) {
					text = '¥' + this.min_price + '起送'
				}
				if (this.total_count && this.total_price < this.min_price) {
					text = '还需' + (this.min_price - this.total_price) + '元起送'
				}
				if (this.total_count && this.total_price >= this.min_price) {
					text = '结算';
				}
				return text;
			},
			show_detail() {	// 如果没有数据,肯定是折叠状态,否则,判断当前是折叠还是隐藏,对其值取反
				if (!this.total_count) {
					this.toggle_fold();
					return false;
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.cart_container, {
								click: true,
								probeType: 3
							})
						} else {
							this.scroll.refresh()
						}
					})
				}
				return show;
			}
		},
		methods: {
			...mapMutations(['add_food', 'reduce_food', 'clear_food']),
			toggle_fold() {
				this.fold = true;
			},
			reduce(food) {
				if(food['count'] == 1){
					_message({
						content:"确定删除该商品吗?",
						okText:"确定",
						cancelText:"取消",
						confirm:() => {
							this.reduce_food({id:food['id']})
						}
					})
				}else{
					this.reduce_food({id:food['id']})
				}
			},
			add(id,event) {
				this.add_food({id})
				let target = event.target.parentElement;
				this.drop(target);
			},
			toggle_cart_detail() {
				if (!this.total_count) return;
				this.fold = !this.fold;
			},
			clear() {
				_message({
					content: "确定要清空购物车吗?",
					okText: "确定",
					cancelText: '取消',
					confirm: () => {
						this.clear_food();
					}
				})
			},
			drop(el){
				for(let i = 0; i < this.balls.length; i++){
					const ball = this.balls[i];
					if(!ball.show){
						ball.el = el;
						ball.show = true;
						this.drop_ball.push(ball);
						return
					}
				}
			},
			before_drop(el){
				let ball = this.drop_ball[this.drop_ball.length - 1];
				let rect = ball.el.getBoundingClientRect();
				let x = rect.left - 28;
				let y = -(window.innerHeight - rect.top - 28);
				el.style.display = '';
				el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
				let inner = el.querySelector(".inner");
				inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			},
			dropping(el,done){
				this._reflow = document.body.offsetHeight;	// 让浏览器重绘
				el.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)';
				let inner = el.querySelector(".inner");
				inner.style.transform = inner.style.webkitTransform = 'translate3d(0,0,0)';
				el.addEventListener('transitionend',done);
			},
			after_drop(el){
				let ball = this.drop_ball.shift();
				if(ball){
					ball.show = false;
					el.style.display = 'none';
				}
			},
			settlement(){
				if(this.total_price < this.min_price) return;
				tip({
					success:true,
					text:'结算成功'
				})
				this.timer = setTimeout(() => {
					this.clear_food();
				},1200);
			}
		},
		beforeDestory(){
			if(this.timer) {
				clearTimeout(this.timer);
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '../../common/css/mixin.scss';
	@import '../../common/css/variable.scss';
	.slide-fade-enter-active, .slide-fade-leave-active {
		transition: all .3s;
	}
	.slide-fade-enter, .slide-fade-leave-to {
		transform: translate3d(0, 100%, 0);
	}
	.cart-mask-enter-active,.cart-mask-leave-active{
		transition: all .25s;
	}
	.cart-mask-enter,.cart-mask-leave-to{
		opacity:0;
	}
	.ball-container{
		.ball{
			position:fixed;
			left:28px;
			bottom:28px;
			z-index:400;
			transition:all .4s cubic-bezier(0.49,-0.29,0.75,0.41);
			.inner{
				width:16px;
				height:16px;
				border-radius:50%;
				background-color:$highlight-color;
				transition:all .4s linear;
			}
		}
	}
	.cart-wrapper {
		.cart-list-mask {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background-color: rgba(7, 17, 27, .5);
			z-index: 300;
		}
		.cart-detail-content {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: $white;
			z-index:305;
			.cart-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 40px;
				padding: 0 18px;
				background-color: #f3f5f7;
				color: $font-color-1;
				font-size: 14px;
				@include border-bottom-1px(rgba(7, 17, 27, .1));
			}

			.cart-list-container {
				max-height: 220px;
				width: 100%;
				overflow: auto;
			}

			.clear {
				color: $highlight-color;
			}

			.cart-list {
				padding: 0 18px 50px;
				background-color: $white;

				.food-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 48px;
					@include border-bottom-1px($border-color)
				}

				.food-name {
					flex: 1;
					min-width: 0;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: $font-color-1;
					font-size: 14px;
				}

				.right-info {
					display: flex;
					align-items: center;
				}

				.price {
					padding: 0 12px 0 18px;
					color: $price-color;
					font-weight: bold;
					font-size: 14px;
				}

				.price:before {
					content: "¥";
					font-size: 10px;
					font-weight: normal;
				}

				.icon {
					color: $highlight-color;
					font-size: 18px;
				}

				.count {
					width: 24px;
					text-align: center;
					color: $font-color-3;
					font-size: 10px;
				}
			}
		}

		.cart-content {
			position: absolute;
			display: flex;
			width: 100%;
			height: 46px;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 310;
		}

		.left-content {
			display: flex;
			flex: 1;
			background-color: #141d27;
		}

		.cart-icon-wrapper {
			display: inline-block;
			transform: translateY(-12px);
			position: relative;
			background-color: #141d27;
			padding: 6px;
			width: 56px;
			height: 56px;
			border-radius: 50%;

			.cart-icon {
				width: 44px;
				height: 44px;
				border-radius: 50%;
				background-color: #2b343c;
				text-align: center;
				line-height: 44px;
				font-size: 26px;
				color: #80858d;

				&.active {
					background-color: $highlight-color;
					color: $white;
				}
			}

			.cart-food-count {
				position: absolute;
				width: 24px;
				height: 16px;
				line-height: 16px;
				text-align: center;
				background-color: $price-color;
				color: $white;
				z-index: 300;
				right: -4px;
				top: -2px;
				border-radius: 8px;
				font-size: 12px;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
			}
		}

		.delivery-price {
			flex: 1;
			font-size: 12px;
			color: rgba(255, 255, 255, .4);
			font-weight: 200;
			line-height: 46px;
			text-align: center;
			@media screen and (max-width:320px){
				font-size:10px;
			}
		}

		.total-price {
			display: inline-block;
			width: 70px;
			text-align: center;
			vertical-align: top;
			font-weight: bold;
			font-size: 14px;
			line-height: 46px;
			color: rgba(255, 255, 255, .4);
			border-right: 1px solid rgba(255, 255, 255, .1);
			&.active {
				color: $white;
			}
			@media screen and (max-width:320px){
				width:60px;
			}
		}
		.right-content {
			height: 46px;
			width: 100px;
			flex: 0 0 105px;
			background-color: #2b333b;
			color: rgba(255, 255, 255, .4);
			font-size: 14px;
			font-weight: bold;
			line-height: 46px;
			text-align: center;

			&.active {
				background-color: $check-color;
				color: $white;
			}
		}
	}
</style>
