import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		cart:[],
		detail:{},
		delivery_price:0,
		min_price:0
  },
	getters:{
		total_price:(state) => {
			return state.cart.reduce((prev,next) => prev + next['price']*next['count'],0)
		},
		total_count:state => {
			return state.cart.reduce((prev,next) => prev + next['count'],0)
		}
	},
  mutations: {
		set_delivery_price(state,price){
			state.delivery_price = price
		},
		set_min_price(state,price){
			state.min_price = price;
		},
		add_food(state,payload){
			let food = state.cart.find(good => payload['id'] == good['id']);
			if(food){
				food['count'] += 1;
			}else{
				payload['count'] = 1;
				state.cart.push(payload);
			}
		},
		reduce_food(state,payload){
			let food = state.cart.find(good => payload['id'] == good['id']);
			if( food['count'] == 0 ) return;
			food['count'] -= 1;
		},
		clear_food(state){
			state.cart.forEach(food => {
				food['count'] = 0;
			})
			state.cart = [];
		},
		click_detail(state,payload){
			state.detail = payload;
		}
  }
})
