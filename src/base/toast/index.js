import ToastComponent from './toast.vue'

let Toast = {};
Toast.install = (Vue) => {
	const ToastConstructor = Vue.extend(ToastComponent);
	const instance = new ToastConstructor();
	instance.$mount(instance.$el);
	document.body.appendChild(instance.$el);
	Vue.prototype.$toast = (msg, duration = 2000) => {
		instance.message = msg;
		instance.show = !0;
		let timer = setTimeout(() => {
			instance.show = !1;
			clearTimeout(timer);
		}, duration);
	}
}

export default Toast;