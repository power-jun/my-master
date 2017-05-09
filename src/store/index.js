import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './action';
import getters from './getters'

const state = {
  userInfo: '', //用户信息
  news: 'hahah'
}

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
