
export default {
	props: {
		percent: {
			type: Number,
			default: 0
		}
	},
	watch: {
		percent(newPer) {
			let barWidth = this.$refs.progressBar.clientWidth;
			let offsetWidth = barWidth * this.percent;
			this._setOffset(offsetWidth);
		}
	},
	methods: {
		progressClick(e) {
			let rectLeft = this.$refs.progressBar.getBoundingClientRect().left;
			let offsetWidth = e.pageX - rectLeft;
			this._setOffset(offsetWidth);
			this._trrigerPercent();
		},
		_setOffset(offsetWidth) {
			this.$refs.progress.style.width = offsetWidth + 'px';
			this.$refs.progressBtn.style.left = offsetWidth + 'px';
		},
		_trrigerPercent() { // 进度条变化 派发事件
			let barWidth = this.$refs.progressBar.clientWidth;
			let percent = this.$refs.progress.clientWidth / barWidth;
			this.$emit('percent-change', percent);
		}
	}
};