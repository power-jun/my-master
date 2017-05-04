import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'

import router from '../../Router'
import App from '../../App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)
// Vue.use(VueResource)

new Vue({
 el: '#app',
 router,
 render: h => h(App)
})
