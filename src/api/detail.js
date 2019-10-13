import ajax from './ajax.js';

export const getMusicListById = (id) => {
	let sendList = {type:1, json:1, utf8:1, onlysong:0, new_format:1};
	return ajax('/api/getCdList', {...sendList, disstid: id});
}

export const getDissListByTag = (data) => ajax('/api/getDissListByTag', data);
