import {mapGetters, mapMutations, mapActions} from 'vuex';
import {playMode} from '../../common/js/config';
import ProgressBar from '../../base/progress-bar/progress-bar.vue';
import Playlist from '../playlist/playlist.vue';
import animations from 'create-keyframe-animation';
import { playerMixin } from "../../common/js/mixin";
import {getLyc, doumLyc} from "../../api/getLyc";
import LyricParse from 'lyric-parser';
import {Base64} from 'js-base64';

export default {
	name: "player",
	components: {ProgressBar, Playlist},
	mixins: [playerMixin],
	data() {
		return {
			songWait: !0,
			currentTime: 0,
			songInviald: !1, //歌曲无效
		}
	},
	computed: {
		mIconPlay() {
			return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
		},
		disable() {
			return this.playlist.length === 1 ? 'disable' : '';
		},
		percent() {
			return this.currentTime / this.currentSong.duration;
		},
		rotate() {
			return this.playing ? 'play' : '';
		},
		...mapGetters([
			'fullScreen',
			'playing',
			'currentIndex',
			'isRadio'
		])
	},
	watch: {
		playing(nV) {
			this.$nextTick(() => {
				let audio = this.$refs.audio;
				nV? audio.play(): audio.pause();
			})
		},
		'currentSong.url'(nV) {
			let audio = this.$refs.audio;
			this.$nextTick(() => {
				nV? audio.play(): audio.pause();
			});
			/*try{
				let {data} = await getLyc(this.currentSong.mid);
				let strLyric = Base64.decode(data);
				console.log(strLyric);
				/!*let newLyric = new LyricParse(strLyric, ({lineNum, txt})=> {
					console.log(lineNum);
					console.log(txt);
				});*!/
			} catch(e){

			}*/
		}
	},
	methods: {
		waiting() {
			this.songWait = !0;
		},
		ready() {
			this.songWait = !1;
			this.setPlayingState(!0);
		},
		updateTime(e) {
			this.currentTime = e.srcElement.currentTime;
		},
		error() {
			this.$toast('播放失败');
			this.songInviald = !0;
			this.songWait = !1;
			this.setPlayingState(!1);
			//this.next();
		},
		togglePlay() {
			if (this.songInviald) {
				this.$toast('当前歌曲失效');
				this.setPlayingState(!1);
				return;
			};
			this.setPlayingState(!this.playing);
		},
		next() {
			this.songInviald = !1;
			if (this.playlist.length === 1) {
				this.loop();
				return;
			};
			let index = this.currentIndex + 1;
			if (index === this.playlist.length) {
				index = 0;
			};
			this.setCurrentIndex(index);
			if (!this.playing) {
				this.setPlayingState(!0);
			};
		},
		prev() {
			this.songInviald = !1;
			if (this.playlist.length === 1) {
				this.loop();
				return;
			};
			let index = this.currentIndex - 1;
			if (index === -1) {
				index = this.playlist.length - 1;
			};
			this.setCurrentIndex(index);
			if (!this.playing) {
				this.setPlayingState(!0);
			};
		},
		end() { // 播放结束后
			if(this.isRadio) { // 单台处理方式
				if(this.currentIndex === this.playlist.length - 1) {
					return this.setRadioPlaying(!0);
				}
				return this.next();
			}
			if (this.mode === playMode.loop) {
				this.loop();
			} else {
				this.next();
			}
		},
		loop() { // 单曲循环
			if (this.songInviald) { // 如果当前歌曲错误就停止播放或者播放下一曲
				this.$toast('当前歌曲失效');
				if (this.playlist.length === 1) {
					this.setPlayingState(!1);
					return;
				} else {
					this.next()
				};
			};
			if (!this.playing) {
				this.setPlayingState(!0);
			} else {
				this.$refs.audio.currentTime = 0;
				this.$refs.audio.play();
			}
		},
		percentChange(percent) {
			let audio = this.$refs.audio;
			let currentTime = this.currentSong.duration * percent;
			audio.currentTime = currentTime;
			if (!this.playing) {
				this.setPlayingState(!0);
			};
		},
		formatTime(time) {
			time = time | 0;
			let min = time / 60 | 0;
			let sec = this._pad(time % 60);
			return `${min}:${sec}`;
		},
		_pad(num, n = 2) {
			let len = num.toString().length;
			while (len < n) {
				num = '0' + num;
				len++;
			};
			return num;
		},
		showPlaylist() { // 显示播放列表
			this.$refs.playlist.isShow(!0);
		},
		async downLyc(mid) {
			try{
				let {data} = await getLyc(mid);
				let strLyric = Base64.decode(data);
				let element = document.createElement('a');
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(strLyric));
				element.setAttribute('download', `${this.currentSong.singer} - ${this.currentSong.name}.lrc`);
				element.style.display = 'none';
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			} catch(e){

			}
		},
		imgError(song) {
			song.image = require('@/common/image/default.jpg')
		},
		...mapMutations({
			setFullScreen: 'SET_FULL_SCREEN',
			setRadioPlaying: 'SET_RADIO_PLAYING'
		}),
	}
}