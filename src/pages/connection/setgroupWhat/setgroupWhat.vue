<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/image/back-2.png" alt />
        <span class="tit">群管理</span>
      </div>
    </div>
    <div class="group_list">
      <div class="list" v-for="(val,key) in grouplist" :key="key"  >
        <div class="icon_img">
          <img class="icon" :src="val.face" alt @click="$router.push({ path: '/goodsInfo' ,query:{type:2,member_id:val.member_id,f_pk_id:val.f_pk_id}})"/>
          <p v-if="destatus" @click="delperson(val.member_id)">X</p>
        </div>
        <p class="username" @click="$router.push({ path: '/goodsInfo' ,query:{type:2,member_id:val.member_id,f_pk_id:val.f_pk_id}})">{{val.remark ? val.remark :val.nickname }}</p>
      </div>
      <div class="list" @click="addperson">
        <div class="icon_img">
          <img class="icon" src="@/static/image/add.png" alt />
        </div>
        <p class="username">添加好友</p>
      </div>

      <div class="list" v-if="type == 1 && deleteStatus" @click="remove1()">
        <div class="icon_img">
          <img class="icon" src="@/static/image/delete.png" alt />
        </div>
        <p class="username">移除好友</p>
      </div>
    </div>
    <div class="group_name" v-if="type == 1">
      <span>群聊名称</span>
      <input type="text" name id placeholder="请填写群名称" v-model="group_name" />
    </div>

    <div class="group_name" v-if="type == 1">
      <span>群昵称</span>
      <!-- <p>{{nickname}}</p> -->
      <input type="text" name id placeholder="填写群里的昵称" v-model="nickname" />
    </div>
    <div class="group_name group_name1" v-if="type == 1">
      <p>群公告</p>
      <textarea name id cols="30" rows="10" placeholder="请输入群公告" v-model="notice"></textarea>
      <!-- <input type="text" name="" id="" placeholder="请填写群名称" v-model="group_name"> -->
    </div>
    <div class="button " v-if="type == 1" @click="save">保存</div>
    <div class="button btn" v-if="type == 1" @click="log_out">退出群聊</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, Dialog } from "vant";
