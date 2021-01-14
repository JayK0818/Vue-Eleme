<template>
	<div class="rating-select-wrapper">
		<div class="rating-select">
			<div class="rating-title">{{title}}</div>
			<div class="select-item-list">
				<div class="select-item all">{{desc['all']}} <span class="count"></span></div>
				<div class="select-item positive">{{desc['positive']}} <span class="count"></span></div>
				<div class="select-item negative">{{desc['negative']}} <span class="count"></span></div>
			</div>
			<div class="toggle-content">
				<a-icon type="check-circle" theme='filled' class='icon'/>
				<span class="text">只看有内容的评价</span>
			</div>
		</div>
		<div class="rating-list">
			<ul>
				<li class="rating-item" v-for="(rating,index) in list" :key="'rating-'+index">
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
	</div>
</template>

<script>
	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;
	import {format_date} from '@/common/js/util'
	export default {
		name:'rating-select',
		filters:{
			format(value){
				return format_date(value,'yyyy-MM-dd hh:mm');
			}
		},
		props:{
			title:{
				type:String,
				default:"商品评价"
			},
			list:{
				type:Array,
				default:function(){
					return []
				}
			},
			current_type:{
				type:Number,
				default:ALL
			},
			only_text:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default:function() {
					return {
						all:"全部",
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	.rating-select{
		padding:18px 18px 0;
		background-color:#ffffff;
		@include border-bottom-1px(rgba(7,17,27,.1))
		.rating-title{
			color:rgb(7,17,27);
			font-size:14px;
		}
		.select-item-list{
			padding:18px 0;
			display:flex;
			@include border-bottom-1px(rgba(7,17,27,.1))
		}
		.select-item{
			margin-right:8px;
			padding:8px 12px;
			text-align:center;
			font-size:12px;
			border-radius:2px;
			&.all{
				background-color:#00a0dc;
				color:#ffffff;
			}
			&.positive{
				background-color:#ccecf8;
				color:rgb(77,85,93);
			}
			&.negative{
				background-color:rgba(77,85,93,.2);
				color:rgb(77,85,93);
			}
			.count{
				font-size:8px;
			}
		}
		.toggle-content{
			padding:12px 0;
			color:rgb(147,153,159);
			.text{
				padding-left:4px;
				font-size:12px;
				line-height:24px;
			}
			.icon{
				font-size:18px;
				vertical-align:-4px;
			}
		}
	}
	.rating-list{
		padding:0 18px;
		background-color:#ffffff;
		.rating-item{
			position:relative;
			padding:12px 0;
			@include border-bottom-1px(rgba(7,17,27,.1));
			&:last-child{
				@include border-none();
			}
		}
		.rating-time{
			font-size:10px;
			color:rgb(147,153,159);
			line-height:12px;
		}
		.rating-content{
			padding-top:6px;
			text-overflow:ellipsis;
			overflow:hidden;
			white-space:nowrap;
			.rating-text{
				padding-left:4px;
				color:rgb(7,17,27);
				line-height:16px;
				font-size:12px;
			}
			.icon{
				font-size:14px;
				&.like-icon{
					color:rgb(0,160,220);
				}
				&.dislike-icon{
					color:rgb(147,153,159);
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
			color:rgb(147,153,159);
			line-height:12px;
		}
		.avatar{
			width:12px;
			height:12px;
			border-radius:50%;
		}
	}
</style>
