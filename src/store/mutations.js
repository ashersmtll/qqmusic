import * as types from './mutation-types';
export default {
  // 设置加载状态
  [types.SET_LOADING](state, bool) {
    state.loading = bool;
  },
  // 设置播放模式
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  // 播放顺序列表
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  // 设置当前播放索引
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  // 设置播放状态
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  // 设置全屏播放
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  // 设置播放列表
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  // 设置页面url
  [types.SET_SEND_NUM](state, num) {
    state.sendNum = num;
  },
  // 设置是否为电台播放
  [types.SET_ISRADIO](state, flag) {
    state.isRadio = flag;
  },
  // 当前电台列表播放结束
  [types.SET_RADIO_PLAYING](state, flag) {
    state.radioPlaying = flag;
  }
};