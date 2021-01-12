<template>
	<div class="rating-list">
		<div class="rating-item" v-for="(rating,index) in list" :key="'rating-'+index">
			<div class="rating-time">{{rating['rateTime']}}</div>
			<div class="rating-content">
				<a-icon v-if="rating['rateType'] == 0" type="like" theme="filled" class="like-icon icon"></a-icon>
				<a-icon v-if="raging['rateType'] == 1" type='dislike' theme="filled" class="dislike-icon icon"></a-icon>
				<span class="rating-text">{{rating['text']}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'rating-list',
		props:{
			list:{
				type:Array,
				default:function(){
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/reset.scss';
	.rating-list{
		padding:0 18px;
		background-color:#ffffff;
	}
	.rating-item{
		position:relative;
		padding:16px 0;
		@include border-bottom-1px(rgba(7,17,27,.1));
		.rating-time{
			font-size:10px;
			color:rgb(147,153,159);
			line-height:12px;
		}
		.rating-text{
			padding-left:4px;
			color:rgb(7,17,27);
			font-size:12px;
			line-height:16px;
		}
		.icon{
			font-size:12px;
			line-height:24px;
			&.like-icon{
				color:rgb(0,160,220);
			}
			&.dislike-icon{
				color:rgb(147,153,159);
			}
		}
	}
</style>
