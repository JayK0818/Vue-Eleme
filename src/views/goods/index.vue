<template>
	<div class="goods-page">
		<loading v-if="loading"/>
		<template v-else>
			<div class="menu-wrapper" ref="menu_list">
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
						<div class="type-count" v-if="type_count(menu['name']) > 0">{{type_count(menu['name'])}}</div>
					</li>
				</ul>
			</div>
			<div class="goods-wrapper" ref='goods_list'>
				<ul class="goods-list">
						<li v-for="(good,index) in goods_list" :key="'good-'+index" class="food-container" ref="food_container">
							<div class="food-type">{{good['name']}}</div>
							<ul class="food-list">
								<li
									v-for="(food,index) in good['foods']" 
									:key="'food-'+index" 
									class="food-item"
									@click.stop="go_to_detail(food)"
								>
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
													<a-icon v-show="food['count'] > 0" type="minus-circle" theme="filled"></a-icon>
												</transition>
											</div>
											<span class="food-count" v-show="food['count']">{{food['count']}}</span>
											<div class="add-button" @click.stop="add(food,$event)">
												<a-icon type="plus-circle" theme="filled"></a-icon>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</li>
					</ul>
			</div>
			<router-view/>
		</template>
	</div>
</template>

<script>
	import loading from '@/components/loading'
	import BScroll from 'better-scroll'
	import {mapMutations} from 'vuex'
	export default {
		name:'goods',
		data(){
			return {
				goods_list:[],
				loading:true,
				scroll_height:[],
				scrollY:0,
				current_index:0
			}
		},
		created(){
			this.get_goods();
			this.icon_class = ['decrease','discount','special','invoice','garantee'];
			this.food_scroll = null;
			this.menu_scroll = null;
		},
		components:{loading},
		watch:{
			scrollY(value){
				let index = 0;
				for(let i = 0, length = this.scroll_height.length - 1; i < length; i++){
					if( value >= this.scroll_height[i] && value < this.scroll_height[i+1] ){
						index = i;
					}
				}
				this.current_index = index;
			}
		},
		computed:{
			type_count(){
				return function(name){
					let count = 0;
					let find = this.goods_list.find(good => good['name'] == name);
					count = find.foods.reduce((prev,next) => prev + next['count'],0);
					if(count > 99){
						return 99
					}else{
						return count;
					}
				}
			}
		},
		methods:{
			...mapMutations(['add_food','reduce_food','click_detail']),
			_initial_scroll(){
				this.food_scroll = new BScroll(this.$refs.goods_list,{
					probeType:3,
					click:true
				}) ;
				this.menu_scroll = new BScroll(this.$refs.menu_list,{
					probeType:3,
					click:true
				})
				this.food_scroll.on('scroll',({y}) => {
					if(y > 0){
						this.scrollY = 0; 
						return;
					}
					this.scrollY = Math.abs(Math.round(y));
				})
			},
			add(food,event){
				this.add_food(food)
				this.$emit('add',event.target.parentElement)
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
					this.$nextTick(() => {
						this.cacl_top()
						this._initial_scroll();
					})
				})
			},
			go_to_detail(detail){
				this.click_detail(detail);
				this.$router.push(`/goods/${detail.id}`)
			},
			cacl_top(){
				let container = this.$refs.food_container, array = [];
				container.forEach(function(el){array.push(el.offsetTop)})
				let last_child_height = container[container.length-1].clientHeight + container[container.length-1].offsetTop;
				array.push(last_child_height)
				this.scroll_height = array;
			},
			select_menu(index){
				let aLi = document.querySelectorAll(".food-container");
				let ele = aLi[index];
				this.food_scroll.scrollToElement(ele);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/mixin.scss';
	@import '../../common/css/variable.scss';
	.slide-fade-enter-active,.slide-fade-leave-active{
		transition:all .45s;
	}
	.slide-fade-enter,.slide-fade-leave-to{
		transform:translate3d(44px,0,0);
		opacity:0;
	}
	.slide-fade-enter-to,.slide-fade-leave{
		transform:translate3d(0,0,0) rotate(-180deg);
		opacity:1;
	}
	.goods-page{
		display:flex;
		position:absolute;
		top:0;
		left:0;
		bottom:46px;
		width:100%;
		background-color:$white;
		.scroll-container{
			width:100%;
			height:100%;
		}
		.goods-wrapper{
			overflow:auto;
			.food-list{
				padding:0 18px;
			}
			.food-item{
				display:flex;
				padding:18px 0;
				@include border-bottom-1px($border-color);
				&:last-child{
					@include border-none();
				}
			}
			.food-type{
				padding-left:14px;
				height:26px;
				font-size:12px;
				color:$font-color-3;
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
				color:$font-color-1;
				line-height:14px;
			}
			.food-description,.food-detail{
				padding-top:8px;
			}
			.sell-count,.food-rating,.food-description{
				font-size:10px;
				color:$font-color-3;
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
				color:$price-color;
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
				color:$font-color-3;
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
				color:$highlight-color;
				z-index:200;
				.food-count{
					font-size:12px;
					flex:0 0 24px;
					width:24px;
					text-align:center;
					color:$font-color-3;
					line-height:20px;
				}
			}
		}
		.menu-wrapper{
			flex:0 0 80px;
			width:80px;
			background-color:#f3f5f7;
			overflow:auto;
		}
		.goods-wrapper{
			flex:1;
		}
		.menu-item{
			position:relative;
			display:table;
			width:100%;
			height:54px;
			font-size:12px;
			color:$font-color-1;
			font-weight:200;
			line-height:14px;
			cursor:pointer;
			padding:0 8px;
			&.active{
				background-color:$white;
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
				@include border-bottom-1px($border-color);
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
			.type-count{
				position:absolute;
				right:0;
				top:5px;
				width:20px;
				height:14px;
				font-size:10px;
				color:$white;
				text-align:center;
				line-height:14px;
				background-color:$price-color;
				border-radius:7px;
				z-index:100;
				box-shadow:0 4px 8px 0 rgba(0,0,0,.12);
			}
		}
	}
</style>
