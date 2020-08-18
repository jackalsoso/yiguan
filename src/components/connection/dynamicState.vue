<template>
  <div class="dynamicState">
    <div class="group">
      <van-pull-refresh v-model="pull_loading" @refresh="onRefresh" success-text="刷新成功">
				<van-list v-model="list_loading" :finished="finished" loading-text="加载中..." :offset="off_h" :finished-text="finished_text" @load="onLoad">
            <div class="Statelist" v-for="(val,key) in commentlist" :key="key">
              <div class="icon">
                <img :src="val.face" alt />
              </div>
              <div class="content_right">
                <p class="username" v-if="val.remark">{{val.remark}}</p>
                <p class="username" v-else>{{val.nickname}}</p>
                <p class="timer">{{val.create_time}}</p>
                <p class="content_p">{{val.contents}}</p>
                <div class="imgbox">
                  <img v-for="(img,index) in val.picture" :key="index" :src="img" alt  @click="show_before_img(val.picture,index)"/>
                </div>
                <div class="kind">
                  <div class="like" @click="likestatus(val.is_like,val.member_id,val.trends_id)">
                    <img src="@/static/image/likea.png" alt v-if="val.is_like !=0" />
                    <img src="@/static/image/like.png" alt v-else />
                    <span>{{val.likes}}</span>
                  </div>
                  <div class="discuss">
                    <img src="@/static/image/pl.png" alt />
                    <span @click="comment(val.trends_id,val.member_id)">评论</span>
                  </div>
                </div>
                <!-- 评论 -->
                <div class="discuss_group" v-if="val.comment">
                  <div
                    class="discuss_list"
                    v-for="(com,index) in val.comment"
                    :key="index"
                    @click="comment(val.trends_id,com.member_id)"
                  >
                    <div style="width:20px,height:20px">
                      <img :src="com.face" alt  style="width:20px,height:20px"/>
                    </div>
                    <div class="dis_content">
                      <p class="username" v-if="com.member_name">{{com.member_name}}</p>
                      <p class="username" v-else>{{com.nickname}}</p>
                      <p class="timer">{{com.create_time}}</p>
                      <p class="content_p">{{com.contents}}</p>
                      <!-- <p class="content_p" v-if="com.reply_name">回复<span>{{com.reply_name}}</span>：{{com.contents}}</p> -->
                    </div>
                  </div>
                  <!-- <div class="discuss_list">
                    <img src="@/static/image/stu-1.png" alt="">
                    <div class="dis_content">
                      <p class="username">小麦</p>
                      <p class="timer">8小时前</p>
                      <p class="content_p">回复 <span>阿波罗</span>：海上的夜是柔和的，是静寂的，是梦幻的。我 望着那许多认识的星，我仿佛看见它们在对我 霎眼,我仿佛听见它们在小声......——《繁星》</p>
                    </div>
                  </div>-->
                </div>
              </div>
            </div>
        </van-list>
			</van-pull-refresh>

    </div>

    <!-- 发布动态 -->
    <div class="publish" @click="$router.push({ path: `/publish` })">
      <img src="@/static/image/fb.png" alt />
    </div>
    <!-- 评论 -->
    <div class="send" v-if="msgstatus">
      <input
        type="text"
        v-model="message"
        confirm-hold="true"
        confirm-type="send"
        @confirm="confirm"
      />
      <div class="send-button" @click="send_msg()">发表</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
