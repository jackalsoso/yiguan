<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <img class="back" src="@/static/img/back-icon2.png" alt="" @click="$router.push('/focusPersonal')" >
        <!-- <img class="qiu" src="@/static/img/2D.png" alt="" v-show="!isThree" @click="change3D" > -->
        <img class="qiu" src="@/static/img/3D.png" alt="" v-show="isThree" @click="$router.push('/browse')">
        <!-- <span class="upload" @click="$router.push('/upload')">上传画作</span> -->
        <!-- <span class="upload" @click="$router.push('/publishLink')">生成画廊</span> -->
      </div>
    </div>
    <webgl
      style="width: 100%; height: 100%; position: absolute;top:0; z-index: 1000;"
      ref="webgl"
    ></webgl>
  </div>
</template>

<script>
import webgl from "../webgl/index";
export default {
  name: 'nochangeD',
  components: {
    webgl,
  },
  data(){
    return{
      isThree: true,
    }
  },
  created(){

  },
  methods:{
    // change3D(){
    //   this.isThree = !this.isThree
    //   this.$refs.webgl.switch_camera()
    // }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    .search-warp{
      z-index: 2000;
      background: none;
      .search{
        background: none;
        padding: 20px 0;
        justify-content: space-between;
        .back{
          margin-left: 15px;
        }
        .qiu{
          width: 37px;
          height: 37px;
        }
        .upload{
          width:74px;
          height:28px;
          background:rgba(241,99,13,1);
          border-radius:14px 0px 0px 14px;
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
