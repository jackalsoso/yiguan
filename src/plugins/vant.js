import Vue from 'vue'
// 在这里引入你所需的组件
import {
  Toast,Loading,RadioGroup,Radio,Picker,Popup,Uploader,Progress
} from 'vant'

// 按需引入UI组件
Vue.use(Loading).use(RadioGroup).use(Radio).use(Picker).use(Popup).use(Uploader).use(Progress)

Vue.prototype.$toast = Toast;









