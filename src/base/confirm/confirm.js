export default {
	props: {
		text: {
			type: String,
			default: ''
		},
		confirmBtnText: {
			type: String,
			default: '确定'
		},
		cancelBtnText: {
			type: String,
			default: '取消'
		}
	},
	data() {
		return {
			showFlag: !1
		};
	},
	methods: {
		show() {
			this.showFlag = !0;
		},
		hide() {
			this.showFlag = !1;
		},
		confirm() {
			this.hide();
			this.$emit('confirm');
		},
		cancel() {
			this.hide();
			this.$emit('cancel');
		}
	}
};