<template>
	<transition name="slide" appear>
		<div class="detail-wrapper">
			<section ref='detail_section'>
				<div class="food-image">
					<img :src="detail['image']" width="100%" height="100%" class='image'>
					<div class="back-icon" @click.stop="back">
						<a-icon type="left"/>
					</div>
				</div>
				<div class="food-info">
					<div class="food-name">{{detail['name']}}</div>
					<div class="sell-info">
						<span class="count">月售{{detail['sellCount']}}份</span>
						<span class="rating">好评率{{detail['rating']}}%</span>
					</div>
					<div class="price">
						<span class="new-price">{{detail['price']}}</span>
						<span v-if="detail['oldPrice']" class='old-price'>{{detail['oldPrice']}}</span>
					</div>
					<div class="add-button" v-if="detail['count'] == 0">加入购物车</div>
				</div>
				<div class="line-block" v-if="detail['description']"></div>
				<div class="food-introduce" v-if="detail['description']">
					<div class="introduce-title">商品介绍</div>
					<p class="introduce-description">{{detail['description']}}</p>
				</div>
				<div class="line-block"></div>
			</section>
		</div>
	</transition>
</template>

<script>
	import {mapState} from 'vuex'
	import BScroll from 'better-scroll';
	export default {
		name:'detail',
		data(){
			return {
				
			}
		},
		created(){
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.detail_section,{
					probeType:3,
					click:true
				})
			})
		},
		computed:{
			...mapState(['detail'])
		},
		methods:{
			back(){
				this.$router.back();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	.slide-enter-active,.slide-leave-active{
		transition:transform .3s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(100%,0,0);
	}
	.detail-wrapper{
		position:fixed;
		left:0;right:0;top:0;bottom:46px;
		z-index:210;
		background-color:#ffffff;
		overflow:auto;
		.food-image{
			position:relative;
			height:0;
			padding-top:100%;
			.image{
				position:absolute;
				left:0;
				top:0;
			}
		}
		.back-icon{
			position:absolute;
			left:10px;
			top:10px;
			font-size:20px;
			color:#ffffff;
		}
		.food-info{
			position:relative;
			padding:18px;
			width:100%;
			.food-name{
				font-size:14px;
				font-weight:bold;
				color:rgb(7,17,27);
				line-height:14px;
			}
			.sell-info{
				padding-top:8px;
				font-size:10px;
				color:rgb(147,153,159);
				line-height:10px;
			}
			.rating{
				padding-left:12px;
			}
			.price{
				padding-top:18px;
			}
			.new-price{
				font-weight:bold;
				color:rgb(240,20,20);
				line-height:24px;
				font-size:14px;
				&:before{
					content:"¥";
					font-weight:normal;
					font-size:10px;
				}
			}
			.old-price{
				padding-left:10px;
				font-weight:bold;
				font-size:10px;
				color:rgb(147,153,159);
				text-decoration:line-through;
				&:before{
					content:"¥"
				}
			}
			.add-button{
				position:absolute;
				right:18px;
				bottom:18px;
				width:74px;
				height:24px;
				line-height:24px;
				text-align:center;
				border-radius:12px;
				font-size:10px;
				color:#ffffff;
				background-color:rgb(0,160,220);
			}
		}
		.line-block{
			height:16px;
			background:#f3f5f7;
			width:100%;
			@include border-top-1px(rgba(7,17,27,.1));
			@include border-bottom-1px(rgba(7,17,27,.1));
		}
		.food-introduce{
			padding:18px;
			.introduce-title{
				font-size:14px;
				color:rgb(7,17,27);
			}
			.introduce-description{
				padding:6px 8px 0 8px;
				font-size:12px;
				color:rgb(77,85,93);
				line-height:24px;
			}
		}
	}
</style>
