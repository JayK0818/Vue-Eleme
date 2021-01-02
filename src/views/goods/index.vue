<template>
	<div class="goods-page">
		<loading v-if="loading"/>
		<template v-else>
			<div class="menu-wrapper">
				<ul class="menu-list">
				<li 
					class="menu-item" 
					v-for="(menu,index) in goods_list" :key="'menu-'+index" @click.stop="select_menu(index)"
					:class="{active:current_index == index ? true : false}"
				>
					<span class="menu-name">
						<i class="menu-icon" v-if="menu['type'] > 0" :class="icon_class[menu['type']]"></i>
						{{menu['name']}}
					</span>
				</li>
			</ul>
		</div>
			<div class="goods-wrapper" ref='goods_list' @scroll.stop="listen_scroll">
				<ul class="goods-list">
					<li v-for="(good,index) in goods_list" :key="'good-'+index" class="food-container">
						<div class="food-type" ref="food_type">{{good['name']}}</div>
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
										<div class="reduce-button" @click.stop="reduce(food)">
											<transition name="slide-fade">
												<a-icon v-show="food['count']" type="minus-circle" theme="filled"></a-icon>
											</transition>
										</div>
										<span class="food-count" v-show="food['count']">{{food['count']}}</span>
										<div class="add-button" @click.stop="add(food)">
											<a-icon type="plus-circle" theme="filled"></a-icon>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</template>
	</div>
</template>

<script>
	import loading from '@/components/loading'
	import {mapMutations} from 'vuex'
	export default {
		name:'goods',
		data(){
			return {
				goods_list:[],
				loading:true,
				scroll_height:[],
				current_index:0
			}
		},
		created(){
			this.get_goods();
			this.icon_class = ['decrease','discount','special','invoice','garantee']
		},
		components:{loading},
		methods:{
			...mapMutations(['add_food','reduce_food']),
			add(food){
				this.add_food(food)
			},
			reduce(food){
				this.reduce_food(food)
			},
			get_goods(){
				this.axios({
					url:"/api/goods",
					method:'get',
				}).then(response => {
					this.loading = false;
					this.goods_list = response.map(item => {
						let foods = item['foods'].map(food => {
							return Object.assign({},food,{count:0})
						})
						return Object.assign({},item,{foods})
					})
					this.cacl_top()
				})
			},
			cacl_top(){
				this.$nextTick(() => {
					let type = this.$refs.food_type, array = [];
					type.forEach(function(el){
						array.push(el.offsetTop);
					})
					this.scroll_height = array;
				})
			},
			select_menu(index){
				let top = this.scroll_height[index];
				this.current_index = index;
				this.$nextTick(() => {
					let goods_list = this.$refs.goods_list;
					goods_list.scrollTo({left:0,top,behavior:'smooth'})
				})
			},
			cacl_index(top){
				let index = 0;
				for(let i = 0, length = this.scroll_height.length; i < length; i++){
					if( top >= this.scroll_height[i] && top < this.scroll_height[i+1] ){
						index = i;
					}
				}
				return index;
			},
			listen_scroll(event){
				let top = event.target.scrollTop;
				this.current_index = this.cacl_index(top);
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
		transform:translateX(44px);
	}
	.slide-fade-enter-to,.slide-fade-leave{
		transform:translateX(0);
	}
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
				display:flex;
				width:64px;
				height:20px;
				justify-content:space-between;
				position:absolute;
				right:0;
				bottom:0;
				font-size:20px;
				color:rgb(0,160,220);
				z-index:100;
				.food-count{
					font-size:10px;
					flex:0 0 24px;
					width:24px;
					text-align:center;
					color:rgb(147,153,159);
					line-height:20px;
				}
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
			cursor:pointer;
			padding:0 8px;
			&.active{
				background-color:#ffffff;
				.menu-name{
					@include border-none();
				}
			}
			&:last-child{
				@include border-none();
			}
			.menu-name{
				width:100%;
				display:table-cell;
				vertical-align:middle;
				@include border-bottom-1px(rgba(7,17,27,.1));
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
