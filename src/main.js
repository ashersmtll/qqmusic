import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'babel-polyfill';
import './common/css/index.styl';

import fastclick from 'fastclick'; // 消除移动端点击延迟
import VueLazyLoad from 'vue-lazyload';
import LINK from './router/link.js';
import Toast from './base/toast/index.js';
import Confirm from './base/confirm/index.js';
import VueScroller from 'vue-scroller';

Vue.config.productionTip = false;
Vue.prototype.LINK = LINK;

fastclick.attach(document.body);
Vue.use(Toast);
Vue.use(Confirm);
Vue.use(VueScroller);
Vue.use(VueLazyLoad, {loading: require('./common/image/default.jpg')});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
