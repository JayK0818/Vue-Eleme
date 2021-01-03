import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		cart:[],
		detail:{}
  },
  mutations: {
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
		click_detail(state,payload){
			state.detail = payload;
		}
  }
})
