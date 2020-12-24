<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller['avatar']" width="64">
			</div>
			<div class="seller-info">
				<div class="name">
					<span class="brand">品牌</span>
					<h2 class="seller-name">{{seller['name']}}</h2>
				</div>
				<p class="delivery">
					<span class='type'>{{seller['description']}}/</span>
					<span class='time'>{{seller['deliveryTime']}}分钟送达</span>
				</p>
				<div class="discount" v-if="seller['supports']">
					<div class="discount-icon">减</div>
					<span>{{seller['supports'][0]['description']}}</span>
				</div>
				<div class="discount-count">
					<span v-if="seller['supports']">{{seller['supports'].length}}个</span><a-icon class="iconfont" type="right"></a-icon>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<div class="bulletin-icon">公告</div>
			<p class="bulletin-text">{{seller['bulletin']}}</p>
			<a-icon type='right' class='right-icon'></a-icon>
		</div>
		<div class="seller-bg"><img :src="seller['avatar']" width="100%"></div>
	</div>
</template>

<script>
	export default {
		name:'v-header',
		props:{
			seller:{
				type:Object,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		position:relative;
		color:#ffffff;
		overflow:hidden;
		background-color:rgba(7,17,27,.5);
		.seller-bg{
			position:absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			z-index:-10;
			filter:blur(10px);
		}
		.content-wrapper{
			position:relative;
			display:flex;
			padding:24px 0 18px 24px;
		}
		.bulletin-wrapper{
			display:flex;
			padding:0 12px;
			height:28px;
			background-color:rgba(7,17,27,.2);
			align-items:center;
			.bulletin-text{
				flex:1;
				padding-left:6px;
				font-size:10px;
				line-height:28px;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
			}
			.right-icon{
				font-size:12px;
			}
			.bulletin-icon{
				width:26px;
				height:12px;
				text-align:center;
				line-height:12px;
				background-color:#ffffff;
				color:#000000;
				font-weight:bold;
				font-size:10px;
				border-radius:2px;
			}
		}
		.seller-info{
			padding-left:16px;
			.name{
				display:flex;
				align-items:center;
			}
			.brand{
				font-size:12px;
				width:30px;
				height:18px;
				text-align:center;
				line-height:18px;
				background-color:#f01414;
				border-radius:2px;
			}
			.seller-name{
				padding-left:6px;
				font-size:16px;
				font-weight:bold;
				color:#ffffff;
			}
			.delivery{
				padding-top:8px;
				font-size:12px;
				line-height:12px;
			}
			.discount{
				padding-top:10px;
				height:12px;
				display:flex;
				aling-items:center;
				.discount-icon{
					width:16px;
					height:16px;
					background-color:#ffffff;
					text-align:center;
					line-height:16px;
					font-size:8px;
					color:#f67272;
					border-radius:2px;
				}
				span{
					font-size:12px;
					line-height:16px;
					padding-left:4px;
				}
			}
		}
		.discount-count{
			position:absolute;
			right:12px;
			bottom:10px;
			font-size:10px;
			padding:8px;
			background-color:rgba(0,0,0,.2);
			border-radius:12px;
			.iconfont{
				padding-left:3px;
				font-size:12px;
			}
		}
	}
</style>
