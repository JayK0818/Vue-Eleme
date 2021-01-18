<template>
	<transition name='tip' v-on:after-leave="leave">
		<div class="tip-wrapper" v-show="visible">
			<div class="tip-container">
				<a-icon type="check-circle" theme='filled' class="icon" :class="{active: success ? true : false}"/>
				<p class='text'>{{text}}</p>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name:"tip",
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/variable.scss';
	.tip-enter-active,.tip-leave-active{
		transition:all .3s;
	}
	.tip-enter,.tip-leave-to{
		opacity:0;
	}
	.tip-wrapper{
		position:fixed;
		top:0;
		right:0;
		left:0;
		bottom:0;
		background-color:rgba(0,0,0,.45);
		z-index:10000;
		transition:all .3s;
		.tip-container{
			position:relative;
			left:50%;
			top:50%;
			transform:translate(-50%,-50%);
			width:160px;
			height:110px;
			background-color:#ffffff;
			text-align:center;
			border-radius:4px;
		}
		.icon{
			margin-top:28px;
			font-size:24px;
			color:rgb(180,180,180);
			&.active{
				color:$check-color;
			}
		}
		.text{
			line-height:20px;
			font-size:14px;
			padding-top:6px;
		}
	}
</style>