import Connection from "@/api/connection";
export default {
  name: "dynamicState",
  components: {},
  data() {
    return {
      list_loading: false,
			finished: false,
			page: 0,
			pull_loading: false,
			off_h: 10,
      finished_text: '没有更多了',
      like: false,
      message: "", //评论内容
      msgstatus: false,
      commentlist: [],
      instance_before:'',
      instance_after:'',
      trends_id: "", //动态id
      member_pid: "" //评论回复的会员id
    };
  },
  methods: {
     //查看图片
      show_before_img(img,index){
          this.instance_before = ImagePreview({
              images: img,
              startPosition:index,
              maxZoom:2,
              minZoom:1/3
          });
      },
          //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.page = 1;
        this.finished = false;
        this.init()
      },800);
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.page = this.page + 1;
        this.init()
      }, 500);
    },
    // 获取动态内容
    init(){
      let params = {
        member_id: this.$memberId(),
        p: this.page
      }
      Connection.trends(params).then(res => {
        let data = res.data;
        if (this.page == 1) {
          this.commentlist = data;
        }else {
          this.commentlist.push(...data);
        }
        this.list_loading = false;
        this.pull_loading = false;
        if (!data.length) {
          this.finished = true;
        }
      }).catch( () => {
        this.list_loading = false;
				this.pull_loading = false;
				this.finished = true;
				this.finished_text = '加载失败,请重新下拉刷新';
      })
    },
    // init() {
    //   let params = {
    //     member_id: this.$memberId()
    //   };
    //   Connection.trends(params).then(res => {
    //     if (res.status == 1000) {
    //       this.commentlist = res.data;
    //     }
    //   });
    // },
    confirm() {},
    comment(trends_id, member_pid) {
      if(this.msgstatus){
        this.msgstatus = false;
        
      }else{
        this.msgstatus = true;
        this.message = "";
        this.trends_id = trends_id;
        this.member_pid = member_pid;
      }
    },
    // 发表评论
    send_msg() {
      let params = {
        trends_id: this.trends_id,
        member_id: this.$memberId(),
        contents: this.message,
        member_pid: this.member_pid
      };
      Connection.trendsComment(params).then(res => {
        if (res.status == 1000) {
          console.log(res);
          this.msgstatus = false;
          this.init();
        }
      });
    },
    // 点赞
    likestatus(is_like, member_id, trends_id) {
      let islike = "";
     
      if (is_like == 0) {
        islike = 1;
      } else {
        islike = 0;
      }
      let params = {
        member_id: this.$memberId(),
        trends_id: trends_id,
        status: islike
      };
      Connection.likes(params).then(res => {
        if (res.status == 1000) {
          this.init();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.message-cont {
  background-color: #f8f8f8;
  padding: 30px 20px;
  overflow: hidden;
}
.send {
  width: 100%;
  height: 40px;
  position: fixed;
  padding: 0 10px;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.send input {
  width: 556px;
  height: 30px;
  background-color: #fff;
  border-radius: 4px;
  border: none;
  margin-right: 14px;
  box-sizing: border-box;
}
.send-button {
  width: 135px;
  height: 30px;
  background-color: #699ef6;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
}
.dynamicState {
  .group {
    .Statelist {
      width: 100%;
      padding: 12px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid #e5e5e5;
      .icon {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        margin-right: 10px;
        img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }
      }
      .content_right {
        .username {
          color: #333;
          font-size: 14px;
        }
        .timer {
          font-size: 12px;
          color: #999;
          margin: 4px 0 6px 0;
        }
        .content_p {
          color: #333;
          font-size: 12px;
          line-height: 1.8;
          span {
            color: #699ef6;
          }
        }
        .imgbox {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-top: 15px;
        }
        .imgbox img {
          margin-right: 5px;
          width: 76px;
          height: 76px;
          border-radius: 5px;
          margin-bottom: 14px;
        }
      }
      .kind {
        width: 232px;
        display: flex;
        justify-content: flex-end;
        align-self: center;
        margin-bottom: 10px;
        .like {
          margin-right: 25px;
         
        }
        img {
          width: 18px;
          height: 18px;
          margin-right: 4px;
          display: inline-block;
          margin-top: -4px;
        }
        span {
          font-size: 14px;
          color: #666;
        }
      }
      .discuss_list {
        width: 230px;
        font-size: 10px;
        padding: 6px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;

        .dis_content {
          width: 230px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(229, 229, 229, 1);
          // margin-bottom: 8px;
        }
        img {
          width: 30px !important;
          height: 30px !important;
          display: inline-block;
          border-radius: 50%;
          margin-right: 6px;
        }
        .username {
          font-size: 10px !important;
        }
        .timer {
          margin: 3px 0 2px 0 !important;
          font-size: 10px !important;
        }
        .content_p {
          font-size: 10px !important;
        }
      }
    }
  }
}
.imgbox img:nth-child(3),
.imgbox img:nth-child(6),
.imgbox img:nth-child(9) {
  margin-right: 0px !important;
}
.publish {
  position: fixed;
  right: 10px;
  bottom: 80px;
  img {
    width: 66px;
    height: 66px;
    border-radius: 50%;
  }
}
.discuss_group {
  width: 100%;
  // padding: 6px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
  opacity: 1;
  // background: burlywood;
  border-radius: 10px;
}
.discuss_list:last-child .dis_content {
  border: none !important;
}
</style>