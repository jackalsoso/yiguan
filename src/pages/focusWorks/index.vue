<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <img
          class="back"
          src="@/static/img/back-icon2.png"
          alt=""
          @click="$router.back(-1)"
        />
        <i class="name">
          作者昵称
          <img src="@/static/img/zan-1.png" alt="" />
        </i>
        <span class="share" @click="showPicker = true">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
    <webgl
      style="width: 100%; height: 100%; position: absolute;top:0; z-index: 1000;"
      ref="webgl"
      :sceneLoad="addpic"
    ></webgl>
    <van-popup v-model="showPicker" round position="bottom">
      <label class="share-tit">分享至</label>
      <div class="wrap">
        <div class="share-type">
          <span>
            <img src="@/static/img/zhanneihy.png" alt="" />
            <i>站内好友</i>
          </span>
          <span>
            <img src="@/static/img/wechat.png" alt="" />
            <i>微信好友</i>
          </span>
          <span>
            <img src="@/static/img/friend.png" alt="" />
            <i>朋友圈</i>
          </span>
        </div>
      </div>
      <div class="share-type more">
        <span>
          <img src="@/static/img/copy-1.png" alt="" />
          <i>复制链接</i>
        </span>
        <span>
          <img src="@/static/img/more-1.png" alt="" />
          <i>更多</i>
        </span>
      </div>
      <div class="cancel" @click="showPicker = false">取消</div>
    </van-popup>
  </div>
</template>

<script>
import webgl from "../webgl/index";
export default {
  name: "focusWorks",
  components: {
    webgl,
  },
  data() {
    return {
      showPicker: false,
    };
  },
  created() {},
  methods: {
    choose(i) {
      this.checkIndex = i;
    },
    addpic() {
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/01.jpg",
        type: "0",
        index: "023",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/1.jpg",
        type: "0",
        index: "022",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/2.jpg",
        type: "0",
        index: "021",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/3.jpg",
        type: "0",
        index: "020",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/4.jpg",
        type: "0",
        index: "019",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/5.jpg",
        type: "0",
        index: "018",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/6.jpg",
        type: "0",
        index: "017",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/7.jpg",
        type: "0",
        index: "016",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/8.jpg",
        type: "0",
        index: "015",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/9.jpg",
        type: "0",
        index: "014",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/10.jpg",
        type: "0",
        index: "013",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/11.jpg",
        type: "0",
        index: "012",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/12.jpg",
        type: "0",
        index: "011",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/13.jpg",
        type: "0",
        index: "010",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/14.jpg",
        type: "0",
        index: "009",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/15.jpg",
        type: "0",
        index: "008",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/16.jpg",
        type: "0",
        index: "007",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/17.jpg",
        type: "0",
        index: "006",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/18.jpg",
        type: "0",
        index: "005",
        backcolor: 0x000000,
      });
      this.$refs.webgl.insert({
        url: "http://192.168.1.104:8088/resource/19.jpg",
        type: "0",
        index: "004",
        backcolor: 0x000000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  .search-warp {
    background: none;
    .search {
      background: none;
      padding: 20px 0;
      justify-content: space-between;
      .back {
        margin-left: 15px;
      }
      .name {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #fff;
        img {
          width: 20px;
          height: 17px;
          margin-left: 10px;
        }
      }
      .share {
        display: flex;
        align-items: center;
        padding-right: 15px;
        i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #fff;
          margin-right: 4px;
        }
      }
    }
  }
  width: 100%;
  height: 100%;
  // background: url(../../static/img/item-1.jpeg) center / cover no-repeat;
  position: relative;
  .share-tit {
    display: block;
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
    color: #000;
  }
  .wrap {
    padding: 0 15px;
  }
  .share-type {
    padding: 0 0 15px;
    border-bottom: 1px solid #dedede;
    display: flex;
    align-items: center;
    span {
      width: 53px;
      display: flex;
      margin-right: 30px;
      flex-direction: column;
      align-items: center;
      img {
        width: 53px;
        height: 53px;
        margin-bottom: 12px;
      }
      i {
        font-size: 11px;
        color: #2b2b2b;
      }
    }
    &.more {
      padding: 15px;
    }
  }
  .cancel {
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
    color: #007aff;
  }
}
</style>
