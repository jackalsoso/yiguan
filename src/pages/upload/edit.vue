<template>
  <div class="content">
    <div class="nav-wrap">
      <div class="nav">
        <img src="@/static/img/back-icon.png" alt="" class="back" @click="$router.back(-1)">
        <span>画作编辑</span>
        <a></a>
      </div>
    </div>
    <div class="top-bg"></div>

    <div class="edit">
      <div class="img"> 
        <img src="@/static/img/item-1.jpeg" alt="">
      </div>
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

    <div class="submit-but">
      <span>
        <i>确认</i>
      </span>
      <span>
        <i>取消</i>
      </span>
    </div>

    <!-- 选择器 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        title="选择"
        item-height="1.17rem"
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

  </div>
</template>

<script>
export default {
  name: 'productEdit',
  data(){
    return{
      value: '',
      showPicker: false,
      columns: ['油画', '山水画', '风景画','油画', '山水画', '风景画'],
    }
  },
  created(){

  },
  methods:{
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    .nav-wrap{
      height: 50px;
      .nav{
        width: 100%;
        height: 50px;
        background-color: #fff;
        padding: 0 15px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        .back{
          width: 10px;
          height: 17px;
        }
        span{
          font-size: 18px;
          color: #000101;
        }
        .set{
          width: 18px;
          height: 17px;
        }
      }
    }
    .top-bg{
      height: 6px;
      background-color: #F5F5F5;
    }
    .submit-but{
      width: 100%;
      height: auto;
      padding: 15px 0;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
      span{
        width: 150px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
          font-size: 16px;
          margin-left: 5px;
        }
        &:first-child{
          background-color: #EFEEEC;
          border-radius: 14px 0 0 14px;
          img{
            width: 16px;
            height: 16px;
          }
          i{
            color: #000;
          } 
        }
        &:last-child{
          border-radius:0px 14px 14px 0px;
          background-color: #F2630D;
          img{
            width: 17px;
            height: 17px;
          }
          i{
            color: #fff;
          }
        }
      }
    }
  }
</style>
