<template>
  <div class="content">
    <div class="top">
      <img
        class="back"
        src="../../static/icon/返回箭头--黑色.png"
        alt=""
        @click="$router.back(-1)"
      />
      <div class="search">
        <p>审核进度</p>
      </div>
    </div>

    <div class="main">
      <van-tabs v-model="tabactive" swipeable color="#F2640E" @click="onClick">
        <van-tab title="审核中">
          <div class="name" v-for="(userInfo, index) in userarr" :key="index">
            <van-cell-group
              style="width:100%;height:100%;padding-top:0.2rem;display:flex;align-items:center;justify-content: space-between;"
            >
              <div class="usermsg">
                <div class="my_pic animated zoomIn">
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-top-left-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-top-right-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-bottom-left-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-bottom-right-radius: 0.1rem;"
                  />
                </div>
                <div class="msg_all">
                  <p style="height:40%;font-size: 0.34rem;font-weight: bold;">
                    {{ userInfo.name }}
                  </p>
                  <p style="height:60%;color:#708292;margin-top:0.1rem">
                    <span>提交时间： {{ userInfo.date }}</span>
                  </p>
                </div>
              </div>
              <div class="my_icon" @touchstart="icontouch(index)">
                <van-button disabled round plain type="info" color="#F2640E"
                  >审核中</van-button
                >
              </div>
            </van-cell-group>
          </div>
        </van-tab>
        <van-tab title="审核成功"
          ><div class="name" v-for="(userInfo, index) in userarr" :key="index">
            <van-cell-group
              style="width:100%;height:100%;padding-top:0.2rem;display:flex;align-items:center;justify-content: space-between;"
            >
              <div class="usermsg">
                <div class="my_pic animated rubberBand">
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-top-left-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-top-right-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-bottom-left-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-bottom-right-radius: 0.1rem;"
                  />
                </div>
                <div class="msg_all">
                  <p style="height:40%;font-size: 0.34rem;font-weight: bold;">
                    {{ userInfo.name }}
                  </p>
                  <p style="height:60%;color:#708292;margin-top:0.1rem">
                    <span>提交时间： {{ userInfo.date }}</span>
                  </p>
                </div>
              </div>
              <div class="my_icon" @touchstart="icontouch(index)">
                <van-button round type="info" color="#0BB01B">查看</van-button>
              </div>
            </van-cell-group>
          </div></van-tab
        >
        <van-tab title="审核失败"
          ><div class="name" v-for="(userInfo, index) in userarr" :key="index">
            <van-cell-group
              style="width:100%;height:100%;padding-top:0.2rem;display:flex;align-items:center;justify-content: space-between;"
            >
              <div class="usermsg">
                <div class="my_pic animated bounceIn">
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-top-left-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-top-right-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-bottom-left-radius: 0.1rem;"
                  />
                  <img
                    :src="userInfo.avatar"
                    alt="你的头像"
                    style="width: 0.5rem;height: 0.5rem;border-bottom-right-radius: 0.1rem;"
                  />
                </div>
                <div class="msg_all">
                  <p style="height:40%;font-size: 0.34rem;font-weight: bold;">
                    {{ userInfo.name }}
                  </p>
                  <p style="height:60%;color:#708292;margin-top:0.1rem">
                    <span>提交时间： {{ userInfo.date }}</span>
                  </p>
                </div>
              </div>
              <div class="my_iconerr" @touchstart="icontouch(index)">
                <van-button round type="info" color="#FF3C00" style="white-space: nowrap;font-size:0.24rem;"
                  >重新上传</van-button
                >
              </div>
            </van-cell-group>
          </div></van-tab
        >
      </van-tabs>
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
  Tab,
  Tabs
} from "vant";
export default {
  name: "myFans",
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
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
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
      //点赞，未点赞
      iconshow: true,
      tabactive: 0,
      userarr: [
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
          avatar: "../../static/icon/图片/头像6.png",
          avatar2: "../../static/icon/未点赞1.png",
          avatar3: "../../static/icon/点赞1.png",
          iconshow: true
        },
        {
          name: "作者昵称",
          fansnum: 80,
          works: 110,
          date: "04-21 14:36",
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
    },
    onClick(name, title, color) {
      console.log(name);
      console.log(color);
      console.log(title);
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
.van-tab--active {
  color: #f2640e;
  font-weight: 500;
}
.van-tabs__content {
  /* padding: 0.533333rem 0.4rem; */
  padding: 0.533333rem 0rem;
}
.van-button {
  height: 50%;
  width: 1.8rem;
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
  padding: 0.533333rem 0.4rem;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  font-size: 0.32rem;
  border-bottom: 5px solid #f7f7f7;
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
  height: 3rem;
  padding: 0.533333rem 0.4rem;
  box-sizing: border-box;
  margin-top: 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  border-bottom: 1px solid #ccc;
}
.right_main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.right_main img {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
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
  height: 2rem;
  /* padding: 0.533333rem 0.4rem; */
  padding: 0rem 0.4rem;
  margin-top: 1.5rem;
  box-sizing: border-box;
  font-size: 0.26rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.main > div {
  width: 100%;
  height: 1.2rem;
  box-sizing: border-box;
  /* border-bottom: 1px solid #ccc; */
  /* display: flex;
  align-items: center;
  justify-content: flex-start; */
}
.name {
  margin-bottom: 0.2rem;
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
  width: 1.8rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 1rem; */
  /* background: url(../../static/icon/未点赞1.png) no-repeat; */
  /* background-size: 100% 100%; */
  float: right;
}
.my_iconerr {
  width: 1.8rem;
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
  width: 1.7rem;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.usermsg {
  width: 5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.usermsg img {
  width: 40%;
  height: 38%;
  min-width: 40%;
  max-width: 40%;
  margin-bottom: 2px;
  margin-left: 2px;
  display: block;
  box-sizing: border-box;
}
.msg_all {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* display: flex; */
  /* align-items: flex-start; */
  /* justify-content: center; */
  margin-left: 0.1rem;
  /* padding-top: 0.2rem; */
}
</style>
