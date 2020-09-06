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
        <p>帮助反馈</p>
      </div>

      <img
        src="../../static/icon/反馈.png"
        alt=""
        @click="$router.push('/myOpinion')"
      />
    </div>
    <div class="top_right">
      <div class="right_main">
        <van-search
          shape="round"
          v-model="searchvalue"
          placeholder="请搜索你需要查找的问题"
          style="width:100%;"
        />
      </div>
      <div></div>
    </div>
    <div class="main">
      <div class="help_tit">
        <img
          class="back"
          src="../../static/icon/常见问题.png"
          alt=""
          @click="$router.back(-1)"
        />
        <p
          style="font-size:0.28rem;font-weight:bold;margin-left:0.3rem;color:#010101"
        >
          常见问题
        </p>
      </div>
      <div class="name" v-for="(userInfo, index) in userarr" :key="index" @touchstart="$router.push('/myHelpmsg')">
        <div style="height:100%;float:left;display: flex;
  align-items: center;
  justify-content: center;">
          <span>{{ index + 1 }}.</span>
          <span>{{ userInfo.name }}</span>
        </div>
        <div
          style="width:1rem;height:100%;float:right;display: flex;
  align-items: center;
  justify-content: center;"
   
        >
          <img
            style="width:0.2rem;height:0.3rem;"
            src="../../static/icon/查看.png"
            alt=""
          />
        </div>
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
  name: "myHelp",
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
        },
        
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
  height: 1rem;
  padding: 0.533333rem 0.4rem;
  box-sizing: border-box;
  margin-top: 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  /* border-bottom: 1px solid #ccc; */
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
  padding: 0.233333rem 0.4rem;
  /* margin-top: 1.5rem; */
  box-sizing: border-box;
  font-size: 0.26rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.main > .name {
  width: 100%;
  height: 0.8rem;
  box-sizing: border-box;
  font-size: 0.24rem;
  color:#3E424A;
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
  height: 0.5rem;
  /* border: 1px solid #000000; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.3rem;
}
</style>
