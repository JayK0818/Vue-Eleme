<template>
	<span class="support-icon" :class="icon_class"></span>
</template>

<script>
	export default {
		name:'support-icon',
		props:{
			size:{
				type:Number,
				default:1
			},
			type:{
				type:Number,
				required:true
			}
		},
		computed:{
			icon_class(){
				let class_map = ['decrease','discount','special','invoice','guarantee']
				return `icon-${this.size} ${class_map[this.type]}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	.support-icon{
		display:inline-block;
		background-repeat:no-repeat;
	}
	.icon-1{
		width:12px;
		height:12px;
		background-size:12px 12px;
		&.decrease{
			@include bg-image('./images/decrease_1');
		}
		&.discount{
			@include bg-image('./images/discount_1');
		}
		&.special{
			@include bg-image('./images/special_1');
		}
		&.invoice{
			@include bg-image('./images/invoice_1');
		}
		&.guarantee{
			@include bg-image('./images/guarantee_1');
		}
	}
	.icon-2{
		width:16px;
		height:16px;
		background-size:16px 16px;
		&.decrease{
			@include bg-image('./images/decrease_2');
		}
		&.discount{
			@include bg-image('./images/discount_2');
		}
		&.special{
			@include bg-image('./images/special_2');
		}
		&.invoice{
			@include bg-image('./images/invoice_2');
		}
		&.guarantee{
			@include bg-image('./images/guarantee_2');
		}
	}
	.icon-3{
		width:12px;
		height:12px;
		background-size:12px 12px;
		&.decrease{
			@include bg-image('./images/decrease_3');
		}
		&.discount{
			@include bg-image('./images/discount_3');
		}
		&.special{
			@include bg-image('./images/special_3');
		}
		&.invoice{
			@include bg-image('./images/invoice_3');
		}
		&.guarantee{
			@include bg-image('./images/guarantee_3');
		}
	}
	.icon-4{
		width:16px;
		height:16px;
		background-size:16px;
		&.decrease{
			@include bg-image('./images/decrease_4');
		}
		&.discount{
			@include bg-image('./images/discount_4');
		}
		&.special{
			@include bg-image('./images/special_4');
		}
		&.invoice{
			@include bg-image('./images/invoice_4');
		}
		&.guarantee{
			@include bg-image('./images/guarantee_4');
		}
	}
</style>
