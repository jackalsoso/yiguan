<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <img class="back" src="@/static/img/back-icon2.png" alt="" @click="$router.back(-1)" >
        <span class="upload" @click="$router.push('/upload')">上传画作</span>
      </div>
    </div>
    <div class="edit-button">
      <span @click="showPicker = true">编辑详情</span>
      <span @click="isSet = !isSet">
        设置顺序 
        <img :class="isSet? 'on' : '' " src="@/static/img/pull-d.png" alt="">
        <div class="select" v-if="isSet">
          <i>1</i>
          <i>2</i>
          <i>3</i>
          <i>4</i>
          <i>5</i>
        </div>
        <a class="t" v-if="isSet"></a>
      </span>
    </div>
    <!-- 编辑详情弹窗 -->
    <van-popup v-model="showPicker" round position="bottom">
      <div class="edit">
        <div class="tit-1" @click="showPicker = false"><span></span><span></span></div>
        <div class="options-wrap">
          <div class="options">
            <label class="tit">标题</label>
            <div class="make">
              <input type="text" placeholder="请输入标题">
            </div>
          </div>
          <div class="options">
            <label class="tit">分类</label>
            <div class="make" @click="showPicker = true">
              <span>油画</span>
              <img class="img1" src="@/static/img/pull-d.png" alt="">
            </div>
          </div>
          <div class="options">
            <label class="tit">作品详情</label>
            <div class="make">
              <input type="text" placeholder="请输入详情">
            </div>
          </div>
          <div class="options">
            <label class="tit">上传语音</label>
            <div class="make">
              <van-uploader class="upload-file" :after-read="afterRead" />
              <img class="img2" src="@/static/img/up-h.png" alt="">
              <i>(支持格式：wma、aac、mp3、wav)</i>
            </div>
          </div>
          <div class="options">
            <label class="tit">上传视频</label>
            <div class="make">
              <van-uploader class="upload-file" :after-read="afterRead" />
              <img class="img2" src="@/static/img/up-h.png" alt="">
              <i>(支持格式：wma、aac、mp3、wav)</i>
            </div>
          </div>
          <div class="options">
            <label class="tit">输入价格</label>
            <div class="make">
              <input type="text" placeholder="请输入价格">
            </div>
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
export default {
  name: 'showGallery',
  data(){
    return{
      isSet: false,
      showPicker: false,

    }
  },
  created(){

  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
  .content{
    .search-warp{
      background: none;
      .search{
        background: none;
        padding: 20px 0;
        justify-content: space-between;
        .back{
          margin-left: 15px;
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
    background: url(../../static/img/item-1.jpeg) center / cover no-repeat;
    position: relative;
    .edit-button{
      width: 360px;
      height: 48px;
      position: fixed;
      bottom: 48px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        width: 50%;
        height: 100%;
        font-size: 16px;
        color: #007AFF;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-child{
          border-right: 1px solid #DEDEDE;
        }
        img{
          width: 7px;
          height: 7px;
          margin-left: 12px;
          transition: transform .5s;
          &.on{
            transform: rotate(180deg);
          }
        }
        .select{
          width: 72px;
          height: 200px;
          background-color: #fff;
          border-radius: 6px;
          position: absolute;
          right: 0;
          bottom: 60px;
          overflow-y: auto;
          padding: 0 8px;
          i{
            display: block;
            text-align: center;
            font-size: 20px;
            color: #3D4249;
            padding: 5px 0;
            border-bottom: 1px solid #EAF0F4;
          }
        }
        .t{
          width: 0;
          height: 0;
          border-width: 0 10px 10px;
          border-style: solid;
          border-color: transparent transparent #fff;
          position: absolute;
          bottom: 52px;
          right: 31px;
          transform: rotate(180deg);
        }
      }
    }
    .edit{
      .tit-1{
        padding: 8px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span{
          width: 45px;
          height: 2px;
          background-color: #CBD1D9;
          margin-bottom: 3px;
        }
      }
    }
  }
</style>
