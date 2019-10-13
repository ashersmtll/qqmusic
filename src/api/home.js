import ajax from './ajax.js';

export const getHomeData = () => {
	let send = {
		"comm": {
			"ct": 24
		},
		"playlist": {
			"module": "playlist.PlayListPlazaServer",
			"method": "get_playlist_by_category",
			"param": {
				"id": 3056, "curPage": 1, "size": 21, "order": 5, "titleid": 3056
			}
		},
		"toplist": {
			"module": "musicToplist.ToplistInfoServer",
			"method": "GetDetail",
			"param": {
				"topId": 62, "offset": 0, "num": 12
			}
		},
	}
	return ajax('/api/getMusicUnit', send, 'POST');
}