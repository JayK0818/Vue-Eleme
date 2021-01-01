<template>
	<div class="goods-page">
		<div class="menu-wrapper">
			<ul class="menu-list">
				<li class="menu-item" v-for="(menu,index) in goods_list" :key="'menu-'+index">
					<span class="menu-name">
						<i class="menu-icon" v-if="menu['type'] > 0" :class="icon_class[menu['type']]"></i>
						{{menu['name']}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper">
			<ul class="goods-list">
				<li v-for="(good,index) in goods_list" :key="'good-'+index" class="food-container">
					<div class="food-type">{{good['name']}}</div>
					<ul class="food-list">
						<li v-for="(food,index) in good['foods']" :key="'food-'+index" class="food-item">
							<div class="food-icon">
								<img :src="food['icon']" width="100%" height="100%">
							</div>
							<div class="food-info">
								<div class="food-name">{{food['name']}}</div>
								<div class="food-description" v-if="food['description']">{{food['description']}}</div>
								<div class="food-detail">
									<span class="sell-count">月售{{food['sellCount']}}份</span>
									<span class="food-rating">好评率{{food['rating']}}%</span>
								</div>
								<div class="price">
									<span class="new-price">{{food['price']}}</span>
									<span class="old-price" v-if="food['oldPrice']">{{food['oldPrice']}}</span>
								</div>
								<div class="food-counter">
									<a-icon type="plus-circle"></a-icon>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'goods',
		data(){
			return {
				goods_list:[]
			}
		},
		created(){
			this.get_goods();
			this.icon_class = ['decrease','discount','special','invoice','garantee']
		},
		methods:{
			get_goods(){
				this.axios({
					url:"/api/goods",
					method:'get',
				}).then(response => {
					console.log(response);
					this.goods_list = response;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	.goods-page{
		display:flex;
		position:absolute;
		top:0;
		bottom:46px;
		width:100%;
		background-color:#ffffff;
		.goods-wrapper{
			overflow:auto;
			.food-list{
				padding:0 18px;
			}
			.food-item{
				display:flex;
				padding:18px 0;
				@include border-bottom-1px(rgba(7,17,27,.1));
				&:last-child{
					@include border-none();
				}
			}
			.food-type{
				padding-left:14px;
				height:26px;
				font-size:12px;
				color:rgb(147,153,159);
				line-height:26px;
				background-color:#f3f5f7;
				border-left:2px solid #d9dde1;
			}
			.food-icon{
				flex:0 0 58px;
				width:58px;
				height:58px;
				border-radius:2px;
				overflow:hidden;
			}
			.food-info{
				position:relative;
				flex:1;
				padding-left:10px;
			}
			.food-name{
				padding-top:2px;
				font-size:14px;
				color:rgb(7,17,27);
				line-height:14px;
			}
			.food-description,.food-detail{
				padding-top:8px;
			}
			.sell-count,.food-rating,.food-description{
				font-size:10px;
				color:rgb(147,153,159);
			}
			.food-rating{
				padding-left:12px;
			}
			.price{
				padding-top:4px;
			}
			.new-price{
				font-size:14px;
				line-height:24px;
				color:rgb(240,20,20);
				font-weight:700;
				&:before{
					content:"¥";
					font-size:10px;
					font-weight:normal;
				}
			}
			.old-price{
				padding-left:8px;
				font-size:10px;
				text-decoration:line-through;
				color:rgb(147,153,159);
				line-height:24px;
				&:before{
					content:"¥",
				}
			}
			.food-counter{
				position:absolute;
				right:0;
				bottom:0;
				font-size:20px;
				color:rgb(0,160,220);
			}
		}
		.menu-wrapper{
			flex:0 0 80px;
			width:80px;
			background-color:#f3f5f7;
		}
		.goods-wrapper{
			flex:1;
		}
		.menu-list{
			padding:0 12px;
			height:100%;
			overflow:auto;
		}
		.menu-item{
			display:table;
			width:100%;
			height:54px;
			font-size:12px;
			color:rgb(7,17,27);
			font-weight:200;
			line-height:14px;
			@include border-bottom-1px(rgba(7,17,27,.1));
			&:last-child{
				@include border-none();
			}
			.menu-name{
				display:table-cell;
				vertical-align:middle;
			}
			.menu-icon{
				display:inline-block;
				width:12px;
				height:12px;
				vertical-align:top;
				background-size:12px 12px;
				background-repeat:no-repeat;
				&.descrease{
					@include bg-image('./images/decrease_3')
				}
				&.discount{
					@include bg-image("./images/discount_3")
				}
				&.guarantee{
					@include bg-image("./images/guarantee_3")
				}
				&.special{
					@include bg-image('./images/special_3')
				}
				&.invoice{
					@include bg-image("./images/invoice_3")
				}
			}
		}
	}
</style>
