// 获取图片
export function picurl(album_mid) {
  return album_mid? `//y.gtimg.cn/music/photo_new/T002R300x300M000${album_mid}.jpg?max_age=2592000`: '';
}