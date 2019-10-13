/*
* qq音乐 api 接口
* */
module.exports = {
	// 电台列表
	radiolist: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg',

	// 根据电台列表 获取对应歌曲 带分页
	musicu: 'https://u.y.qq.com/cgi-bin/musicu.fcg',

	// 根据歌曲 albummid 获取歌曲详情
	songinfo: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',

	// 根据歌单tid 获取歌单歌曲列表
	getcdinfo: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',

	// 根据分类tag id 获取对应歌单
	getdisslist: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',

	// 获取歌词
	lyric: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',

	// 搜索接口
	searchUrl: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
	// searchUrl: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',

	// 热门关键词
	hotKey: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
};