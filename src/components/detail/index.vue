<template>
	<transition name="slide" appear>
		<div class="detail-wrapper">
			<div class="food-image">
				<img :src="detail['image']" width="100%" height="100%" class='image'>
				<div class="back-icon" @click.stop="back">
					<a-icon type="left"/>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:'detail',
		data(){
			return {
				
			}
		},
		computed:{
			...mapState(['detail'])
		},
		methods:{
			back(){
				this.$router.back();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slide-enter-active,.slide-leave-active{
		transition:transform .3s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(100%,0,0);
	}
	.detail-wrapper{
		position:fixed;
		left:0;right:0;top:0;bottom:0;
		z-index:1000;
		background-color:#ffffff;
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
			font-size:20px;
			color:#ffffff;
		}
	}
</style>
