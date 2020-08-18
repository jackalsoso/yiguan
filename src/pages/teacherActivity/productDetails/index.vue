<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/img/back-2.png" alt="">
        <span class="tit">{{type === 'student'? '作品详情' : '课程详情'}}</span>
      </div>
    </div>
    <div class="cont">
      <div class="stu-list">
        <div class="name">
          <img class="h" :src="teacherInfo.headimg" alt="">
          <div class="r">
            <div class="t"><span>{{teacherInfo.name}}</span><i>{{productDetail.create_time}}</i></div>
            <!-- <div class="voice"><img src="@/static/img/voice.png" alt="">20″</div> -->
          </div>
        </div>
        <p class="intro">{{type === 'student'? productDetail.content : productDetail.summary}}</p>
        <div class="video">
          <div class="vd" @click.stop="play_video">
            <video ref="myvideo" :src="productDetail.video" ></video>
            <img v-show="!play" src="@/static/img/play-v.png" alt="">
          </div>
        </div>
        <div class="zan">
          <span class="z">
            <img v-show="!productDetail.is_likes" src="@/static/img/zan.png" alt="" @click.stop="zan(true)">
            <img v-show="productDetail.is_likes" src="@/static/img/zan-f.png" alt="" @click.stop="zan(false)">
            {{productDetail.likes_num}}
          </span>
          <span class="z"><img src="@/static/img/pinglun.png" alt="">{{productDetail.comment_num}}</span>
        </div>
        <div class="comment" v-if="comment.length">
          <div class="strip" v-for="(v,i) in comment" :key="i">
            <img class="h" :src="v.face" alt="">
            <div class="cont-2">
              <span class="n"><i>{{v.nickname}}</i>{{v.create_time}}</span>
              <span class="c">{{v.contents}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="send">
      <input type="text" v-model="word" placeholder="我来说两句......">
      <span @click="send_comment">发送</span>
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
      word: '',
      page: 1,
      productDetail: {},
      comment: [],
      type: '',
      teacherInfo: {},
    }
  },
  created(){
    this.type = this.$route.query.type;
    if(this.type === 'student'){
      this.studentList();
      this.getUserInfo()
    }else if(this.type === 'course'){
      this.courseList();
      this.teacher()
    }
  },
  methods:{
    play_video(){
      if(!this.productDetail.video){
        this.$toast('不是视频,无法播放');
        return;
      }
      this.play = !this.play;
      if(this.play){
        this.$refs.myvideo.play();
      }else{
        this.$refs.myvideo.pause();
      }
    },
    getUserInfo(){
      Activity.getUserInfo({ member_id: this.$route.query.memberId }).then(res => {
        this.teacherInfo = {
          headimg: res.data.face,
          name: res.data.nickname
        };
        console.log('详情111',res);
      });
    },
    teacher(){
      Activity.teacherCourseDetail({course_id: this.$route.params.detailId}).then(res => {
        this.teacherInfo = res.data.teacher;
        console.log('课程详情22',res);
      });
    },
    studentList(){
      Activity.productDetail({works_id: this.$route.params.detailId,page: this.page}).then(res => {
        this.productDetail = res.data;
        this.comment = res.data.comment;
        console.log('作品详情11',res);
      });
    },
    courseList(){
      Activity.courseListDetail({course_id: this.$route.params.detailId}).then(res => {
        this.productDetail = res.data;
        this.comment = res.data.comment;
        console.log('课程详情22',res);
      });
    },
    send_comment(){
      if(this.type === 'student'){
        Activity.productComment({works_id: this.$route.params.detailId,contents: this.word}).then(res => {
          console.log('发送',res);
          this.$toast.success(res.message);
          this.word = '';
          this.studentList();
        });
      }else if(this.type === 'course'){
        Activity.courseComment({course_id: this.$route.params.detailId,contents: this.word}).then(res => {
          console.log('发送',res);
          this.$toast.success(res.message);
          this.word = '';
          this.courseList();
        });
      }
    },
    zan(flag){
      if(this.type === 'student'){
        Activity.productZan({works_id: this.productDetail.works_id}).then(res => {
          console.log('11',res);
          this.$set(this.productDetail,'is_likes',flag);
          if(flag){
            this.$toast('点赞成功');
            this.$set(this.productDetail,'likes_num',this.productDetail.likes_num +=1);
          }else{
            this.$toast('取消点赞成功');
            this.$set(this.productDetail,'likes_num',this.productDetail.likes_num -=1);
          }
        });
      }else if(this.type === 'course'){
        Activity.courseZan({course_id: this.productDetail.course_id}).then(res => {
          console.log('11',res);
        });
      }
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding-bottom: 40px;
    .cont{
      position: relative;
      padding: 0 12px;
      .stu-list{
        padding-bottom: 12px;
        margin-bottom: 15px;
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
          margin-bottom: 24px;
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
        .comment{
          padding: 10px;
          background-color: #F4F4F4;
          border-radius:10px;
          .strip{
            display: flex;
            margin-bottom: 12px;
            .h{
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-right: 8px; 
            }
            .cont-2{
              width: 245px;
              .n{
                display: block;
                margin-bottom: 2px;
                font-size: 10px;
                color: #999;
                i{
                  font-size: 12px;
                  color: #333;
                  margin-right: 6px;
                }
              }
              .c{
                display: block;
                font-size: 14px;
                color: #333;
              }
            }
          }
        }
      }
    }
    .send{
      width: 100%;
      height: auto;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000;
      background-color: #F3F3F3;
      padding: 4px 0;
      display: flex;
      align-items: center;
      input{
        width:236px;
        height:34px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-left: 14px;
        border: none;
        font-size: 14px;
        color: #333;
      }
      input::placeholder{
        color: #C9C9C9;
      }
      span{
        width: 70px;
        text-align: center;
        font-size: 16px;
        color: #699EF6;
        line-height: 34px;
      }
    }
  }
</style>