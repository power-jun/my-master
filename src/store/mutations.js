import RECORD_USERINFO from './mutation-types';

export default {
  [RECORD_USERINFO](state,info) {
    state.userInfo = info;
    console.log(info);
  },

  mutationName(state) {
    console.log(2222)
  }
}
