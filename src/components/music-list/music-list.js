import songList from '../song-list/song-list.vue';

import { mapActions, mapGetters, mapMutations } from 'vuex';
import { playMode } from "../../common/js/config";

export default {
	name: 'music-list',
	mixins: [],
	components: {songList},
	props: {
		songs: {type: Array, default: () => []},
		title: {type: String, default: ''},
		bgImage: {type: String, default: ''},
	},
	computed: {
		...mapGetters([
			'showPlayer',
			'isRadio',
			'radioPlaying'
		])
	},
	methods: {
		// 返回
		back(){
			this.$router.go(-1);
		},
		// 随机播放 全部
		randomAll() {
			let mode = this.isRadio? playMode.sequence: playMode.random;
			this.selectAllPlay({list: this.songs, mode});
		},
		reloadRadio() {
			this.setRadioPlaying(!0);
		},
		...mapActions([
			'selectAllPlay',
		]),
		...mapMutations({
			setRadioPlaying: 'SET_RADIO_PLAYING'
		}),
	},
};