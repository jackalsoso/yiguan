<template>
  <div class="content">
    <img class="back" @click="$router.back(-1)" src="@/static/img/back.png" alt="">
    <div class="banner">
      <img class="bg" src="@/static/img/stu-det-bg.png" alt="">
      <div class="figure">
        <img class="head-img" :src="userInfo.face" alt="">
        <div class="name">
          <label>{{userInfo.nickname}}</label>
          <!-- <span>{{userInfo.nickname}}</span> -->
        </div>
      </div>
    </div>
    <div class="cont">
      <label class="title">所有作品 ({{list.length}})</label>
      <div class="stu-list" v-for="(v,i) in list" :key="v.works_id" @click="$router.push({ path: `/product/${v.works_id}?type=student&memberId=${$route.params.detailId}` })">
        <div class="name">
          <img class="h" :src="userInfo.face" alt="">
          <div class="r">
            <div class="t"><span>{{userInfo.nickname}}</span><i>{{v.create_time}}</i></div>
            <!-- <div class="voice"><img src="@/static/img/voice.png" alt="">20″</div> -->
          </div>
        </div>
        <p class="intro">{{v.content}}</p>
        <div class="video">
          <div class="vd" @click.stop="play_video(v,i)">
            <video ref="myVideo" :src="v.video"></video>
            <img v-show="!v.isPlay" src="@/static/img/play-v.png" alt="">
          </div>
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
      list: [],
      userInfo: {},
    }
  },
  created(){
    this.init();
  },
  methods:{
    play_video(v,i){
      if(!v.video){
        this.$toast('不是视频,无法播放');
        return;
      }
      v.isPlay = !v.isPlay;
      let refDom = this.$refs.myVideo[i];
      if(v.isPlay){
        refDom.play();
      }else{
        refDom.pause();
      }
    },
    init(){
      let params = {
        page: this.page,
        student_id: this.$route.params.detailId
      }
      Activity.product_list(params).then(res => {
        let list = [];
        res.data.list.forEach( v => {
          list.push(Object.assign(v,{ isPlay: false }));
        });
        this.list = list;
        console.log('作品',this.list);
      });
      Activity.getUserInfo({ member_id: this.$route.params.detailId }).then(res => {
        this.userInfo = res.data;
        console.log('用户信息',res);
      });
    },
    zan(v,flag){
      Activity.productZan({works_id: v.works_id}).then(res => {
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
          label{
            display: block;
            color: #333;
            font-size: 17px;
            margin-bottom: 5px;
          }
          span{
            font-size: 12px;
            color: #666;
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
</style>