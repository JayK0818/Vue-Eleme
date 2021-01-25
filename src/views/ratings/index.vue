<template>
	<div class="ratings-page" ref="rating_page">
		<loading v-if="loading"/>
		<div class="rating-container" v-else>
			<div class="overview">
				<div class="left">
					<p class="rating-score">{{seller['foodScore']}}</p>
					<p class="text">综合评分</p>
					<p class="rating-rank">高于周边商家{{seller['rankRate']}}%</p>
				</div>
				<div class="right">
					<div class="score-wrapper">
						<span class="text">服务态度</span>
						<div class="star-wrapper">
							<star :size="36" :score="seller['serviceScore']"/>
						</div>
						<span class="score">{{seller['serviceScore']}}</span>
					</div>
					<div class="score-wrapper">
						<span class="text">商品评分</span>
						<div class="star-wrapper">
							<star :size="36" :score="seller['foodScore']"/>
						</div>
						<span class="score">{{seller['foodScore']}}</span>
					</div>
					<div class="delivery-time">
						<span class="text">送达时间</span>
						<span class="time">{{seller['deliveryTime']}}分钟</span>
					</div>
				</div>
			</div>
			<split/>
			<div class="rating-container">
				<rating-select
					title=""
					:list="rating_list"
					:only_text='only_text'
					:current_type="current_type"
					@toggle="toggle_content"
					@switch="switch_rating"
				/>
				<div class="rating-list">
					<ul>
						<template v-for="(rating,index) in rating_list">
							<li :key="'rating-'+index" class="rating-item" v-show="need_show(rating['rateType'],rating['text'])">
								<div class="avatar">
									<img :src="rating['avatar']" width="28" height="28">
								</div>
								<div class="rating-detail">
									<div class="rating-time">{{rating['rateTime'] | format_time}}</div>
									<p class="username">{{rating['username']}}</p>
									<div class="star-container">
										<star :size="24" :score="rating['score']"></star>
										<span class="delivery-time" v-if="rating['deliveryTime']">{{rating['deliveryTime']}}分钟送达</span>
									</div>
									<div class="rating-text">{{rating['text']}}</div>
									<div class="recommend-list">
										<a-icon v-if="rating['rateType'] == 0" type="like" theme="filled" class="icon active"></a-icon>
										<a-icon v-else type="dislike" theme="filled" class='icon'></a-icon>
										<div 
											class="recommend-item"
											v-for="(recommend,i) in rating['recommend']"
											:key="'recommend-'+i"
										>{{recommend}}</div>
									</div>
								</div>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star'
	import BScroll from 'better-scroll'
	import loading from '@/components/loading'
	import RatingSelect from '@/components/rating-select'
	import {format_date} from '@/common/js/util'
	import {Tag} from 'ant-design-vue'
	import split from '@/components/split'
	const ALL = 2;
	export default {
		name:'ratings',
		data(){
			return {
				rating_list:[],
				loading:true,
				only_text:false,
				current_type : 2
			}
		},
		created(){
			this.get_ratings();
			this.tag_class = ['pink','red','orange','green','cyan','blue','purple'];
			this.scroll = null;
		},
		filters:{
			format_time(value){
				return format_date(value,'yyyy-MM-dd hh:mm');
			}
		},
		props:{
			seller:{
				type:Object,
				required:true
			}
		},
		components:{star,loading,RatingSelect,[Tag.name]:Tag,split},
		methods:{
			_init_scroll(){
				this.$nextTick(() => {
					this.scroll =	new BScroll(this.$refs.rating_page,{
						click:true,
						probeType:3
					})
				})
			},
			get_ratings(){
				this.axios({
					url:'/api/ratings',
					method:'get'
				}).then(response => {
					this.rating_list = response;
					this.loading = false;
					this._init_scroll();
				})
			},
			toggle_content(){
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
			},
			need_show(type,text){
				if(this.only_text && !text){
					return false;
				}
				if(this.current_type == ALL){
					return true;
				}else{
					return this.current_type == type;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/variable.scss';
	@import '../../common/css/mixin.scss';
	.ratings-page{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		bottom:46px;
		overflow:auto;
	}
	.overview{
		display:flex;
		padding:18px 24px 18px 0;
		background-color:$white;
		@media screen and (max-width:320px){
			padding:18px 0;
		}
		.left{
			flex:0 0 137px;
			width:137px;
			text-align:center;
			@include border-right-1px($border-color);
			@media screen and (max-width:320px){
				flex:0 0 120px;
				width:120px;
			}
			.rating-score{
				font-size:24px;
				color:rgb(255,153,0);
				line-height:28px;
			}
			.text{
				font-size:12px;
				color:$font-color-1;
				line-height:18px;
			}
			.rating-rank{
				padding-top:8px;
				font-size:10px;
				line-height:10px;
				color:$font-color-3;
			}
		}
		.right{
			padding-left:24px;
			@media screen and (max-width:320px){
				padding-left:6px;
				.text{
					padding-right:6px!important;
				}
				.score{
					padding-left:6px!important;
				}
			}
			.score-wrapper,.delivery-time{
				.text{
					padding-right:12px;
					font-size:12px;
					color:$font-color-1;
					line-height:18px;
				}
			}
			.score-wrapper{
				padding-bottom:8px;
				display:flex;
				.score{
					padding-left:12px;
					color:rgb(255,153,0);
					line-height:18px;
					font-size:12px;
				}
			}
			.time{
				line-height:18px;
				font-size:12px;
				color:$font-color-3;
			}
		}
	}
	.rating-list{
		padding:0 18px;
		background-color:#ffffff;
		.rating-item{
			display:flex;
			padding:18px 0;
			@include border-bottom-1px($border-color)
		}
		.avatar{
			width:28px;
			height:28px;
			flex:0 0 28px;
			border-radius:50%;
			img{
				border-radius:50%;
			}
		}
		.rating-detail{
			flex:1;
			position:relative;
			padding-left:12px;
			.rating-time{
				position:absolute;
				right:0;
				top:0;
			}
			.username{
				font-size:10px;
				color:$font-color-1;
				line-height:12px;
			}
			.star-container{
				display:flex;
				padding-top:4px;
			}
			.delivery-time{
				padding-left:6px;
				font-size:10px;
				color:$font-color-3;
				line-height:12px;
			}
			.rating-text{
				padding:6px 0 8px;
				font-size:12px;
				color:$font-color-1;
				line-height:18px;
			}
			.rating-time{
				font-size:10px;
				color:$font-color-3;
				line-height:12px;
			}
			.recommend-list{
				display:flex;
				flex-wrap:wrap;
			}
			.icon{
				margin-right:8px;
				font-size:12px;
				line-height:20px;
				color:rgb(183,187,191);
				&.active{
					color:$highlight-color;
				}
			}
			.recommend-item{
				margin-right:8px;
				margin-bottom:8px;
				padding:0 6px;
				width:62px;
				overflow:auto;
				white-space:nowrap;
				text-overflow:ellipsis;
				background-color:#ffffff;
				border:1px solid $border-color;
				font-size:9px;
				color:$font-color-3;
				line-height:16px;
			}
		}
	}
</style>
