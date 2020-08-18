<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/image/back-2.png" alt />
        <span class="tit">好友信息</span>
      </div>
    </div>
    <div class="info_wrap">
      <div class="info_top">
        <div class="icon_box">
          <img :src="info.face" alt />
        </div>
        <div class="info">
          <!-- 没有好友时显示 -->
          <p v-if="info.friend == ''">{{info.nickname}}</p>
          <!-- 有好友时显示可编辑备注 -->
          <input v-else type="text" v-model="nickname" placeholder="请输入好友备注" @blur="update" />
          <p v-if="info.sex == 0">未知，{{info.birth}}</p>
          <p v-if="info.sex == 1">男,{{info.birth}}</p>
          <p v-if="info.sex == 2">女，{{info.birth}}</p>
          <p>{{educationtxt}}</p>
        </div>
      </div>
      <!-- 自我介绍 -->
      <div class="self-introduction" v-if="info.introduce">
        <div class="title">
          <span class="line"></span>
          <span class="txt">自我介绍</span>
        </div>
        <div class="details">{{info.introduce}}</div>
      </div>
    </div>
    <!-- 按钮 -->
    <!-- friend为空 没有好友关系 -->
    <div class="button" v-if="info.friend == '' && member_id != this.$memberId()" @click="addFriendlist">添加好友</div>
    <div >
      <div v-if="info.friend && member_id != this.$memberId()"
        class="button"
        @click="$router.push({ path: '/chat',query:{type:1,f_pk_id:f_pk_id,member_id:member_id,title:nickname}})"
      >发送消息</div>
      <div class="button bu1" v-if="info.friend && member_id != this.$memberId()"  @click="del">删除好友</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Toast } from "vant";
// 全局注册
Vue.use(Dialog).use(Toast);
import Connection from "@/api/connection";
export default {
  name: "goodsInfo",
  components: {},
  data() {
    return {
      type: "",
      f_pk_id: "",
      member_id: "",
      info: "",
      edu_id: "",
      nickname: "",
      educationtxt: ""
    };
  },
  created() {
    console.log("传回来的参数", this.$route.query);
    this.type = this.$route.query.type;
    this.member_id = this.$route.query.member_id;
    // this.f_pk_id = this.$route.query.f_pk_id;
    this.getInfocontent();
  },
  methods: {
    // 修改好友信息
    update() {
      let params = {
        member_id: this.$memberId(),
        friend_id: this.member_id,
        remark: this.nickname
      };
      Connection.updateInfo(params).then(res => {
        console.log(res)
        // if(res.status == 1000 ){
        // }
      });
    },
    //  获取好友用户信息
    getInfocontent() {
      let params = {
        member: this.member_id
      };
      Connection.getInfo(params).then(res => {
        if (res.status == 1000) {
          this.info = res.data;
          // let nickname=''
          if (this.info.friend.remark) {
            // nickname = this.info.friend.remark;
            this.nickname = this.info.friend.remark;
          } else {
            this.nickname = res.data.nickname;
          }
          // console.log(nickname)
          // console.log("8888888888888888888888", this.nickname);
          this.edu_id = this.info.edu_id;
          this.f_pk_id = this.info.friend.f_pk_id
          this.geteducation();
        }
      });
    },
    //  获取学历列表
    geteducation() {
      Connection.education().then(res => {
        let arr = [];
        if (res.status == 1000) {
          arr = res.data.filter(x => {
            return x.edu_id == this.edu_id;
          });
          this.educationtxt = arr[0].edu_name;
        }
      });
    },
    // 申请加为好友
    addFriendlist() {
      let params = {
        member_id: this.$memberId(),
        friend_id: this.member_id
      };
      Connection.addFriend(params).then(res => {
        if (res.status == 1000) {
          Toast.success('申请成功,待对方审核');
          // this.$router.push({ path: `/socialContact` });
        } else {
          Toast.fail(res.message);
        }
      });
    },
    del() {
      let params = {
        f_pk_id: this.f_pk_id
      };
      Connection.deleteList(params).then(res => {
        if (res.status == 1000) {
          Toast.success("删除成功");
          this.$router.push({ path: `/socialContact` });
        } else {
          Toast(res.message);
        }
      });

      //   Dialog.confirm({
      //     title: '提示',
      //     message: '您确定删除此好友吗？',
      //     })
      //     .then(() => {
      //        let params = {
      //           member_id:1,
      //           f_pk_id:this.f_pk_id
      //         }
      //         Connection.deleteList(params).then( res => {
      //             if(res.status ==1000){
      //                 Toast.success('删除成功');
      //                 this.$router.push({ path: `/socialContact` })
      //             }else{
      //                 Toast(res.message);
      //             }
      //         })
      //     })
      //     .catch(() => {

      //  });
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  border: none;
  // height: 30px;
  font-size: 14px;
  padding: 0;
  color: #333;
}
.van-dialog {
  width: 200px !important;
}
.content {
  .info_wrap {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .info_top {
      padding: 14px 0 16px 0;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px dashed rgba(209, 226, 255, 1);
    }
    .icon_box {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 9px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .button {
    width: 93%;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    height: 32px;
    background: rgba(105, 158, 246, 1);
    opacity: 1;
    border-radius: 20px;
    line-height: 32px;
    margin: 150px auto 0;
  }
  .bu1 {
    margin: 30px auto 0;
  }
  .self-introduction {
    .title {
      width: 100px;
      padding: 16px 0;
      box-sizing: border-box;
      position: relative;
      .line {
        display: inline-block;
        width: 2px;
        height: 14px;
        background: linear-gradient(
          180deg,
          rgba(151, 190, 255, 1) 0%,
          rgba(105, 158, 246, 1) 100%
        );
        border-radius: 10px;
      }
      .txt {
        color: #699ef6;
        font-size: 14px;
        position: absolute;
        left: 12px;
        top: 13px;
      }
    }
    .details {
      font-size: 12px;
      color: #333;
      line-height: 1.7;
      padding-bottom: 15px;
      text-indent: 20px;
    }
  }
}
.info p:nth-child(1) {
  color: #333;
  font-size: 14px;
}
.info p:nth-child(2),
.info p:nth-child(3) {
  color: #666666;
  font-size: 12px;
}
.info p:nth-child(2) {
  margin: 8px 0 6px 0;
}
</style>