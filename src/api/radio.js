import ajax from './ajax.js';

export const getRadioList = () => {
	return ajax('/api/radioList');
}

export const getRadioSongLists = (id, current, size) => {
	return ajax('/api/getRadioSongList', {id, current, size});
}
