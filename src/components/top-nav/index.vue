<template>
	<div class="nav-list">
		<div class="nav-item">
			<router-link to="/goods">商品</router-link>
		</div>
		<div class="nav-item">
			<router-link to="ratings">评价</router-link>
		</div>
		<div class="nav-item">
			<router-link to="seller">商家</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "../../common/css/mixin.scss";
	@import "../../common/css/variable.scss";
	.nav-list{
		display:flex;
		height:40px;
		@include border-bottom-1px($border-color);
	}
	.nav-item{
		flex:1;
		line-height:40px;
		text-align:center;
		a{
			display:block;
			color:#314659;
			font-size:14px;
			&.active{
				color:$highlight-color;
			}
		}
	}
</style>
