import * as types from './mutation-types';
import {playMode} from '../common/js/config';
import _ from 'lodash/array.js';
import _c from 'lodash/collection.js';

// 播放全部 默认随机
export const selectAllPlay = ({commit, state}, {list, mode = playMode.random}) => {
  let oldList = [...state.playlist], oldSeqList = [...state.sequenceList];
  let currentIndex = state.currentIndex;
  let newList = _.differenceBy(list, oldList, 'id'); // 通过id 过滤重复歌曲
  commit(types.SET_PLAY_MODE, mode);
  if(mode === playMode.random) {
    commit(types.SET_SEQUENCE_LIST, _.concat(oldSeqList, newList));
    commit(types.SET_PLAYLIST, _.concat(oldList, _c.shuffle(newList)));
  } else {
    commit(types.SET_SEQUENCE_LIST, _.concat(oldSeqList, newList));
    commit(types.SET_PLAYLIST, _.concat(oldList, newList));
  }
  currentIndex === -1? commit(types.SET_CURRENT_INDEX, 0): '';
  commit(types.SET_FULL_SCREEN, !1);
};

// 删除歌曲
export const deleteSong = ({commit, state}, song) => {
  let playlist = [...state.playlist];
  let sequenceList = [...state.sequenceList];
  let currentIndex = state.currentIndex;
  let pIndex = _.findIndex(playlist, song);
  let sIndex = _.findIndex(sequenceList, song);
  playlist.splice(pIndex, 1);
  sequenceList.splice(sIndex, 1);
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--;
  };
  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_PLAYING_STATE, !!playlist.length);
};

// 清空播放列表
export const clearPlaylist = ({commit}) => {
  commit(types.SET_SEQUENCE_LIST, []);
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING_STATE, !1);
};

// 播放选中歌曲
export const playSelectSong = ({commit, state}, song) => {
  let playlist = [...state.playlist];
  let sequenceList = [...state.sequenceList];
  let index = _.findIndex(playlist, song);
  if(index !== -1) {
    commit(types.SET_CURRENT_INDEX, index);
  } else {
    index = playlist.push(song);
    sequenceList.push(song);
    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, index - 1);
  }
}

// 添加到播放列表
export const addSong = ({commit, state}, song) => {
  let playlist = [...state.playlist];
  let sequenceList = [...state.sequenceList];
  let currentIndex = state.currentIndex;
  let index = _.findIndex(playlist, song);
  if(index === -1) {
    playlist.push(song);
    sequenceList.push(song);
    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    currentIndex === -1?commit(types.SET_CURRENT_INDEX, 0): '';
  }
}