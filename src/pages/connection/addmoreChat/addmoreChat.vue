<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/image/back-2.png" alt />
        <span class="tit">选择更多好友</span>
      </div>
    </div>
    <div class="group_list">
      <van-checkbox-group v-model="result" ref="checkboxGroup" @change="chose">
        <van-checkbox
          :name="val.member_id"
          class="list"
          v-for="(val,key) in friendlist"
          :key="key"
        >
          <img :src="val.face" alt />

          <span>{{val.nickname}}</span>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <div class="conten_none" v-if="friendlist==''">
      <img src="@/static/image/icon_2.png" alt />
      <p>你还没有添加好友~</p>
      <div class="loading" @click="addfriend">添加好友</div>
    </div>
    <div class="button" v-else>
      <img v-if="status" src="@/static/image/chose.png" alt @click="toggleAll(false)" />
      <div v-else class="circle" @click="toggleAll(true)"></div>
      <div class="sure" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import Connection from "@/api/connection";
export default {
  name: "addmoreChat",
  components: {},
  data() {
    return {
      checked: true,
      result: [],
      status: false,
      friendlist: [],
      member: "",
      group_id: "",
      type: ""
    };
  },
  created() {
    console.log("获取传过来的参数", this.$route.query);
    // this.member_id = this.$route.query.member_id;
    this.group_id = this.$route.query.group_id;
    this.type = this.$route.query.type;
    this.init();
  },
  methods: {
    //获取好友列表信息
    init() {
      let params = {
        member_id: this.$memberId()
      };
      Connection.accountData(params).then(res => {
        this.friendlist = res.data;
        console.log(this.friendlist);
      });
    },

   
    confirm() {
       //创建群
      if (this.type == 0) {
        let arr = this.result;
        this.member = arr.toString();
        let params = {
          member_id: this.$memberId(),
          member: this.member
        };
        Connection.createGroup(params).then(res => {
          if (res.status == 1000) {
            Toast.success("创建成功");
            this.$router.push({
              path: "/moreChat",
              query: { type: 1, group_id: res.data.group_id }
            });
          } else {
            Toast.fail(res.message);
          }
        });
      } else {
        // 拉人进群
        let arr = this.result;
        this.member = arr.toString();
        let params = {
          group_id: this.group_id,
          member_id: this.$memberId(),
          member: this.member,
          state: 1
        };
        Connection.editGroupMember(params).then(res => {
          if (res.status == 1000) {
            Toast.success("成功");
            this.$router.push({
              path: "/setgroupWhat",
              query: {
                type: 1,
                group_id: this.group_id,
                member_id: this.$memberId()
              }
            });
          } else {
            Toast.fail(res.message);
          }
        });
      }
    },
    chose(val) {
      console.log(val);
      if (val.length == this.friendlist.length) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    toggleAll(flag) {
      this.status = !this.status;
      this.$refs.checkboxGroup.toggleAll(flag);
    },
    // 去添加好友
    addfriend() {
      this.$router.push({ path: `/socialContact` });
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  width: 130px;
  height: 32px;
  background: rgba(105, 158, 246, 1);
  box-shadow: 0px 3px 12px rgba(151, 190, 255, 0.8);
  opacity: 1;
  border-radius: 19px;
  margin: 50px auto 0;
  text-align: center;
  line-height: 32px;
  color: #fff;
  font-size: 14px;
}
.conten_none p {
  text-align: center;
  color: #699ef6;
  font-size: 12px;
}
.conten_none img {
  display: block;
  width: 168px;
  height: 111px;
  margin: 95px auto 0;
}
.button {
  padding: 10px 15px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  // margin-bottom: 100px;
  background: #fff;
  z-index: 99999;
}
.button img {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
.sure {
  width: 76px;
  height: 23px;
  background: rgba(105, 158, 246, 1);
  opacity: 1;
  border-radius: 20px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  line-height: 23px;
}
.circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #707070;
}
.group_list {
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 100px;
}
.group_list span {
  color: #333333;
  font-size: 14px;
  display: inline-block;
  margin-top: 14px;
  margin-left: 8px;
}
.group_list img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.list {
  padding: 2px 0 12px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}
</style>