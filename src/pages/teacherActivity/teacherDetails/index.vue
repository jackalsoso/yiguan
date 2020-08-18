<template>
  <div class="content">
    <img class="back" @click="$router.back(-1)" src="@/static/img/back.png" alt="">
    <div class="banner">
      <img class="bg" :src="detailData.image" alt="">
      <div class="figure">
        <img class="head-img" :src="teacherInfo.headimg" alt="">
        <div class="name">
          <label>{{teacherInfo.name}}</label>
          <span>代表作: {{detailData.summary}}</span>
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="deputy">
        <div class="zc">
          <label>{{detailData.title}}——{{teacherInfo.teacher_name}}</label>
          <span>¥{{detailData.price}}</span>
        </div>
        <span class="button" @click="isShowPop = true">线下组课</span>
      </div>
      <p class="deputy-cont">{{detailData.summary}}</p>
      <label class="title">所有作品 ({{courseList.length}})</label>
      <div class="stu-list" v-for="v in courseList" :key="v.course_id" @click="$router.push({ path: `/product/${v.course_id}?type=course` })">
        <div class="name">
          <img class="h" :src="teacherInfo.headimg" alt="">
          <div class="r">
            <div class="t"><span>{{teacherInfo.name}}</span><i>{{v.create_time}}</i></div>
            <!-- <div class="voice"><img src="@/static/img/voice.png" alt="">20″</div> -->
          </div>
        </div>
        <p class="intro">{{v.summary}}</p>
        <div class="video" v-html="v.content">
          <!-- <div class="vd" @click.stop="play_video">
            <video ref="myvideo" src="@/static/img/video-1.mp4" poster="@/static/img/video-per.png"></video>
            <img v-show="!play" src="@/static/img/play-v.png" alt="">
          </div> -->
        </div>
        <div class="zan">
          <span class="z">
            <img v-show="!v.is_likes" src="@/static/img/zan.png" alt="" @click.stop="zan(v,true)">
            <img v-show="v.is_likes" src="@/static/img/zan-f.png" alt="" @click.stop="zan(v,false)">
            {{v.likes_num}}
          </span>
          <span class="z"><img src="@/static/img/pinglun.png" alt="">{{v.comment_num}}</span>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="pop" v-if="isShowPop" @click.self="isShowPop = false">
      <div class="pop-cont">
        <div class="wirte">
          <div class="money">
            <label>支付金额</label>
            <i>¥{{detailData.price}}</i>
            <span>注：若两个月内线下组课未成功，将全额退款； <br/> 若组课成功，时间地点，短信通知</span>
          </div>
          <div class="apply-button" @click="pay" >立即支付</div>
        </div>
        <img @click.stop="isShowPop = false" class="close" src="@/static/img/close.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Activity from '@/api/activity'
