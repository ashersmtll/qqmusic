import ConfirmComponent from './confirm.vue'

let Confirm = {};
Confirm.install = (Vue) => {
	const ConfirmConstructor = Vue.extend(ConfirmComponent);
	const confirm = new ConfirmConstructor();
	confirm.$mount(confirm.$el);
	document.body.appendChild(confirm.$el);
	Vue.prototype.$confirm = (msg, {ok, cencel, okText, cancelText}) => {
		confirm.text = msg;
		confirm.showFlag = !0;
		confirm.confirm = () => { ok && ok(confirm)};
		confirm.cancel = () => { cencel && cencel(confirm)};
		okText? confirm.confirmBtnText = okText: '';
		cancelText? confirm.cancelBtnText = cancelText: '';
	}
}

export default Confirm;