import Vue from 'vue'
// 在这里引入你所需的组件
import {
  Toast,Loading
} from 'vant'

// 按需引入UI组件
Vue.use(Loading)

Vue.prototype.$toast = Toast;









