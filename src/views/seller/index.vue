<template>
	<div class="seller-page" ref='seller_page'>
		<div class="seller-container">
			<div class="overview">
				<div class="top">
					<div class="seller-name">{{seller['name']}}</div>
					<div class="star-container">
						<star :size="36" :score="seller['score']"></star>
					</div>
					<span class="sell-count">月售{{seller['sellCount']}}单</span>
					<div class="collection">
						<a-icon type="heart" class='heart-icon' theme="filled" @click.stop="toggle_collect" :class="{active:is_collect ? true : false}"/>
						<p class="collection-text">{{is_collect ? '已收藏' : '收藏'}}</p>
					</div>
				</div>
				<div class="bottom">
					<div class="info-item">
						<p class="text">起送价</p>
						<span class="min-price">{{seller['minPrice']}}</span>
					</div>
					<div class="info-item">
						<p class="text">商家配送</p>
						<span class="delivery-price">{{seller['deliveryPrice']}}</span>
					</div>
					<div class="info-item">
						<p class="text">平均配送时间</p>
						<span class="delivery-time">{{seller['deliveryTime']}}</span>
					</div>
				</div>
			</div>
			<split/>
			<div class="bulletin-wrapper">
				<div class="title">公告与活动</div>
				<div class="text">{{seller['bulletin']}}</div>
			</div>
			<div class="supports">
				<div v-for="(support,index) in seller['supports']" :key="'support-'+index" class="support-item">
					<support-icon :size="4" :type="index"/>
					<span class="text">{{support['description']}}</span>
				</div>
			</div>
			<split/>
			<div class="live-wrapper">
				<div class="title">商家实景</div>
				<div class="pic-container" ref='pic_container'>
					<ul class="pic-list" ref="pic_list">
						<li v-for="(pic,index) in seller['pics']" :key="'pic-'+index" class='pic-item'>
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split/>
			<div class="seller-wrapper">
				<div class="title">商家信息</div>
			</div>
			<div class="info-list">
				<div class="info-item" v-for="(info,index) in seller['infos']" :key="'info-'+index">{{info}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star'
	import BScroll from 'better-scroll'
	const RIGHT = 6;
	import {tip} from '@/components/tip/index.js'
	import SupportIcon from '@/components/support-icon'
	import split from '@/components/split'
	export default {
		name :'seller',
		data(){
			return {
				is_collect:false,
			}
		},
		props:{
			seller:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		created(){
			this.scroll = null;
			this.pic_scroll = null;
			this.calc_width()
			setTimeout(() => {
				this._init_scroll();
				this._init_pics()
			},0)
		},
		components:{star,SupportIcon,split},
		methods:{
			_init_scroll(){
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.seller_page,{
							click:true,
							probeType:3
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			_init_pics(){
				this.$nextTick(() => {
					if(!this.pic_scroll){
						this.pic_scroll = new BScroll(this.$refs.pic_container,{
							scrollX:true,
							startX:0,
							scrollY:false,
							click:true,
							eventPassthrough:"vertical"
						})
					}else{
						this.pic_scroll.refresh();
					}
				})
			},
			toggle_collect(){
				this.is_collect = !this.is_collect
				if(this.is_collect){
					tip({success:true,text:"已收藏"})
				}else{
					tip({success:false,text:"取消收藏"})
				}
			},
			calc_width(){
				this.$nextTick(() => {
					let width = (120 + RIGHT) * this.seller['pics'].length - RIGHT;
					this.$refs.pic_list.style.width = width + 'px';
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/variable.scss';
	@import '../../common/css/mixin.scss';
	.seller-page{
		position:absolute;
		top:0;
		left:0;
		bottom:46px;
		width:100%;
		overflow:auto;
	}
	.seller-container{
		padding-bottom:10px;
	}
	.overview{
		padding:18px;
		.top{
			padding-bottom:18px;
			@include border-bottom-1px($border-color);
		}
		.collection{
			width:50px;
			text-align:center;
			position:absolute;
			right:0;
			top:0;
		}
		.heart-icon{
			font-size:20px;
			color:rgb(147,153,159);
			&.active{
				color:$price-color;
			}
		}
		.collection-text{
			padding-top:4px;
			line-height:10px;
			font-size:10px;
			color:$font-color-3;
		}
		.seller-name{
			font-size:14px;
			color:$font-color-1;
			line-height:14px;
			padding-bottom:8px;
		}
		.star-container{
			display:inline-block;
		}
		.sell-count{
			padding-left:12px;
			font-size:10px;
			color:$font-color-2;
			line-height:18px;
			vertical-align:top;
		}
		.bottom{
			display:flex;
			.info-item{
				flex:1;
				padding-top:18px;
				text-align:center;
				@include border-right-1px($border-color);
			}
			.text{
				padding-bottom:6px;
				font-size:10px;
				color:$font-color-3;
				line-height:10px;
			}
			.min-price,.delivery-price,.delivery-time{
				font-size:24px;
				color:$font-color-1;
				line-height:24px;
				font-weight:200;
			}
			.min-price:after,.delivery-price:after{
				content:"元";
				font-size:10px;
			}
			.delivery-time:after{
				content:'分钟';
				font-size:10px;
			}
		}
	}
	.bulletin-wrapper,.live-wrapper,.seller-wrapper{
		.title{
			font-size:13px;
			color:rgb(7,17,27);
		}
	}
	.bulletin-wrapper{
		padding:18px 18px 0;
		background-color:#ffffff;
		.text{
			padding:8px 12px 16px;
			font-size:12px;
			font-weight:200;
			color:$price-color;
			line-height:24px;
		}
	}
	.supports{
		padding:0 18px;
	}
	.support-item{
		padding: 16px 0 16px 12px;
		display:flex;
		@include border-top-1px($border-color);
		.text{
			padding-left:6px;
			font-size:12px;
			font-weight:200;
			color:$font-color-1;
			line-height:16px;
		}
	}
	.live-wrapper{
		padding:18px 0 18px 18px;
		.pic-container{
			margin-top:12px;
			overflow:auto;
		}
		.pic-list{
			white-space:nowrap;
		}
		.pic-item{
			display:inline-block;
			margin-right:6px;
			width:120px;
			height:90px;
			&:last-child{
				margin-right:0;
			}
		}
	}
	.seller-wrapper{
		padding:18px 18px 0 18px;
		.title{
			padding-bottom:12px;
		}
	}
	.info-list{
		padding:0 18px;
	}
	.info-item{
		padding:16px 12px;
		font-size:12px;
		line-height:16px;
		font-weight:200;
		color:$font-color-1;
		@include border-top-1px($border-color);
	}
</style>
