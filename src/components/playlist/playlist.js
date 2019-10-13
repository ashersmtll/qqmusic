
import {mapActions} from 'vuex';
import {playMode} from '../../common/js/config.js';

import {playerMixin} from '../../common/js/mixin.js';// 与player公用的JS
import _c from 'lodash/collection.js';
import _ from 'lodash/array.js';
export default {
	name: 'playlist',
	mixins: [playerMixin],
	data() {
		return {
			showFlag: !1,
		};
	},
	computed: {
		getModeText() {
			return this.mode === playMode.random ? '随机播放' : this.mode === playMode.sequence ? '循环播放' : '单曲循环';
		},
	},
	methods: {
		changeMode() { // 切换播放模式
			let mode = (this.mode + 1) % 3;
			let list = this.sequenceList;
			if (mode === playMode.random) {
				list = _c.shuffle(list);
			};
			let index = _.findIndex(list, this.currentSong);
			this.setPlaylist(list);
			this.setCurrentIndex(index);
			this.setPlayMode(mode);
		},
		isShow(bool) {
			this.showFlag = bool;
		},
		getCurrentIcon(item) { // 正在播放歌曲图标
			if (item.id === this.currentSong.id) {
				return 'icon-play';
			};
			return '';
		},
		selectItem(item, index) { // 点击播放歌曲
			if (this.mode === playMode.random) {
				index = _.findIndex(this.playlist, item);
			};
			this.setCurrentIndex(index);
		},
		scrollToCurrent() { // 滚动到正在播放的歌曲位置
			let index = _.findIndex(this.sequenceList, this.currentSong);
			this.$refs.scroller.scrollTo(0, index * this.$refs.listItem[0].offsetHeight);
		},
		deleteOne(item) { // 从列表中删除某曲
			this.deleteSong(item);
			if (!this.playlist.length) {
				this.hide();
			};
		},
		showConfirm() { // 弹出对话框

			this.$confirm('是否清空播放列表', {
				ok: ($vue) => {
					this.isShow(!1);
					this.clearPlaylist();
					$vue.showFlag = !1;
				},
				cencel: ($vue) => {$vue.showFlag = !1;}
			});
		},
		...mapActions([
			'deleteSong',
			'clearPlaylist'
		])
	},
};