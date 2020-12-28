import Vue from 'vue/dist/vue';
import Masker from './index.vue';
export const masker = (function(Vue){
	return function(options) {
		let Instance = Vue.extend(Masker);
		let instance = new Instance({
			el:document.createElement("div"),
			data(){
				return {
					seller:options
				}
			},
		})
		document.body.appendChild(instance.$el);
		instance.$on('close',function(){
			document.body.removeChild(instance.$el);
		})
	}
})(Vue)

