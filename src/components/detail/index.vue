<template>
	<transition name="slide" appear>
		<div class="detail-wrapper" ref='detail_section'>
			<section style="padding-bottom:48px;">
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
					<transition name="cart-fade">
						<div class="add-cart-wrapper" v-if="detail['count'] == 0">
							<div class="add-button" @click.stop="add_cart">加入购物车</div>
						</div>
					</transition>
					<div class="count-wrapper" v-if="detail['count']">
						<a-icon type="minus-circle" theme="filled" @click.stop="reduce"/>
						<span class="count">{{detail['count']}}</span>
						<a-icon type="plus-circle" theme='filled' @click.stop="add"/>
					</div>
				</div>
				<split v-if="detail['description']"/>
				<div class="food-introduce" v-if="detail['description']">
					<div class="introduce-title">商品介绍</div>
					<p class="introduce-description">{{detail['description']}}</p>
				</div>
				<split/>
				<div class="rating-wrapper" v-if="detail['ratings']">
					<rating-select
						title='商品评价'
						:list="detail['ratings']"
						:current_type="current_type"
						:desc="desc"
						:only_text='only_text'
						@toggle="toggle"
						@switch="switch_rating"
					/>
					<div class="rating-list" v-if="detail['ratings'].length">
						<ul>
							<li class="rating-item" v-for="(rating,index) in detail['ratings']" :key="'rating-'+index"  v-show="need_show(rating['rateType'],rating['text'])">
								<div class="rating-time">{{rating['rateTime'] | format}}</div>
								<div class="rating-content">
									<a-icon type="like" class='icon like-icon' theme="filled" v-if="rating['rateType'] == 0"/>
									<a-icon type="dislike" class="icon dislike-icon" theme="filled" v-if="rating['rateType'] == 1"/>
									<span class='rating-text' v-if="rating['text']">{{rating['text']}}</span>
								</div>
								<div class="user-info">
									<span class="username">{{rating['username']}}</span>
									<img :src="rating['avatar']" width='12' height='12' class='avatar'>
								</div>
							</li>
						</ul>
					</div>
					<a-empty description="暂无评价" v-else/>
				</div>
			</section>
		</div>
	</transition>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {_message} from '@/components/message'
	import BScroll from 'better-scroll';
	import RatingSelect from '@/components/rating-select'
	import {Empty} from 'ant-design-vue'
	import {format_date} from '@/common/js/util'
	import split from '@/components/split'
	const ALL = 2;
	export default {
		name:'detail',
		data(){
			return {
				desc:{
					all:'全部',
					positive:"推荐",
					negative:"吐槽"
				},
				only_text:false,
				current_type:2
			}
		},
		created(){
			this._init_scroll();
			this.scroll = null;
		},
		computed:{
			...mapState(['detail']),
		},
		filters:{
			format(value){
				return format_date(value,'yyyy-MM-dd hh:mm');
			}
		},
		components:{RatingSelect,[Empty.name]:Empty,split},
		methods:{
			...mapMutations(['add_food','reduce_food','clear_food']),
			_init_scroll(){
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.detail_section,{
						probeType:3,
						click:true
					})
				})
			},
			back(){
				this.$router.back();
			},
			add_cart(){
				this.add_food(this.detail);
				this.$emit('add',event.target);
			},
			add(event){
				this.add_food(this.detail)
				this.$emit('add',event.target.parentElement);
			},
			need_show(type,text){	// 如果要显示内容但是又没有内容 则返回false
				if(this.only_text && !text){
					return false;
				}	
				if(this.current_type == ALL){
					return true;
				}else{
					return this.current_type == type;
				}
			},
			reduce(){
				let count = this.detail['count'];
				if(count == 1){
					_message({
						content:"确定删除当前商品吗?",
						okText:"确定",
						cancelText:"取消",
						confirm:() => {
							this.clear_food()
						}
					})
				}else{
					this.reduce_food(this.detail);
				}
			},
			toggle(){
				this.only_text = !this.only_text;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			switch_rating(type){
				this.current_type = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	@import '../../common/css/variable.scss';
	.slide-enter-active,.slide-leave-active{
		transition:all .35s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(100%,0,0);
	}
	.cart-fade-enter-active,.cart-fade-leave-active{
		transition:all .35s;
	}
	.cart-fade-enter,.cart-fade-leave-to{
		opacity:0;
	}
	.detail-wrapper{
		position:fixed;
		left:0;right:0;top:0;bottom:46px;
		z-index:210;
		background-color:$white;
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
			font-size:18px;
			color:rgb(250,250,250);
		}
		.food-info{
			position:relative;
			padding:18px;
			width:100%;
			@include border-bottom-1px(rgba(7,17,27,.1));
			.food-name{
				font-size:14px;
				font-weight:bold;
				color:$font-color-1;
				line-height:14px;
			}
			.sell-info{
				padding-top:8px;
				font-size:10px;
				color:$font-color-3;
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
				color:$price-color;
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
				color:$font-color-3;
				text-decoration:line-through;
				&:before{
					content:"¥"
				}
			}
			.add-cart-wrapper{
				position:absolute;
				right:18px;
				bottom:18px;
				.add-button{
					width:74px;
					height:24px;
					line-height:24px;
					text-align:center;
					border-radius:12px;
					font-size:10px;
					color:$white;
					background-color:$highlight-color;
				}
			}
			.count-wrapper{
				position:absolute;
				right:18px;
				bottom:18px;
				display:flex;
				align-items:center;
				font-size:18px;
				color:$highlight-color;
				line-height:18px;
				.count{
					padding:0 10px;
					color:#94969b;
					font-size:14px;
					line-height:18px;
				}
			}
		}
		.food-introduce{
			padding:18px;
			.introduce-title{
				font-size:14px;
				color:$font-color-1;
			}
			.introduce-description{
				padding:6px 8px 0 8px;
				font-size:12px;
				color:$font-color-2;
				line-height:24px;
			}
		}
	}
	.rating-list{
		padding:0 18px;
		background-color:#ffffff;
		.rating-item{
			position:relative;
			padding:12px 0;
			@include border-bottom-1px($border-color);
			&:last-child{
				@include border-none();
			}
		}
		.rating-time{
			font-size:10px;
			color:$font-color-3;
			line-height:12px;
		}
		.rating-content{
			padding-top:6px;
			text-overflow:ellipsis;
			overflow:hidden;
			white-space:nowrap;
			.rating-text{
				padding-left:4px;
				color:$font-color-1;
				line-height:16px;
				font-size:12px;
			}
			.icon{
				font-size:14px;
				&.like-icon{
					color:$highlight-color;
				}
				&.dislike-icon{
					color:$font-color-3;
				}
			}
		}
		.user-info{
			position:absolute;
			right:0;
			top:12px;
		}
		.username{
			padding-right:6px;
			font-size:10px;
			color:$font-color-3;
			line-height:12px;
		}
		.avatar{
			width:12px;
			height:12px;
			border-radius:50%;
		}
	}
</style>
