import axios from 'axios';
import store from '../store/index.js';
import Vue from 'vue';

export default function ajax(url = '', params = {}, type = 'GET', loading = !0){
	let promise;
	return new Promise((resolve, reject)=>{
		let sendNum = store.getters.getSendNum;
		loading && store.commit('SET_SEND_NUM', ++sendNum);
		loading && store.commit('SET_LOADING', loading);
		if(type === 'GET'){
			promise = axios.get(url, {params: params});
		}else if(type === 'POST'){
			promise = axios.post(url, params);
		}
		promise.then(res => {
			let {data} = res;
			if(data.code === 0){
				resolve(data);
			} else {
				Vue.prototype.$toast('请求太快，请稍后重试');
				reject();
			}
		}).catch(err => {
			Vue.prototype.$toast('请求错误请刷新页面');
			reject(err);
		}).finally(() => {
			let sendNum = store.getters.getSendNum;
			loading && store.commit('SET_SEND_NUM', --sendNum);
			loading && store.commit('SET_LOADING', !!sendNum);
		})
	});
}