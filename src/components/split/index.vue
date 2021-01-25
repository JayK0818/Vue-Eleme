<template>
	<div class="split"></div>
</template>

<script>
	export default {
		name:'split'
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	@import '../../common/css/variable.scss';
	.split{
		height:16px;
		background-color:#f3f5f7;
		@include border-top-1px($border-color);
		@include border-bottom-1px($border-color);
	}
</style>
