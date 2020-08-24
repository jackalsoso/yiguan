import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import 'lib-flexible'
import './plugins/vant'
// import * as three from 'three'
// import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
