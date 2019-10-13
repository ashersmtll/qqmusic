import {getHotKey, getSearchLists, getSongInfo} from "../../api/search.js";
import {setSession, getSession} from "../../common/js/cache.js";
import _c from 'lodash/collection.js';
import _ from 'lodash/array.js';
import { getSongUrl } from "../../common/js/mixin.js";
import { createSong } from "../../common/js/songFactory.js";
import { mapGetters } from "vuex";
import songList from "../../components/song-list/song-list.vue";

export default {
	name: 'search',
    components: {songList},
    mixins: [getSongUrl],
	data() {
		return {
			query: '',
			placeholder: '输入歌曲、歌手。完成点击左侧放大镜',
            hotKeys: [],
            songList: [],
		}
	},
    computed: {
        ...mapGetters(['showPlayer'])
    },
    activated() {
	    let hotkey = getSession('hotKeys');
	    this.hotKeys = !!hotkey? _c.sampleSize(hotkey, 10): this.getHotKey();
    },
	methods: {
		clear() {
			this.query = '';
		},
        addKey(key) {
            this.getSearch(key);
        },
		async getHotKey() { // 获取热搜词
		    try{
                let {data: {hotkey}} = await getHotKey();
                if(!!hotkey) {
                    this.hotKeys = _c.sampleSize(hotkey, 10);
                    setSession('hotKeys', hotkey);
                }
            }catch(e){

            }
		},
		submitSearch() {
			let key = this.query.trim();
			if(!key) return this.$toast('您输入的内容为空');
			this.getSearch(key);
		},
        async getSearch(key) {
            let {data: {song}} = await getSearchLists(key);
            if(!!song && song.list) {
                let songs = [], songMid = [], types = [];
                song.list.forEach(item => {
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
        },
	}
};