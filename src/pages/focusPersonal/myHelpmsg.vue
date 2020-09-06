<template>
  <div class="content">
    <div class="top">
      <img
        class="back"
        src="../../static/icon/返回箭头--黑色.png"
        alt=""
        @click="$router.back(-1)"
      />
      <!-- <div class="search">
        <p>帮助反馈</p>
      </div>

      <img
        src="../../static/icon/反馈.png"
        alt=""
        @click="$router.back(-1)"
      /> -->
    </div>
    <div class="top_right">
      <div class="right_main animated fadeInRight">
        <div class="right_btit">登录遇到故障问题</div>
        <div class="right_date">创建于2020-07-19 15：40</div>
      </div>
      <div class="right_icon">
        <img
          src="../../static/icon/点赞--点亮.png"
          alt=""
          v-if="iconshow == true"
          @click="iconshow = false"
          class="animated zoomIn"
        />
        <img
          src="../../static/icon/点赞--未点亮.png"
          alt=""
          v-else
          @click="iconshow = true"
        />
      </div>
    </div>
    <div class="main">
      <div class="help_tit" v-for="(item,index) in 3" :key="index">
        <p style="font-size:0.28rem;color:#010101">
          1.使用第三方登录，不知道/忘记密码
        </p>
        <p class=" animated fadeInUp" >
            <!-- van-multi-ellipsis--l6 -->
          可能您一直使用第三方账号登录，忘记了自己的登录密码。此时请先确认您的绑定邮箱信息【点击查看】:该绑定邮箱我可以登录:这种情况请退出登录，并执行本文第一步“找回密码”流程;该绑定邮箱无法登录:这种情况请确认您当前的状态处于登陆状态，并执行以下操作:私信http://huabanpro.com/huaban，私信内容:修改邮箱+私信http://huabanpro.com/huaban，私信内容:修改邮箱+,那么请发送以下私信内容;
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Field,
  DatetimePicker,
  DropdownMenu,
  DropdownItem,
  Cell,
  CellGroup,
  Popup,
  Uploader,
  ActionSheet,
  Button,
  Search
} from "vant";
export default {
  name: "myHelpmsg",
  components: {
    // [Button.name]: Button,
    // [Loading.name]: Loading
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Search.name]: Search
    // [Grid.name]: Grid,
    // [GridItem.name]: GridItem,
    // [VanImage.name]: VanImage,
    // [Checkbox.name]: Checkbox,
    // [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      userInfo: {
        avatar: "../../static/icon/图片/头像6.png",
        avatar2: "../../static/icon/未点赞1.png",
        avatar3: "../../static/icon/点赞1.png"
      },
      searchvalue: "",
      //点赞，未点赞
      iconshow: true,
      userarr: [
        {
          name: "可以一次上传/收藏多少张图片吗？",
          fansnum: 80,
          works: 110,
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "上传的作品可以商业用途吗？",
          fansnum: 80,
          works: 110,
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "登录遇到了故障？",
          fansnum: 80,
          works: 110,
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "我的账户问题。冻结/禁用？",
          fansnum: 80,
          works: 110,
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        }
      ]
    };
  },
  methods: {
    icontouch(index) {
      this.userarr[index].iconshow = !this.userarr[index].iconshow;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.sex > .van-dropdown-menu > .van-dropdown-menu__bar {
  box-shadow: none !important;
}
/* .van-cell::after{
        border: 0 solid #ffffff !important; 
} */
/* .name > .van-cell-group{
    
} */
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.van-cell::after {
  border: none;
}
.van-field__body {
  width: 85%;
}
.van-field__word-limit {
  position: absolute;
  right: 0;
  top: 0;
}
.van-field__left-icon {
  margin-right: 4px;
  margin-left: 0.2rem;
}
.van-cell {
  border: 1px solid #000;
  border-radius: 1rem;
}
</style>
<style scoped>
.content {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
  /* display: flex; */
  /* justify-content: flex-end; */
}
.top {
  width: 100%;
  height: auto;
  padding: 0.533333rem 0.4rem 0 0.4rem;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  font-size: 0.32rem;
  /* border-bottom: 5px solid #f7f7f7; */
}
.search {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top_right {
  width: 100%;
  height: 1.3rem;
  padding: 0.233333rem 0.4rem 0 0.4rem;
  box-sizing: border-box;
  margin-top: 1.1rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  /* border-bottom: 1px solid #ccc; */
}
.right_main {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
}
.right_btit {
  width: 100%;
  height: 60%;
  font-size: 0.32rem;
  font-weight: bold;
}
.right_date {
  width: 100%;
  height: 40%;
  font-size: 0.22rem;
}
.right_main img {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
}
.right_icon {
  width: 10%;
  height: 100%;
  padding-top: 0.1rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.img {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background: url(../../static/icon/图片/头像6.png);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.icon {
  position: absolute;
  top: 35%;
  left: 39%;
  width: 0.5rem;
  height: 0.5rem;
  background: url(../../static/icon/替换头像.png) no-repeat;
  background-size: 100%;
}
.main {
  width: 100%;
  height: 1rem;
  padding: 0.233333rem 0.4rem;
  /* margin-top: 1.5rem; */
  box-sizing: border-box;
  font-size: 0.26rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.main > .name {
  width: 100%;
  height: 0.8rem;
  box-sizing: border-box;
  font-size: 0.24rem;
  color: #3e424a;
  /* border-bottom: 1px solid #ccc; */
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
}
.name img {
  /* float: right; */
}
/* .main > div > p {
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 16px;
  float: left;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
} */
/* 底部 */
.bottom {
  width: 100%;
  height: 8%;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  /* border-top: 1px solid #cbd2d9; */
  position: fixed;
  bottom: 0.5rem;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.my_icon {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 1rem; */
  /* background: url(../../static/icon/未点赞1.png) no-repeat; */
  /* background-size: 100% 100%; */
  float: right;
}
.my_pic {
  width: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.usermsg {
  width: 5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.msg_all {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* display: flex; */
  /* align-items: flex-start; */
  /* justify-content: center; */
  margin-left: 0.5rem;
  padding-top: 0.2rem;
}
.help_tit {
  width: 100%;
  height: 3.5rem;
  /* border: 1px solid #000000; */
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
  margin-bottom: 0.1rem;
}
</style>
