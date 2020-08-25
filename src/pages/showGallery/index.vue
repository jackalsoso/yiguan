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
        <img
          class="qiu"
          src="@/static/img/3D.png"
          alt=""
          v-show="!isThree"
          @click="change3D"
        />
        <img
          class="qiu"
          src="@/static/img/2D.png"
          alt=""
          v-show="isThree"
          @click="change3D"
        />
        <!-- <span class="upload" @click="$router.push('/upload')">上传画作</span> -->
        <span class="addhk" @click="addpic">生成画框</span>
        <span class="upload" @click="$router.push('/publishLink')"
          >生成画廊</span
        >
      </div>
    </div>
    <webgl
      style="width: 100%; height: 100%; position: absolute;top:0; z-index: 1000;"
      ref="webgl"
      :sceneLoad="change3D"
    ></webgl>
  </div>
</template>

<script>
// function he(){
//   console.log("Enter");
// }

import webgl from "../webgl/index";
export default {
  name: "showGallery",
  components: {
    webgl,
  },
  data() {
    return {
      isThree: false,
    };
  },
  created() {},
  mounted() {
    // this.$refs.webgl.insert({url:'http://192.168.1.104:8088/resource/01.jpg',type:'0',index:'023',backcolor:0xFFFFFF})
    this.$nextTick(function() {
      // this.$refs.webgl.insert({url:'http://192.168.1.104:8088/resource/01.jpg',type:'0',index:'023',backcolor:0xFFFFFF})
    });
    // this.$refs.webgl.insert({url:'../../static/img/item-1.jpeg',type:'0',index:'024',backcolor:0x000000})
  },
  methods: {
    change3D() {
      // alert("Enter");
      this.isThree = !this.isThree;
      this.$refs.webgl.switch_camera();
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
.addhk {
  width: 74px;
  height: 28px;
  background: rgba(241, 99, 13, 1);
  border-radius: 14px 14px 14px 14px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 28px;
}
.content {
  .search-warp {
    z-index: 2000;
    background: none;
    .search {
      background: none;
      padding: 20px 0;
      justify-content: space-between;
      .back {
        margin-left: 15px;
      }
      .qiu {
        width: 37px;
        height: 37px;
      }
      .upload {
        width: 74px;
        height: 28px;
        background: rgba(241, 99, 13, 1);
        border-radius: 14px 0px 0px 14px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 28px;
      }
    }
  }
  width: 100%;
  height: 100%;
  // background: url(../../static/img/item-1.jpeg) center / cover no-repeat;
  position: relative;
}
</style>
