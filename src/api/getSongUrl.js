import ajax from "./ajax.js";

export const getSongUrlByMid = (data, isLoading) => {
	let sendData = {
		"comm":{"ct":23,"cv":0},
		"url_mid":{
			"module":"vkey.GetVkeyServer",
			"method":"CgiGetVkey",
			"param":{"guid":"2834200800", "songmid":data.ids,"songtype":data.types,"uin":"0","loginflag":0,"platform":"23"}
		}
	}
	return ajax('/api/getSongUrl', {data: sendData}, 'POST', isLoading);
}

// guid生成规则
function getGuid() {
	let  t = (new Date()).getUTCMilliseconds();
	return Math.round(2147483647 * Math.random()) * t % 1e10;
}