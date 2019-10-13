let express = require('express');
let compression = require('compression');
let axios  = require('axios');
let bodyParser = require('body-parser');
let history = require('connect-history-api-fallback');
let cookie = require('cookie-parser');

let port = 80;
let app = express();

let apiRoutes = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookie());

let link = require('./link.js');

let defData = {
	format: 'json', inCharset: 'utf8', outCharset: 'utf-8', notice: 0, platform: 'yqq.json', g_tk: 5381,
	loginUin: 0, hostUin: 0, needNewCode: 0
};
let err = {code: 1, data: null, message: '参数错误'};

// 获取歌曲列表 通用API
app.post('/api/getMusicUnit', function(req, res) {
	const url = link.musicu;
	defData.data = req.body;
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com'
		},
		params: defData
	}).then((response) => {
		let {data} = response;
		res.json(data)
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
});

// 通过标签id 获取歌单列表
// 获取电台列表
app.get('/api/getDissListByTag', (req, res) => {
	let url = link.getdisslist;
	let {id, start, end, sortId} = req.query;
	let otherData = {picmid: 1, rnd: Math.random(), categoryId: +id, sortId: +sortId, sin: +start, ein: +end};
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/portal/playlist.html', //https://y.qq.com/portal/player_radio.html
			origin: 'https://y.qq.com'
		},
		params: {...defData, ...otherData}
	}).then((response) => {
		let {data} = response;
		res.json(data);
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
});

// 通过歌单tid 获取歌单列表
// 歌单详情数据
app.get('/api/getCdList', function (req, res) {
	axios.get(link.getcdinfo, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com',
			host: 'c.y.qq.com'
		},
		params: {...defData, ...req.query}
	}).then((response) => {
		let {data} = response;
		res.json(data)
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
})

// 获取电台列表
app.get('/api/radioList', (req, res) => {
	let url = link.radiolist;
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/', //https://y.qq.com/portal/player_radio.html
			origin: 'https://y.qq.com'
		},
		params: {...defData, ...req.query}
	}).then((response) => {
		let data = response.data.data.data;
		res.json({code: 0, data, message: ''});
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
});

// 根据电台列表 id 获取对应的 歌曲列表
app.get('/api/getRadioSongList', function(req, res) {
	const url = link.musicu;
	let {id, current, size} = req.query;
	defData.data = {
		songlist: {
			module: 'pf.radiosvr',
			method: 'GetRadiosonglist',
			param: {id: +id, firstplay: current || 1, num: size || 10}
		},
		comm: {ct: 24, cv: 0}
	}
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com'
		},
		params: defData
	}).then((response) => {
		let data = response.data.songlist.data;
		res.json({code: 0, data, message: ''})
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
})

// 获取歌曲详情
app.get('/api/getSongInfo', function(req, res) {
	const url = link.songinfo;
	let {id} = req.query;
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com'
		},
		params: {...defData, albummid: id}
	}).then((response) => {
		let data = response.data.data;
		res.json({code: 0, data, message: ''})
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
})

// 获取歌曲url 通过id
app.post('/api/getSongUrl', function(req, res) {
	const url = link.musicu;
	let {data} = req.body;
	defData.data = data;
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com'
		},
		params: defData
	}).then((response) => {
		if(response.data.code === 0) {
			res.json(response.data);
		} else {
			res.status(response.data.code);
			res.json(err)
		}
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
});

// 获取歌词
app.get('/api/getLic', function(req, res) {
	const url = link.lyric;
	let {id, t} = req.query;
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com',
			host: 'c.y.qq.com'
		},
		params: {...defData, pcachetime: new Date().getTime() + +t, songmid: id}
	}).then((response) => {
		let data = response.data.lyric;
		res.json({code: 0, data, message: ''});
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
})

// 搜索
app.get('/api/getSearch', function(req, res) {
	const url = link.searchUrl;
	let other = {
		w: req.query.key,
		ct:24,
		qqmusic_ver:1298,
		new_json:1,
		remoteplace:'txt.yqq.song',
		searchid:65955162781107780,
		t:0,
		aggr:1,
		cr:1,
		catZhida:1,
		lossless:0,
		flag_qc:0,
		p:1,
		n:10
	};
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com'
		},
		params: {...defData, ...other}
	}).then((response) => {
		let data = response.data.data;
		res.json({code: 0, data, message: ''})
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
})

// 热门关键词
app.get('/api/getHotKey', function(req, res) {
	const url = link.hotKey;
	axios.get(url, {
		headers: {
			referer: 'https://y.qq.com/',
			origin: 'https://y.qq.com'
		},
		params: defData
	}).then((response) => {
		let data = response.data.data;
		res.json({code: 0, data, message: ''})
	}).catch(() => {
		res.status(400);
		res.json(err)
	})
})

app.use(history());
app.use('/api', apiRoutes)
app.use(compression()) // response压缩
app.use(express.static('./dist')) // 静态资源目录

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
})