<template>
	<div class="rating-select-wrapper">
		<div class="rating-select">
			<div class="rating-title">{{title}}</div>
			<div class="select-item-list">
				<div 
					class="select-item all" 
					:class="{active:current_type == 2 ? true : false}"
					@click.stop="switch_rating(2)"
				>{{desc['all']}} <span class="count">{{list.length}}</span></div>
				<div 
					class="select-item positive" 
					:class="{active:current_type == 0 ? true : false}"
					@click.stop="switch_rating(0)"
				>{{desc['positive']}} <span class="count">{{positive.length}}</span></div>
				<div 
					class="select-item negative" 
					:class="{active:current_type == 1 ? true : false}"
					@click.stop="switch_rating(1)"
				>{{desc['negative']}} <span class="count">{{negative.length}}</span></div>
			</div>
			<div class="toggle-content">
				<a-icon type="check-circle" theme='filled' class='icon' @click.stop="toggle_content" :class="{active:only_text ? true : false}"/>
				<span class="text" @click.stop="toggle_content">只看有内容的评价</span>
			</div>
		</div>
		<div class="rating-list" v-if="list.length">
			<ul>
				<li class="rating-item" v-for="(rating,index) in list" :key="'rating-'+index"  v-show="need_show(rating['rateType'],rating['text'])">
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
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	import {format_date} from '@/common/js/util'
	import {Empty} from 'ant-design-vue'
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
		},
		computed:{
			positive(){
				return this.list.filter(rating => rating['rateType'] == POSITIVE)
			},
			negative(){
				return this.list.filter(rating => rating['rateType'] == NEGATIVE)
			}
		},
		components:{
			[Empty.name]:Empty
		},
		methods:{
			toggle_content(){
				this.$emit("toggle")
			},
			switch_rating(type){
				this.$emit("switch",type)
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	@import '../../common/css/variable.scss';
	.rating-select{
		padding:18px 18px 0;
		background-color:#ffffff;
		@include border-bottom-1px($border-color)
		.rating-title{
			color:$font-color-1;
			font-size:14px;
		}
		.select-item-list{
			padding:18px 0;
			display:flex;
			@include border-bottom-1px($border-color)
		}
		.select-item{
			margin-right:8px;
			padding:8px 12px;
			text-align:center;
			font-size:12px;
			border-radius:2px;
			&.all{
				background-color:#ccecf8;
				color:$font-color-2;
				&.active{
					color:#ffffff;
					background-color:$highlight-color;
				}
			}
			&.positive{
				background-color:#ccecf8;
				color:$font-color-2;
				&.active{
					color:#ffffff;
					background-color:$highlight-color;
				}
			}
			&.negative{
				background-color:rgba(77,85,93,.2);
				color:$font-color-2;
				&.active{
					background-color:$font-color-2;
					color:#ffffff;
				}
			}
			.count{
				font-size:8px;
			}
		}
		.toggle-content{
			padding:12px 0;
			color:$font-color-3;
			.text{
				padding-left:4px;
				font-size:12px;
				line-height:24px;
			}
			.icon{
				font-size:18px;
				vertical-align:-4px;
				&.active{
					color:$check-color;
				}
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
