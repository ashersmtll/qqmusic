import {playMode} from '../common/js/config';
export default {
  sendNum: 0, // 页面请求url次数
  loading: !1, // 加载中
  mode: playMode.sequence, // 默认顺序
  sequenceList: [], // 播放顺序列表
  playlist: [], // 播放列表
  currentIndex: -1, // 当前播放索引
  playing: !1, // 播放状态
  fullScreen: !1, // 全屏播放
  isRadio: !1, // 电台播放
  radioPlaying: !1, // 电台播放
};