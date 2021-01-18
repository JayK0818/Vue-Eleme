import Tip from './tip.vue';
import Vue from 'vue';

export const tip = (function() {
	return function(options){
		let Tip_Component = Vue.extend(Tip);
		let instance = new Tip_Component({
			el:document.createElement('div'),
			data(){
				return {
					success:options['success'],
					text:options['text'],
					visible:true
				}
			},
			created(){
				this.timer = null;
			},
			methods:{
				leave(){
					this.$emit("leave")
				},
			},
			mounted(){
				this.timer = setTimeout(() => {
					this.visible = false;
				},1200)
			},
			beforeDestory(){
				if(this.timer){
					clearTimeout(this.timer);
				}
			}
		})
		document.body.appendChild(instance.$el);
		
		instance.$on('leave',() => {
			document.body.removeChild(instance.$el);
		})
	}
})()