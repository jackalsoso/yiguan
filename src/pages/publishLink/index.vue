<template>
  <div class="content">
    
    <div class="addPop">
      <div class="progress">
        <img src="@/static/img/jindu-logo2.png" alt="">
        <div class="hint">生成画廊中...</div>
        <van-progress
          :percentage="nuw"
          :show-pivot="true"
          color="#F2630D"
        />
      </div>
    </div>

    <div class="edit-button" v-if="nuw == 100">
      <span @click="$router.push('/publishSuccess')">确认</span>
      <span @click="$router.push('/showGallery')">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'publishLink',
  data(){
    return{
      nuw:0,
    }
  },
  created(){

  },
  mounted(){
    this.click()
  },
  methods:{
    click() {
      //定义定时器开始时间为0

      var progressnuw = 0; //顶一个定时器

      var timer = setInterval(() => {
        //变量一直++

        progressnuw++; //清楚定时器

        if (progressnuw >= 100) {
          clearInterval(timer);
          // this.$router.push('/publishSuccess')
        } //获取重新赋值

        this.nuw = progressnuw;
      }, 20);
    },
  }
}
</script>

<style lang="scss" scoped>
  .content{
    width: 100%;
    height: 100%;
    background: url(../../static/img/item-1.jpeg) center / cover no-repeat;
    position: relative;
    .addPop{
      z-index: 10;
      .progress{
        width: 275px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        img{
          display: block;
          width: 58px;
          height: 46px;
          margin: 0 auto 12px;
        }
        .hint{
          font-size: 16px;
          color: #fff;
          text-align: center;
          margin-bottom: 15px;
        }

      }
    }
    .edit-button{
      width: 360px;
      height: 48px;
      position: fixed;
      z-index: 1000;
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
      }  
    }
  }
</style>
