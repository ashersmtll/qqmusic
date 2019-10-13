import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import * as getters from './getters';
import * as actions from './actions';

Vue.use(Vuex);
let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
export default store;