Vue.use(Toast).use(Dialog);
import Connection from "@/api/connection";
export default {
  name: "setgroupWhat",
  components: {},
  data() {
    return {
      type: "",
      group: "",
      group_id: "",
      group_name: "",
      member: "",
      member_id: 1,
      notice: "",
      nickname: "",
      deleteStatus: false,
      destatus: false,
      admin: false,
      qz_id:'',
      grouplistlength:'',
      grouplist: "" //群成员列表
    };
  },
  created() {
    console.log("传回参数", this.$route.query);
    this.type = this.$route.query.type;
    this.group_id = this.$route.query.group_id;
    this.init();
  },
  methods: {
    remove1(){
      if(this.destatus){
        this.destatus=false
      }else{
        this.destatus=true
      }
      // this.destatus != this.destatus
    },
    addperson() {

      if (this.deleteStatus && this.type == 1) {
        this.$router.push({
          path: "/addmoreChat",
          query: { group_id: this.group_id, member_id: this.$memberId(), type: this.type }
        });
      } else if (this.type == 0) {
        this.$router.push({
          path: "/addmoreChat",
          query: { member_id: this.$memberId(), type: this.type }
        });
      } else {
        Toast.success("您没有拉人权限!!!");
      }
    },
    //管理员群主移除群聊
    delperson(member) {
      let params = {
        member_id: this.$memberId(),
        group_id: this.group_id,
        member: member
      };
      Connection.logOut(params).then(res => {
        if (res.status == 1000) {
          Toast.success("移除成员成功");
          this.destatus = false;
          this.getgrouplist();
         console.log("群成员列表长度",this.grouplistlength)
          // console.log(this.grouplist.length);
          if (this.grouplistlength <=3) {
            this.$router.push({ path: `/socialContact` });
            Toast.success("群成员不足三人，已解散");
          }
        } else {
          Toast.fail("res.message");
        }
      });
    },
    // 获取群信息
    init() {
      let params1 = {
        group_id: this.group_id
      };
      Connection.groupinfo(params1).then(res => {
        console.log('群信息',res)
        this.group = res.data;
        this.group_name = this.group.name;
        // 群主id
        this.qz_id=this.group.member_id
        // console.log("群主id",this.qz_id)
        if(this.qz_id == this.$memberId()){
          this.deleteStatus=true
        }
        this.notice = this.group.notice;
        this.getgrouplist();
      });
     
    },
    // 获取群成员列表
    getgrouplist() {
      let params2 = {
        member_id: this.$memberId(),
        group_id: this.group_id
      };
      Connection.person(params2).then(res => {
        this.grouplist = res.data;
        this.grouplistlength=this.grouplist.length
        //处理数据
        // 群列表里面我是那个
        let arr = [];
        this.grouplist.forEach(item => {
          if (this.$memberId() == item.member_id) {
            arr = item;
            // 群昵称
            if (arr.remark) {
              this.nickname = arr.remark;
            } else {
              this.nickname = arr.nickname;
            }
          }
          console.log("我是谁", arr);
         
          // // 我是否是群主或者管理员,如果可以踢人,踢人按钮显示
          // if (arr.gm_state == 2 || arr.gm_state == 3) {
          //   this.deleteStatus = true;
          // }
        });
        
      });
    },
    // 修改群消息
    save() {
      let params = {
        group_id: this.group_id,
        member_id: this.$memberId(),
        name: this.group_name,
        notice: this.notice
      };
      Connection.updateGroup(params).then(res => {
        if (res.status == 1000) {
          Toast.success("修改成功");
        } else {
          Toast.fail(res.message);
        }
      });
      let params1 = {
        member_id: this.$memberId(),
        group_id: this.group_id,
        member: this.$memberId(),
        remark:this.nickname
      };
      Connection.editGroupMember(params1).then(res => {
        if (res.status == 1000) {
          Toast.success("修改成功");
          this.getgrouplist()
        } else {
          Toast.fail("res.message");
        }
      });
    },
    //退出群聊
    log_out() {
      let params = {
        group_id: this.group_id,
        member_id: this.$memberId(),
        member: this.$memberId()
      };
      Connection.logOut(params).then(res => {
        if (res.status == 1000) {
          Toast.success("退出成功");
          this.$router.push({ path: `/socialContact` });
        } else {
          Toast.fail(res.message);
        }
      });
    }
    // 不是群主或者管理员自己退群
    //    if(!this.deleteStatus){
    //         Dialog.confirm({
    //         title: '提示',
    //         message: '您确定要退出此群聊？',
    //         })
    //         .then(() => {
    //            let params = {
    //                 group_id:this.group_id,
    //                 member_id:this.member_id,
    //                 member:this.member_id
    //             }
    //             Connection.logOut(params).then( res => {
    //                 if(res.status ==1000){
    //                     Toast.success('退出成功');
    //                     this.$router.push({ path: `/socialContact` })
    //                 }else{
    //                     Toast.fail(res.message);
    //                 }
    //             })
    //         })
    //         .catch(() => {

    //      });
    //    }else{
    //        Dialog.confirm({
    //         title: '提示',
    //         message: '您确定要退出此群聊？',
    //         })
    //         .then(() => {
    //            let params = {
    //                 group_id:this.group_id,
    //                 member_id:this.member_id,
    //                 member:this.member_id
    //             }
    //             Connection.logOut(params).then( res => {
    //                 if(res.status ==1000){
    //                     Toast.success('退出成功');
    //                     this.$router.push({ path: `/socialContact` })
    //                 }else{
    //                     Toast.fail(res.message);
    //                 }
    //             })
    //         })
    //         .catch(() => {

    //      });
    //    }

    // }
  }
};
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  background: #f4f4f4;
  // text-align: right;
  height: 80px;
  border: none;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
  padding: 6px 10px;
}
.group_name {
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #333;
}
.group_name1 {
  display: block;
  p {
    margin-bottom: 15px;
  }
}
input {
  border: none;
  text-align: right;
  width: 80%;
  padding: 0;
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
  margin: 60px auto 0;
}
.btn {
  margin: 20px auto 0;
}
.content {
  .group_list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 0px 0 15px;
    box-sizing: border-box;
    margin-bottom: 30px;
    .list {
      width: 50px;
      margin-bottom: 14px;
      margin-right: 10px;
      .icon_img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 5px;
        position: relative;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          position: absolute;
          z-index: 1;
        }
        p {
          width: 18px;
          height: 18px;
          // background: #f00;
          position: absolute;
          text-align: center;
          right: -6px;
          line-height: 18px;
          top: -6px;
          font-size: 14px;
          color: #699ef6;
          z-index: 999;
        }
      }
      .username {
        margin-top: 5px;
        color: #999999;
        font-size: 10px;
        text-align: center;
      }
    }
  }
}
</style>