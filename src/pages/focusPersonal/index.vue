<template>
  <div class="content">
    <div class="search-warp" v-show="guanzhu == true">
      <div class="search">
        <div class="input ml" @click="$router.push('/search')">
          <img src="@/static/img/search.png" alt="" />
          <input type="text" placeholder="搜索作者" readonly />
        </div>
      </div>
    </div>

    <div class="author" v-for="v in 3" :key="v" v-show="guanzhu == true">
      <div class="name" @click="$router.push('/focusInfor')">
        <label>作者昵称</label>
        <span>
          <img src="@/static/img/yuedul.png" alt="" />
          135
        </span>
      </div>
      <span class="intro">贫穷的纠缠，坚强的意识...</span>
      <div class="box-img">
        <img
          @click="$router.push('/focusWorks')"
          class="animated fadeInLeft"
          src="@/static/img/item-1.jpeg"
          alt=""
          v-for="v in 3"
          :key="v"
        />
      </div>
    </div>
    <!-- xuke -->
    <div class="contentx">
    <div class="top animated fadeInDown" v-show="guanzhu == false">
      <div class="top_left">
        <div class="nicheng">
          <p
            style="font-size: 0.38rem;line-height:0.38rem;height:0.52rem;color:rgba(111,129,145,1);"
          >
            每个人都有快乐的时候，你呢？
          </p>
          <p style="font-size: 0.54rem;margin-bottom: 15px;font-weight:bold">
            作者昵称
          </p>
        </div>
        <div class="fenguan">
          <div class="fens" @touchstart="$router.push('/myFans')">
            <p style="font-size: 0.38rem;color:rgba(111,129,145,1);">粉丝</p>
            <p style="font-size: 0.38rem;color:black">135</p>
          </div>
          <div class="guanz" @touchstart="$router.push('/myFollow')">
            <p style="font-size: 0.38rem;color:rgba(111,129,145,1);">关注</p>
            <p style="font-size: 0.38rem;color:black">209</p>
          </div>
        </div>
      </div>
      <div class="top_right">
        <div class="right_main" @touchstart="$router.push('/dataEditing')">
          <div class="img">
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-show="guanzhu == false">
      <div class="main_top animated fadeInRight">
        <div @touchstart="$router.push('/myHistory')">
          <p class="main_txt">历史浏览</p>
          <div class="main_icon"></div>
        </div>
        <div @touchstart="$router.push('/myShen')">
          <p class="main_txt">审核进度</p>
          <div class="main_icon2"></div>
        </div>
        <div @touchstart="$router.push('/myHelp')">
          <p class="main_txt">帮助反馈</p>
          <div class="main_icon3"></div>
        </div>
        <div @touchstart="$router.push('/myOption')">
          <p class="main_txt">设置中心</p>
          <div class="main_icon4"></div>
        </div>
      </div>
      <div class="main_bottom">
        <div class="main_left">
          <div
            class="my_btn"
            @touchstart="mystart"
            @touchend="myend"
            v-if="myshow == false"
          >
            <p
              style="width:80%;height:80%;line-height: 98%;display: flex;justify-content: center;align-items: center;"
            >
              我的作品
            </p>
          </div>
          <div class="my_icon" v-if="myshow == false"></div>
          <div class="my_icon2" v-if="myshow == true"></div>
          <div
            class="my_btn2"
            @touchstart="mystart"
            @touchend="myend"
            v-if="myshow == true"
          >
            <p
              style="width:80%;height:80%;line-height: 98%;display: flex;justify-content: center;align-items: center;"
            >
              我喜欢的
            </p>
          </div>
        </div>
        <div class="main_right">
          <div class="right_icon2" @click="guanli"></div>
          <div class="right_icon animated zoomIn"></div>
        </div>
      </div>
    </div>
    <div class="list" id="list" v-show="guanzhu == false">
      <div></div>
      <div class="sudoku_row">
        <div
          class="sudoku_item "
          :class="curSelect == sudoku.id ? 'opacity' : ''"
          v-for="(sudoku, index) in sudokus"
          :key="index"
          @click="touchstart(index)"
        >
          <img :src="sudoku.img_src" class="animated zoomIn" />
          <img :src="sudoku.img_src2" class="animated zoomIn" />
          <img :src="sudoku.img_src3" class="animated zoomIn" />
          <img :src="sudoku.img_src4" class="animated zoomIn" />

          <p class="p1">
            {{ sudoku.name }}
          </p>
          <p class="p2">
            {{ sudoku.name2 }}
          </p>
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model="show"
      title="请选择管理管廊"
      style="height: 9rem;"
    >
      <div class="list_content">
        <!-- 内容 -->
        <div class="sheet_row">
          <div
            class="sheet_item "
            :class="curSelect == sheet.id ? 'sheet' : ''"
            v-for="(sheet, index) in sheets"
            :key="index"
          >
            <img :src="sheet.img_src" />
            <div
              class="checkbox"
              style="position: absolute;top:0.05rem;right:0;z-index:3;"
            >
              <van-checkbox v-model="checked"></van-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="sheet_btn">
        <van-checkbox v-model="checked"
          ><p style="color: #6EAAFF;">全选</p>
        </van-checkbox>
        <p>删除</p>
      </div>
    </van-action-sheet>
    </div>
    <!-- xuke -->
    <div class="focus-but">
      <span :class="{ active: isActive == 1 }" @click="changemenu">
        <!-- @click="$router.push('/focusInfor')" -->
        <img src="@/static/img/关注的人--黑色.png" alt="" />
        <i>关注</i>
      </span>
      <span :class="{ active: isActive == 2 }" @click="changemenu1">
        <img src="@/static/img/my-i.png" alt="" />
        <!-- @click="$router.push('/')" -->
        <i>我的</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "focusPersonal",
  data() {
    return {
      isActive: 2,
      guanzhu: false,
      //xuke
      checked: false,
      show: false,
      sudokus: [
        {
          id: 0,
          name: "夜景",
          name2: "Night View",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
          img_src2: require("../../static/icon/图片/夜景1.jpg"),
          img_src3: require("../../static/icon/图片/夜景1.jpg"),
          img_src4: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 1,
          name: "游戏",
          name2: "Night View",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
          img_src2: require("../../static/icon/图片/夜景1.jpg"),
          img_src3: require("../../static/icon/图片/夜景1.jpg"),
          img_src4: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 2,
          name: "音乐",
          name2: "Night View",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
          img_src2: require("../../static/icon/图片/夜景1.jpg"),
          img_src3: require("../../static/icon/图片/夜景1.jpg"),
          img_src4: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 3,
          name: "物流",
          name2: "Night View",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
          img_src2: require("../../static/icon/图片/夜景1.jpg"),
          img_src3: require("../../static/icon/图片/夜景1.jpg"),
          img_src4: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 4,
          name: "音乐",
          name2: "Night View",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
          img_src2: require("../../static/icon/图片/夜景1.jpg"),
          img_src3: require("../../static/icon/图片/夜景1.jpg"),
          img_src4: require("../../static/icon/图片/夜景1.jpg"),
        },
        // {
        //   id: 5,
        //   name: "物流",
        //   img_src: require("../../static/icon/图片/夜景1.jpg"),
        //   img_src2: require("../../static/icon/图片/夜景1.jpg"),
        //   img_src3: require("../../static/icon/图片/夜景1.jpg"),
        //   img_src4: require("../../static/icon/图片/夜景1.jpg")
        // }
        // {
        //   id: 4,
        //   name: "医院",
        //   img_src: require("../../static/icon/图片/夜景1.jpg")
        // },
        // {
        //   id: 5,
        //   name: "医院",
        //   img_src: require("../../static/icon/图片/夜景1.jpg")
        // },
        // {
        //   id: 6,
        //   name: "医院",
        //   img_src: require("../../static/icon/图片/夜景1.jpg")
        // },
        // {
        //   id: 7,
        //   name: "医院",
        //   img_src: require("../../static/icon/图片/夜景1.jpg")
        // },
        // {
        //   id: 8,
        //   name: "医院",
        //   img_src: require("../../static/icon/图片/夜景1.jpg")
        // },
        // {
        //   id: 9,
        //   name: "医院",
        //   img_src: require("../../static/icon/图片/夜景1.jpg")
        // },
        // {
        //   id: 10,
        //   name: "医院",
        //   img_src: require("../../static/icon/图片/夜景1.jpg")
        // }
      ],
      sheets: [
        {
          id: 0,
          name: "飞机",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 1,
          name: "游戏",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 2,
          name: "音乐",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 3,
          name: "物流",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 4,
          name: "医院",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 5,
          name: "医院",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 6,
          name: "医院",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        {
          id: 7,
          name: "医院",
          img_src: require("../../static/icon/图片/夜景1.jpg"),
        },
        // {
        //     id:8,
        //     name:'医院',
        //     img_src:require('../../static/icon/图片/夜景1.jpg')
        // },
        // {
        //     id:9,
        //     name:'医院',
        //     img_src:require('../../static/icon/图片/夜景1.jpg')
        // },{
        //     id:10,
        //     name:'医院',
        //     img_src:require('../../static/icon/图片/夜景1.jpg')
        // }
      ],
      // navbar: [
      //   {
      //     id: 0,
      //     name: "关注",
      //     icon: require("../../static/icon/关注的人--白色.png"), //hei
      //     icon2: require("../../static/icon/关注的人--黑色.png"), //bai
      //   },
      //   {
      //     id: 1,
      //     name: "我的",
      //     icon: require("../../static/icon/我的--白色.png"), //hei
      //     icon2: require("../../static/icon/我的--黑色.png"), //bai
      //   },
      // ],
      navbarindex: 1,
      curSelect: null,
      myshow: false,
      //xuke
    };
  },
  created() {},
  methods: {
    changemenu() {
      this.isActive = 1;
      this.guanzhu = true;
    },
    changemenu1() {
      this.isActive = 2;
      this.guanzhu = false;
    },
    //xuke
    guanli() {
      this.show = true;
    },
    mystart() {
      this.myshow = !this.myshow;
    },
    myend() {},
    navstart(e) {
      console.log(e);
      this.navbarindex = e;
    },
    navend() {},
    touchstart: function(e) {
      var that = this;
      var list = that.sudokus;
      for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == e) {
          that.curSelect = i;
        }
      }
    },
    //xuke
  },
};
</script>

