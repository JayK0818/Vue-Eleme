import Vue from 'vue'
import message from './index.vue'

export const _message = (function(){
	return function(options){
		console.log(options)
		let Message = Vue.extend(message);
		let instance = new Message({
			el:document.createElement("div"),
			data(){
				return {
					visible:true,
					okText:options['okText'],
					cancelText:options['cancelText'],
					confirm:options['confirm'],
					cancel:options['cancel'],
					content:options['content']
				}
			},
			methods:{
				handle_confirm(){
					this.confirm()
				},
				handle_cancel(){
					this.$emit('cancel');
				}
			}
		})
		document.body.appendChild(instance.$el);
		instance.$on('leave',() => {
			document.body.removeChild(instance.$el);
		})
		instance.$on('cancel',() => {
			instance.visible = false;
		})
	}
})()