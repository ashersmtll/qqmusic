export default {
	name: 'tab',
	data(){
		let LINK = this.LINK;
		return {
			tabs: [
				{name: '首页', url: LINK.home},
				{name: '排行', url: LINK.rank},
				{name: '电台', url: LINK.radio},
				// {name: '歌手', url: LINK.singer},
				{name: '歌单', url: LINK.playlist},
				{name: '搜索', url: LINK.search},
			],
		}
	}
};