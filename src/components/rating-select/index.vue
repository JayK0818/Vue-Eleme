<template>
	<div class="rating-select-wrapper">
		<div class="rating-select">
			<div class="rating-title" v-if="title">{{title}}</div>
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
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	import {Icon} from 'ant-design-vue'
	export default {
		name:'rating-select',
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
			[Icon.name]:Icon
		},
		methods:{
			toggle_content(){
				this.$emit("toggle")
			},
			switch_rating(type){
				this.$emit("switch",type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	@import '../../common/css/variable.scss';
	.rating-select{
		padding:0 18px 0;
		background-color:#ffffff;
		@include border-bottom-1px($border-color)
		.rating-title{
			padding-top:18px;
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
</style>
