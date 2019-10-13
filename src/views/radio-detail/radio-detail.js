import { getRadioSongLists } from "../../api/radio.js";
import musicList from "../../components/music-list/music-list.vue";
import {getSession} from "../../common/js/cache.js";
import {createSong} from '../../common/js/songFactory.js';
import { getSongUrl } from "../../common/js/mixin.js";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	name: "radio-tetail",
	components: {
		musicList
	},
	mixins: [getSongUrl],
	data() {
		return {
			dissInfo: {radioName: '', radioImg: ''},
			songList: [],
		}
	},
	computed: {
		...mapGetters([
			'isRadio',
			'radioPlaying'
		])
	},
	watch: {
		radioPlaying(nV) {
			if(nV) {
				this.init(() => {
					this.setRadioPlaying(!1);
					this.setPlaylist(this.songList);
					this.setCurrentIndex(0);
				});
			}
		}
	},
	activated() {
		let {radioName, radioImg} = getSession('currentRadio');
		this.dissInfo = {radioName, radioImg};
		this.setRadio(!0);
		this.clearPlaylist();
		this.init();
	},
	methods: {
		async init(fn) {
			try{
				let {data: {track_list}} = await getRadioSongLists(this.$route.query.id);
				if(track_list) {
					let songs = [], songMid = [], types = [];
					track_list.forEach(item => {
						songMid.push(item.mid);
						types.push(0);
						songs.push(createSong(item))
					});
					let urlinfo = await this.songUrl({ids: songMid, types,});
					this.songList = urlinfo.length? songs.filter((item, index) => {
						item.url = urlinfo[index].purl;
						return !!item.url;
					}): [];
				} else {
					this.songList = [];
				}

			} catch(e){

			}
			fn && fn();
		},
		...mapMutations({
			setRadio: 'SET_ISRADIO',
			setRadioPlaying: 'SET_RADIO_PLAYING',
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlaylist: 'SET_PLAYLIST',
		}),
		...mapActions([
			'clearPlaylist'
		])
	},
	deactivated() {
		this.setRadio(!1);
		this.clearPlaylist();
		this.setRadioPlaying(!1);
	}
}