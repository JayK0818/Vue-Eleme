<template>
	<div class="star-wrapper" :class="starType">
		<span class="star-item" v-for="(item,index) in classes" :key="'star-'+index" :class='item'></span>
	</div>
</template>

<script>
	/*
	思路:根据传入不同的尺寸设置不同的类名,不同尺寸类名 星星的大小不一样。
			根据传入的评分 给每个星星设置三个不同的类名 分别表示全星 半星 和 没有星星
			通过每个星星的类名来引入 不同的星星图片
			把每个评分*2 向下取整 再/2, 使得可以把评分换算成整数 或者 含有.5的小数. 重点
	*/ 
	const STAR_LENGTH = 5, CLASS_ON = 'on', CLASS_HALF = 'half', CLASS_OFF = 'off';
	export default {
		name:'star',
		props:{
			size:{
				type:Number,
				default:24
			},
			score:{
				type:Number,
				required:true
			}
		},
		computed:{
			starType(){
				return 'star-' + this.size
			},
			classes(){
				let result = [];
				let score = Math.floor(this.score * 2) / 2;	
				let has_decimal = score % 1 !== 0;	// 判断有没有小数
				let integer = Math.floor(score);
				for(let i = 0; i < integer; i++){
					result.push(CLASS_ON);
				}
				if(has_decimal){
					result.push(CLASS_HALF);
				}
				while(result.length < STAR_LENGTH){
					result.push(CLASS_OFF);
				}
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	.star-wrapper{
		font-size:0;
		.star-item{
			display:inline-block;
			background-repeat:no-repeat;
		}
	}
	.star-48{
		.star-item{
			margin-right:22px;
			width:20px;
			height:20px;
			background-size:20px 20px;
			&:last-child{
				margin-right:0;
			}
			&.on{
				@include bg-image('./images/star48_on')
			}
			&.off{
				@include bg-image('./images/star48_off')
			}
			&.half{
				@include bg-image("./images/star48_half")
			}
		}
	}
	.star-36{
		.star-item{
			margin-right:6px;
			width:15px;
			height:15px;
			background-size:15px 15px;
			&:last-child{
				margin-right:0;
			}
			&.on{
				@include bg-image('./images/star36_on')
			}
			&.off{
				@include bg-image('./images/star36_off')
			}
			&.half{
				@include bg-image("./images/star36_half")
			}
		}
	}
	.star-24{
		.star-item{
			margin-right:6px;
			width:10px;
			height:10px;
			background-size:10px 10px;
			&:last-child{
				margin-right:3;
			}
			&.on{
				@include bg-image('./images/star24_on')
			}
			&.off{
				@include bg-image('./images/star24_off')
			}
			&.half{
				@include bg-image("./images/star24_half")
			}
		}
	}
</style>
