import {mapGetters, mapMutations, mapActions} from 'vuex';
import {playMode} from './config.js';
import { getSongUrlByMid } from "../../api/getSongUrl.js";

// player playlist组件 共用
export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
    },
    ...mapGetters([
      'mode',
      'sequenceList',
      'currentSong',
      'playlist',
    ])
  },
  methods: {
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE'
    }),
  }
};

// 递归 批量获取歌曲播放地址
export const getSongUrl = {
  methods: {
    async songUrl(sendData, isLoading) {
      try{
        let {url_mid: {data}} = await getSongUrlByMid(sendData, isLoading);
        if(!data.retcode) {
          return data.midurlinfo;
        } else {
          return this.songUrl(sendData, isLoading);
        }
      } catch(e){
      }
    }
  }
}
