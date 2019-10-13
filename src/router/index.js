import Vue from 'vue';
import Router from 'vue-router';
import link from './link.js';
Vue.use(Router)
export default new Router({
	mode: 'history',
	base: '/',
	linkActiveClass: 'active-link',
	routes: (link => {
		let arr = [{path: '/', redirect: '/home' }];
		for(let k in link) {
			arr.push({
				path: link[k],
				name: k,
				component: () => import(`../views/${k}/${k}.vue`)
			});
		}
		return arr;
	})(link),
})
