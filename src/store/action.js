import RECORD_USERINFO from './mutation-types';

export default {
  async getUserInfo({commit, state}) {
    await new Promise((resolve) => {setTimeout(resolve, 1000)});
    let res = {name: 'xjchen', age: 27};
    commit(RECORD_USERINFO, res);
  }
}
