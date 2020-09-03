import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import 'lib-flexible'
import './plugins/vant'
import WebGL from '@/pages/webgl/index.vue'
import http from "./api/activity";

Vue.prototype.$http = http;

// import * as three from 'three'
// import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App, WebGL),
}).$mount('#app')
