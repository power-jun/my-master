// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import httpAdapter from 'httpAdapter'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base';

Vue.use(VueRouter);
Vue.use(ElementUI);

httpAdapter.setup({
  baseUrl: 'api'
});

Vue.prototype.$axios = httpAdapter.axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});