import Vue from 'vue'
// 在这里引入你所需的组件
import {
  Toast,Loading,RadioGroup,Radio,Picker,Popup,Uploader,Progress,Button,ActionSheet,Checkbox,CheckboxGroup
} from 'vant'

// 按需引入UI组件
Vue.use(Loading).use(RadioGroup).use(Radio).use(Picker).use(Popup).use(Uploader).use(Progress).use(Button).use(ActionSheet).use(Checkbox).use(CheckboxGroup)

Vue.prototype.$toast = Toast;









