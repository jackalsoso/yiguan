import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import 'lib-flexible'
import './plugins/vant'
import memberId from './utils/memberId'
import jxFace from './utils/jxFace'

Vue.prototype.$memberId = memberId;
Vue.prototype.$jxFace = jxFace;
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
