export class DissName {
	constructor({name, imgurl, dissid, listennum, creator}) {
		this.name =  name; // 歌单名字
		this.imgurl =  imgurl; // 歌单图片
		this.dissid =  dissid; // 歌单id
		this.listennum =  listennum; // 收听量
		this.creator =  creator; // 创建者
	}
};

export function createDissName(data) {
	return new DissName({
		name: data.dissname,
		imgurl: data.imgurl,
		dissid: data.dissid,
		listennum: data.listennum,
		creator: data.creator && data.creator.name
	})
}