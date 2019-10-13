import {picurl} from './utils.js';

export class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id; // 歌曲id
    this.mid = mid; // 歌曲mid
    this.singer = singer; //歌手
    this.name = name; // 歌曲名字
    this.album = album; // 专辑信息 {id, mid, name, subtitle, title}
    this.duration = duration; // 播放时间 秒
    this.image = image; // 歌曲图片
    this.url = url; // 播放链接
  }
};

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: _normalizeSinger(musicData.singer),
    name: musicData.name,
    album: {...musicData.album},
    duration: musicData.interval,
    image: picurl(musicData.album && musicData.album.mid),
    url: '',
  });
};

function _normalizeSinger(singer) {
  if (!singer || !Array.isArray(singer)) return;
  let ret = [];
  singer.forEach((item) => {
    ret.push(item.name);
  });
  return ret.join('/');
};