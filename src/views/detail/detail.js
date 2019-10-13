import musicList from '../../components/music-list/music-list.vue';

import {getMusicListById} from '../../api/detail.js';
import {createSong} from '../../common/js/songFactory.js';
import { getSongUrl } from "../../common/js/mixin.js";

export default {
	name: "detail",
	components: {
		musicList
	},
	mixins: [getSongUrl],
	data() {
		return {
			dissInfo: {dissname: '', logo: '', disstid: ''}, // 歌单名字 pic disstid
			songList: [], // 歌曲列表
		}
	},
	activated() {
		this.init();
	},
	methods: {
		async init() {
			if(!this.$route.query.id) return this.$toast('参数错误');
			let {cdlist} = await getMusicListById(this.$route.query.id);
			let {dissname, logo, disstid, songlist} = cdlist[0], songs = [], songMid = [], types = [];
			this.dissInfo = {dissname, logo, disstid};
			songlist.forEach(item => {
				songMid.push(item.mid);
				types.push(0);
				songs.push(createSong(item))
			});
			let urlinfo = await this.songUrl({ids: songMid, types,});
			this.songList = urlinfo.length? songs.filter((item, index) => {
				item.url = urlinfo[index].purl;
				return !!item.url;
			}): [];
		},
	}
}