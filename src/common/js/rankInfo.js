//排行榜对象

export class RankInfo {
	constructor({title, titleShare, topId, updateTips, picUrl, totalNum, song, time}) {
		this.title = title; // 标题
		this.titleShare = titleShare; // 详细标题
		this.id = topId; // 榜单ID
		this.tips = updateTips; // 更新频率文字
		this.picUrl = picUrl; // 图片
		this.totalNum = totalNum // 歌曲总数
		this.song = song;
		this.time = time;
	}
};

export function createRankInfo(data) {
	return new RankInfo({
		title: data.title,
		titleShare: data.titleShare,
		topId: data.topId,
		updateTips: data.updateTips,
		picUrl: data.frontPicUrl,
		totalNum: data.totalNum,
		song: data.song,
		time: data.period,
	});
}