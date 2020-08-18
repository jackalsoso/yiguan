import Vue from 'vue'
// 在这里引入你所需的组件
import {
  List,PullRefresh,Swipe,SwipeItem,Checkbox, CheckboxGroup,Button,ImagePreview,Toast,Uploader,Image as VanImage,Loading
} from 'vant'

// 按需引入UI组件
Vue.use(List).use(PullRefresh).use(Swipe).use(SwipeItem).use(Checkbox)
.use(CheckboxGroup).use(Button).use(Uploader).use(VanImage).use(Loading)

Vue.prototype.$ImagePreview = ImagePreview;
Vue.prototype.$toast = Toast;









