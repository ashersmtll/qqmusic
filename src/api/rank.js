import ajax from './ajax.js';

export const getAllRank = () => {
	let data = {
		"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}
	};
	return ajax('/api/getMusicUnit', data, 'POST');
}

export const getRankSongs = (id, total, time) => {
	let data = {
		"detail":{
			"module":"musicToplist.ToplistInfoServer",
			"method":"GetDetail",
			"param":{"topId":+id,"offset":0,"num":+total,"period":time}
		},
		"comm":{"ct":24,"cv":0}
	};
	return ajax('/api/getMusicUnit', data, 'POST');
}