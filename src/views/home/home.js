import {getHomeData} from '../../api/home.js';
import {picurl} from '../../common/js/utils.js';
import {createSong} from '../../common/js/songFactory.js';
import { getSongUrl } from "../../common/js/mixin.js";
import { mapActions } from "vuex";
import {getSession, setSession} from "../../common/js/cache.js";

export default {
	name: "home",
	mixins: [getSongUrl],
	data() {
		let homeData = getSession('homeData') || {toplist: [], playList: []};
		return {
			picurl,
			toplist: homeData.toplist, // 歌曲飙升榜
			playList: homeData.playList, // 网络歌曲 歌单
		}
	},
	activated() {
		!this.playList.length && this.init();
	},
	methods: {
		async init() {
			try{
				let res = await getHomeData();
				let {playlist: {data: {v_playlist}}, toplist: {data: {songInfoList}}} = res, songs = [], songMid = [], types = [];
				this.playList = v_playlist;
				songInfoList.forEach(item => {
					songMid.push(item.mid);
					types.push(0);
					songs.push(createSong(item))
				});
				let urlinfo = await this.songUrl({ids: songMid, types,}, !1);
				this.toplist = urlinfo.length? songs.filter((item, index) => {
					item.url = urlinfo[index].purl;
					return !!item.url;
				}): [];
				setSession('homeData', {toplist: this.toplist, playList: this.playList});
			}catch(e){

			}
		},
		goto(item) {
			this.$router.push({path: this.LINK.detail, query: {id: item.tid}})
		},
		...mapActions(['addSong'])
	}
}