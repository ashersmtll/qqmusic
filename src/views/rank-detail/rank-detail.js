import musicList from '../../components/music-list/music-list.vue';
import {getRankSongs} from '../../api/rank.js';
import {createSong} from '../../common/js/songFactory.js';
import { getSongUrl } from "../../common/js/mixin.js";

export default {
	name: "rank-detail",
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
			let {id, num, time} = this.$route.query;
			try{
				let {detail: {data: {data, songInfoList}}} = await getRankSongs(id, num, time);
				this.dissInfo = {title: `${data.titleShare} - ${data.updateTips}`, logo: data.frontPicUrl, id: data.topId};
				let songs = [], songMid = [], types = [];
				songInfoList.forEach(item => {
					songMid.push(item.mid);
					types.push(0);
					songs.push(createSong(item))
				});
				let urlinfo = await this.songUrl({ids: songMid, types});
				this.songList = urlinfo.length? songs.filter((item, index) => {
					item.url = urlinfo[index].purl;
					return !!item.url;
				}): [];
			}catch(e){

			}
		},
	}
}