export default {
  name: 'studentDetails',
  data(){
    return{
      play: false,
      isShowPop: false,
      isZan: false,
      detailData: {},
      teacherInfo: {},
      courseList: [],
    }
  },
  created(){
    this.init();
  },
  methods:{
    play_video(){
      this.play = !this.play;
      if(this.play){
        this.$refs.myvideo.play();
      }else{
        this.$refs.myvideo.pause();
      }
    },
    init(){
      Activity.courseDetail({teacher_id: this.$route.params.detailId}).then(res => {
        this.courseList = res.data;
        console.log('课程详情',res);
      });
      Activity.teacherCourseDetail({course_id: this.$route.query.course_id}).then(res => {
        this.detailData = res.data;
        this.teacherInfo = res.data.teacher;
        console.log('老师信息',res);
      });
    },
    zan(v,flag){
      Activity.courseZan({course_id: v.course_id}).then(res => {
        console.log('11',res);
        if(res.status === 1000){
          v.is_likes = flag;
          if(res.data.status){
            v.likes_num += 1;
            this.$toast('点赞成功');
          }else{
            v.likes_num -= 1;
            this.$toast('取消点赞成功');
          }
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
        this.isShowPop = false;
        if(res.status === 1001){
          this.$toast.fail(res.message);
        }else{
          this.$toast.success(res.message)
        }
      });
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    .banner{
      position: relative;
      padding-top: 50px;
      .bg{
        width: 100%;
        height: 196px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        -webkit-filter: blur(3px); /* Chrome, Safari, Opera */
        filter: blur(3px);
      }
      .figure{
        padding: 0 12px 15px;
        display: flex;
        .head-img{
          width: 74px;
          height: 74px;
          border-radius: 50%;
          margin-right: 12px;
        }
        .name{
          width: 210px;
          color: #fff;
          label{
            display: block;
            font-size: 17px;
            margin-bottom: 5px;
          }
          span{
            font-size: 12px;
            line-height: 20px;
          }
        }
      }

    }
    .cont{
      position: relative;
      z-index: 10;
      background: #fff;
      border-radius:20px 20px 10px 10px;
      padding: 15px 12px;
      .deputy{
        padding-bottom: 8px;
        border-bottom: 1px solid #E5E5E5;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .zc{
          width: 70%;
          label{
            display: block;
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
            font-weight: 500;
          }
          span{
            display: block;
            font-size: 12px;
            color: #FF3B24;
          }
        }
        .button{
          width:94px;
          height:28px;
          background:rgba(105,158,246,1);
          border-radius:20px;
          text-align: center;
          line-height: 28px;
          font-size: 14px;
          color: #fff;
        }
      }
      .deputy-cont{
        padding: 10px 6px;
        background-color: #F6F6F6;
        margin-bottom: 15px;
        font-size: 12px;
        color: #666;
        line-height: 20px;
        text-indent: 15px;
      }
      .title{
        font-size: 16px;
        color: #333;
        display: block;
        margin-bottom: 15px;
        &::before{
          display: inline-block;
          content: '';
          width:2px;
          height:12px;
          background:linear-gradient(180deg,rgba(151,190,255,1) 0%,rgba(105,158,246,1) 100%);
          border-radius:1px;
          margin-right: 3px;
        }
      }
      .stu-list{
        padding-bottom: 12px;
        margin-bottom: 15px;
        border-bottom: 1px solid #E5E5E5;
        .name{
          display: flex;
          margin-bottom: 10px;
          .h{
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-right: 6px;
          }
          .r{
            width: 240px;
            .t{
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 3px;
              span{
                font-size: 16px;
                color: #333;
              }
              i{
                font-size: 12px;
                color: #999;
              }
            }
            .voice{
              width:239px;
              height:26px;
              background:linear-gradient(180deg,rgba(167,200,255,1) 0%,rgba(105,158,246,1) 100%);
              border-radius:0px 8px 8px 8px;
              display: flex;
              align-items: center;
              padding-left: 10px;
              box-sizing: border-box;
              font-size: 12px;
              color: #fff;
              img{
                width: 18px;
                height: 18px;
                margin-right: 3px;
              }
            }
          }
        }
        .intro{
          font-size: 12px;
          color: #333;
          line-height: 20px;
          margin-bottom: 12px;
        }
        .video{
          margin-bottom: 12px;
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
        }
        .zan{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .z{
            margin-left: 20px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #666;
            img{
              width: 18px;
              height: 18px;
              margin-right: 3px;
            }
          }
        }
      }
      .stu-list:last-child{
        margin-bottom: 0;
        border-bottom: none; 
      }
    }
  }
  
  .pop{
    .pop-cont{
      .wirte{
        background: #fff;
        .money{
          text-align: center;
          margin-bottom: 15px;
          label, i, span{
            display: block;
          }
          label{
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
          }
          i{
            font-size: 20px;
            color: #FF3B24;
            margin-bottom: 16px;
          }
          span{
            font-size: 10px;
            color: #999;
            line-height: 17px;
          }
        }
      }
    }
    
  }
</style>