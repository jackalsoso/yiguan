<template>
  <div class="content">
    <img class="back" @click="$router.back(-1)" src="@/static/img/back.png" alt="">
    <div class="banner">
      <img :src="detailData.image" alt="">
    </div>
    <div class="cont">
      <label class="title">{{detailData.title}}</label>
      <p class="word">{{detailData.summary}}</p>
      <div class="tit-2">
        <img src="@/static/img/dot.png" alt="">
        <span>活动时间及地点</span>
      </div>
      <div class="time">
        <p>
          <img src="@/static/img/time.png" alt="">
          <span>{{detailData.start_time}}</span>
        </p>
        <p>
          <img src="@/static/img/site.png" alt="">
          <span>{{detailData.address}}</span>
        </p>
      </div>
      <div class="tit-2">
        <img src="@/static/img/dot.png" alt="">
        <span>往期活动精彩瞬间</span>
      </div>
      <div class="video" v-html="detailData.content">
        <!-- <div class="vd" @click="play_video">
          <video ref="myvideo" src="@/static/img/video-1.mp4" poster="@/static/img/video-per.png"></video>
          <img v-show="!play" src="@/static/img/play-v.png" alt="">
        </div>
        <div class="img">
          <img src="@/static/img/read-img2.png" alt="" v-for="(v,i) in 3" :key="i">
        </div> -->
      </div>
    </div>
    <div class="apply" @click="isShowPop = true">立即报名</div>
    <!-- 弹窗 -->
    <div class="pop" v-if="isShowPop" @click.self="isShowPop = false">
      <div class="pop-cont">
        <div class="wirte">
          <img class="tit-img" src="@/static/img/pop-1.png" alt="">
          <div class="input">
            <input type="text" v-model="phone" placeholder="请输入您的手机号" >
          </div>
          <div class="code">
            <input type="text" v-model="code" placeholder="请输入验证码" >
            <span @click="send_code">{{is_stay?  newCount+'s' : '获取验证码' }}</span>
          </div>
          <div class="apply-button" @click="apply_activity">立即报名</div>
        </div>
        <img @click.stop="isShowPop = false" class="close" src="@/static/img/close.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Activity from '@/api/activity'
export default {
  name: 'activityDetails',
  data(){
    return{
      play: false,
      isShowPop: false,
      detailData: {},
      is_stay: false,
      count: 0,
      phone: '',
      code: '',
      isPay: 0, // 0: 已经支付 1: 未支付
    }
  },
  computed:{
    newCount(){
      return this.count < 10? `0${this.count}` : this.count;
    }
  },
  created(){
    this.init();
  },
  methods:{
    apply_activity(){
      let params = {
        activity_id: this.$route.params.detailId,
        mobile: this.phone,
        code: this.code
      }
      Activity.applyActivity(params).then( () => {
        this.$toast.success('报名成功');
        this.isShowPop = false;
        if(this.isPay == 1){
          this.pay();
        }
      });
    },
    pay(){
      let params = {
        price: this.detailData.price,
        payment_mode: 2,
        type: 1,
        type_id: this.$route.params.detailId
      }
      Activity.pay(params).then(res => {
        console.log('支付',res);
        if(res.status === 1001){
          this.$toast.fail(res.message);
        }else{
          this.$toast.success(res.message)
        }
      });
    },
    play_video(){
      this.play = !this.play;
      if(this.play){
        this.$refs.myvideo.play();
      }else{
        this.$refs.myvideo.pause();
      }
    },
    init(){
      Activity.activityDetail({activity_id: this.$route.params.detailId}).then( res => {
        this.detailData = res.data;
        this.isPay = res.data.is_price;
        console.log('活动详情',res)
      })
    },
    send_code(){
      if(this.is_stay) return;
      if(!this.phone){
        this.$toast('请输入手机号');
        return;
      }
      this.request_code();
      const TIME_COUNT = 60;
      if(!this.timer){
        this.count = TIME_COUNT;
        this.is_stay = true;
        this.timer = setInterval(() => {
          if(this.count > 1 && this.count <= TIME_COUNT){
          this.count --;
          }else{
          clearInterval(this.timer);
          this.timer = null;
          this.is_stay = false;
          }
        },1000);
      }
    },
    // 发送验证码
    request_code(){
      let params = {
        account: this.phone,
        type: 4
      }
      Activity.sendCode(params).then( () => {
        this.$toast.success('发送成功');
      });
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding-bottom: 40px;
    .banner{
      position: relative;
      padding-top: 166px;
      img{
        width: 100%;
        height: 196px;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-filter: blur(3px); /* Chrome, Safari, Opera */
        filter: blur(3px);
      }
    }
    .cont{
      position: relative;
      z-index: 10;
      background: #fff;
      border-radius:20px 20px 10px 10px;
      padding: 15px;
      .title{
        font-size: 16px;
        color: #333;
        display: block;
        margin-bottom: 15px;
      }
      .word{
        font-size: 12px;
        color: #666;
        text-indent: 20px;
        line-height: 20px;
        margin-bottom: 15px;
      }
      .tit-2{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        img{
          width: 12px;
          height: 12px;
          margin-right: 5px;
        }
        span{
          font-size: 12px;
          color: #333;
        }
      }
      .time{
        padding: 0 15px 15px;
        p{
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          img{
            width: 12px;
            height: 12px;
            margin-right: 5px;
          }
          span{
            font-size: 12px;
            color: #666;
          }
        }
      }
      .video{
        .vd{
          width: 100%;
          height: 115px;
          margin-bottom: 7px;
          position: relative;
          video{
            width: 100%;
            height: 100%;
            object-fit: fill;
          }
          img{
            width: 30px;
            height: 30px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 100;
          }
        }
        .img{
          display: flex;
          align-items: center;
          justify-content: space-between;
          img{
            width: 92px;
            height: 63px;
          }
        }
      }

    }
    .apply{
      width: 100%;
      height: 40px;
      background-color: #699EF6;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
    }
  }
</style>