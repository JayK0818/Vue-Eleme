<template>
	<transition name='slide-fade' v-on:after-leave='leave'>
		<div class="message-wrapper" v-show="visible">
			<div class="message-container">
				<p class="content">{{content}}</p>
				<div class="footer-button">
					<div class="cancel-text" @click.stop="handle_cancel">{{cancelText}}</div>
					<div class="confirm-text" @click.stop="handle_confirm">{{okText}}</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name:"message",
		methods:{
			leave(){
				this.$emit("leave")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	.slide-fade-enter-active,.slide-fade-leave-active{
		transition:all .3s;
	}
	.slide-fade-enter,.slide-fade-leave-to{
		opacity:0;
	}
	.message-wrapper{
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		top:0;
		background-color:rgba(0,0,0,.45);
		z-index:10000;
		transition:all .3s;
		.message-container{
			position:relative;
			left:50%;
			top:50%;
			transform:translate(-50%,-50%);
			width:240px;
			height:150px;
			background-color:#ffffff;
			border-radius:6px;
		}
		.content{
			text-align:center;
			line-height:100px;
		}
		.footer-button{
			display:flex;
			height:50px;
			@include border-top-1px(#e8e8e8);
			.cancel-text,.confirm-text{
				flex:1;
				text-align:center;
				line-height:50px;
			}
			.cancel-text{
				color:#ff4d4f;
				@include border-right-1px(#e8e8e8);
			}
			.confirm-text{
				color:#1890ff;
			}
		}
	}
</style>