<style lang="scss" scoped>
.active {
  background: #f2630d;
  color: #f2630d;
}
.content {
  padding-bottom: 70px;
  background-color: #f5f5f5;
  .ml {
    margin-left: 40px;
  }
  .author {
    margin-top: 6px;
    padding-bottom: 12px;
    background-color: #fff;
    .name {
      padding: 8px 15px;
      display: flex;
      align-items: center;
      label {
        font-size: 16px;
        color: #000;
        margin-right: 40px;
      }
      span {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #000;
        img {
          width: 21px;
          height: 13px;
          margin-right: 5px;
        }
      }
    }
    .intro {
      display: block;
      padding: 0 15px;
      font-size: 12px;
      color: #6f8191;
      margin-bottom: 20px;
    }
    .box-img {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 119px;
        height: 193px;
        border-radius: 10px;
        animation-duration: 1s;
        &:first-child {
          -webkit-animation-delay: 1s; //延迟
          animation-delay: 1s;
        }
        &:nth-child(2) {
          -webkit-animation-delay: 0.5s; //延迟
          animation-delay: 0.5s;
        }
      }
    }
  }
  .focus-but {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      i {
        font-size: 10px;
      }
      &:first-child {
        // background-color: #fff;
        img {
          width: 19px;
          height: 16px;
          margin-bottom: 2px;
        }
        i {
          color: #000;
        }
      }
      &:last-child {
        img {
          width: 15px;
          height: 16px;
          margin-bottom: 2px;
        }
        i {
          color: #000;
        }
      }
    }
  }
}
</style>
<style scoped>
/* 弹出框 */
.list_content {
  height: 80%;
  padding: 16px 16px 160px;
}
/* 弹出框按钮 */
.sheet_btn {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  color: #6eaaff;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  font-size: 0.36rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* 弹出框图片列表 */
.sheet_row {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}
.sheet_item {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.1rem;
  align-items: center;
  flex-direction: column;
  width: 25%;
  height: 2.5rem;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
}
.sheet {
  /* opacity: 0.4; */
  /* background: #e5e5e5; */
}
.sheet_item img {
  width: 100%;
  height: 100%;
  margin-bottom: 3px;
  display: block;
  border-radius: 0.2rem;
}
/* 列表4宫格 */
.sudoku_row {
  display: flex;
  /* align-items: center; */
  width: 100%;
  height: 13.3rem;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-content: flex-start;
}
.sudoku_item {
  display: flex;
  box-sizing: border-box;
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-direction: column; */
  /* width: 4.75rem; */
  height: 5.2rem;
  min-width: 4.975rem;
  padding: 0.15rem 0.05rem;
  max-width: 4.975rem;
  flex-wrap: wrap;
  /* align-items:flex-start; */
  justify-content: center;
  flex-direction: row;
  align-content: flex-start;
  font-size: 0.26rem;
}
.opacity {
  /* opacity: 0.4; */
  /* background: #e5e5e5; */
}
.sudoku_item img {
  width: 40%;
  height: 38%;
  min-width: 40%;
  max-width: 40%;
  margin-bottom: 3px;
  margin-left: 3px;
  display: block;
  box-sizing: border-box;
}
.sudoku_item :first-child {
  border-top-left-radius: 0.3rem;
}
.sudoku_item :nth-child(2) {
  border-top-right-radius: 0.3rem;
}
.sudoku_item :nth-child(3) {
  border-bottom-left-radius: 0.3rem;
}
.sudoku_item :nth-child(4) {
  border-bottom-right-radius: 0.3rem;
}
.p1 {
  margin-top: 3px;
  margin-left: 3px;
  width: 80%;
  height: 0.42rem;
  line-height: 0.42rem;
  display: block;
  font-size: 0.42rem;
  margin-bottom: 0.05rem;
  color: black;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
.p2 {
  margin-left: 3px;
  width: 80%;
  height: 0.36rem;
  display: block;
  font-size: 0.36rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(111, 129, 145, 1);
}
ul li {
  list-style: none;
}

.contentx {
  width: 100%;
  height: 20rem;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}

/* 头部 */
.top {
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(203, 210, 217, 1);
  border-top: none;
  border-radius: 0px 0px 0.65rem 0.65rem;
}

.top_left {
  width: 60%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 20px;
  float: left;
  /* background: black; */
  /* border-right: 1px solid rgba(203, 210, 217, 1); */
  /* border: 1px solid rgba(203, 210, 217, 1); */
  /* border-radius: 0px 0px 0.65rem 0.65rem; */
}

.top_right {
  width: 40%;
  height: 100%;
  float: right;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  /* padding-left: 20px; */
  /* background: black; */
  /* border-right: 1px solid rgba(203, 210, 217, 1); */
  /* border: 1px solid rgba(203, 210, 217, 1); */
  /* border-radius: 0px 0px 0.65rem 0.65rem; */
}

.right_main {
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.img {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background: url(../../static/icon/图片/头像6.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.icon {
  width: 0.5rem;
  height: 0.5rem;
  background: url(../../static/icon/编辑资料.png) no-repeat;
  background-size: 100% 100%;
}

.nicheng {
  width: 100%;
  height: 60%;
  box-sizing: border-box;
  padding-top: 0.2rem;
  display: flex;
  flex-direction: column-reverse;
  text-align: left;
}

.fenguan {
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  display: flex;
  /* justify-content: center; */
  flex-direction: row;
}

.fenguan div {
  width: 20%;
  height: 100%;
  box-sizing: border-box;
}

.fens {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column-reverse;
}

.guanz {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column-reverse;
}

/* 操作 */
.main {
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  /* border: 1px solid rgb(203, 210, 217); */
  /* border-radius: 0px 0px 2.65rem 2.65rem; */
}

.main_top {
  width: 100%;
  height: 60%;
  padding: 10px 0px 0 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
}

.main_top > div {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
}

.main_icon {
  width: 0.54rem;
  height: 0.54rem;
  background: url(../../static/icon/历史浏览.png) no-repeat;
  background-size: 100% 100%;
}

.main_icon2 {
  width: 0.54rem;
  height: 0.54rem;
  background: url(../../static/icon/审核进度.png) no-repeat;
  background-size: 100% 100%;
}

.main_icon3 {
  width: 0.54rem;
  height: 0.54rem;
  background: url(../../static/icon/帮助反馈.png) no-repeat;
  background-size: 100% 100%;
}

.main_icon4 {
  width: 0.54rem;
  height: 0.54rem;
  background: url(../../static/icon/设置中心.png) no-repeat;
  background-size: 100% 100%;
}

.main_txt {
  margin-top: 5px;
  font-size: 0.36rem;
  font-family: Microsoft YaHei;
}

.main_bottom {
  width: 100%;
  height: 40%;
  padding: 5px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.main_left {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.my_btn {
  width: 50%;
  height: 0.66rem;
  background: #f2630d;
  text-align: center;
  /* vertical-align: middle; */
  margin-right: 15px;
  font-size: 0.38rem;
  /* line-height:180%; */
  border-radius: 0.8rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my_btn2 {
  width: 50%;
  height: 0.66rem;
  background: #f2630d;
  text-align: center;
  /* vertical-align: middle; */
  margin-left: 15px;
  font-size: 0.38rem;
  /* line-height:180%; */
  border-radius: 0.8rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my_icon {
  width: 0.7rem;
  height: 0.66rem;
  background: url(../../static/icon/我喜欢的.png) no-repeat;
  background-size: 100% 100%;
}
.my_icon2 {
  width: 0.7rem;
  height: 0.66rem;
  background: url(../../static/icon/我的作品.png) no-repeat;
  background-size: 100% 100%;
}

.main_right {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.right_icon {
  width: 0.7rem;
  height: 0.66rem;
  background: url(../../static/icon/选择画廊.png) no-repeat;
  background-size: 100% 100%;
}

.right_icon2 {
  margin-right: 15px;
  width: 0.7rem;
  height: 0.6rem;
  background: url(../../static/icon/选择管理画廊.png) no-repeat;
  background-size: 100% 100%;
}

/* 图片列表*/
.list {
  width: 100%;
  height: 20rem;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  /* border: 1px solid rgb(203, 210, 217); */
}

/* 图片的滚动条 */
#list {
  width: 100%;
  height: 20rem;
  /* background: #eeeeee; */
  overflow: hidden;
  position: relative;
  /**transform: translate(0px, -70px);*/
}

#scoll {
  overflow: hidden;
}

#content2 {
  margin-top: 50px;
  width: 100%;
  height: 200px;
  background: red;
  overflow: hidden;
  position: relative;
  /**transform: translate(0px, -70px);*/
}

#scoll2 {
  overflow: hidden;
}

.scrollbars {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  width: 5px;
  border-radius: 5px;
}

.scollb {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  background: #999999;
  border-radius: 5px;
}

/* 图片的滚动条 */

/* 底部 */
.bottom {
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  border-top: 1px solid #cbd2d9;
  position: fixed;
  bottom: 0rem;
  left: 0;
  z-index: 2;
}

.bottom_ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* position: absolute; */
  /* top: -1px; */
}

.bottom_ul > li {
  width: 3.75rem;
  height: 100%;
  /* float: left; */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 0.32rem;
  position: relative;
}

.bottomcolor {
  background: #f2630d;
}

.bottomcolor2 {
  background: #ffffff;
}
</style>
