import axios from 'axios';
import router from './router';

let defaults = {};

function setup(params, callback) {

  Object.assign(defaults, params);
  // 初始化所有请求的默认参数

  axios.defaults.baseURL = params.baseUrl;
  axios.defaults.withCredentials = true;
  axios.defaults.params = {
    // // 将sessionId 作为每一个请求的默认参数
    // sessionId: params.sessionId
  };

  initInterceptors();

  callback && callback();

}

function initInterceptors() {
  let CancelToken = axios.CancelToken;
  let source = CancelToken.source();

  //添加请求拦截器
  axios.interceptors.request.use((config) => {
    //在发送请求之前，加入 cancelToke，以备后续中止请求
    config.cancelToken = source.token;
    config.source = source;
    return config;
  }, (error) => {
    //请求错误时
    return Promise.reject(error);
  });

  //添加响应拦截器
  axios.interceptors.response.use((res) => {
    console.log(`url=${res.request.responseURL}`, res);
    //对响应数据进行判断用户是否有效
    if (res.data.code == -1) { // session过期
      res.config.source.cancel(`中止请求，原因：${res.data.message}`);
      router.push('/login');
      return Promise.reject(res.data.message);
    }
    return res;
  }, (error) => {
    //响应错误时
    location.reload()
    console.log('response error=', error);
    return Promise.reject(error);
  });
}

export default {
  setup,
  axios
};
