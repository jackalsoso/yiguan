<template>
  <div class="nearbyList">
    <p class="request" v-if="requestlist !='' ">好友申请</p>
    <div class="group_list" v-for="(val,key) in requestlist" :key="key">
      <div
        class="preson_info"
        @click="$router.push({ path: '/goodsInfo' ,query:{type:1,member_id:val.member_id}})"
      >
        <div class="img_box">
          <img :src="val.face" alt />
        </div>
        <div class>
          <p class="nickname">{{val.nickname}}</p>
          <p class="info" v-if="val.sex == 0">未知,{{val.birth}}</p>
          <p class="info" v-if="val.sex == 1">男,{{val.birth}}</p>
          <p class="info" v-if="val.sex == 2">女,{{val.birth}}</p>
        </div>
      </div>
      <div class="btn">
        <span @click="check(val.member_id,2)">同意</span>
        <span @click="check(val.member_id,1)">拒绝</span>
      </div>
    </div>
    <div class="group_list" v-for="(val) in nearbylist" :key="val.member_id">
      <div
        class="preson_info"
        @click="$router.push({ path: '/goodsInfo' ,query:{type:1,member_id:val.member_id}})"
      >
        <div class="img_box">
          <img v-if="val.face" :src="val.face" alt />
          <img v-else src="@/static/image/stu-1.png" alt />
        </div>
        <div class>
          <p class="nickname">{{val.nickname}}</p>
          <p class="info" v-if="val.sex == 0">未知,{{val.birth}}</p>
          <p class="info" v-if="val.sex == 1">男,{{val.birth}}</p>
          <p class="info" v-if="val.sex == 2">女,{{val.birth}}</p>
        </div>
      </div>
      <div  class="addfriends" >
          <div class="distance">{{val.distance}}km</div>
          <div class="addfriend" @click="addFriendlist(val.member_id)">+ 好友</div>
      </div>
      
    </div>
   <van-loading class="load-v" size="0.75rem" color="#1989fa" vertical v-if="load">定位中...</van-loading>
    <!-- 暂无内容 -->
    <div class="conten_none" v-if="!nearbylist.length && !requestlist.length ">
      <img src="@/static/image/icon_2.png" alt />
      <p>附近没有用户</p>
    </div>
    <!-- 网络出错 -->
    <!-- <div class="conten_none">
          <img src="@/static/image/icon_1.png" alt="">
          <p>哎呀，网络好像出错了~</p>
          <div class="loading">重新加载</div>
    </div>-->
  </div>
</template>

<script>
import Vue from "vue";
import { Toast,Loading } from "vant";
Vue.use(Toast).use(Loading);
import Connection from "@/api/connection";
export default {
  name: "nearbyList",
  components: {},
  data() {
    return {
      time: 180000,
      nearbylist: [],
      longitude: [],
      longitude2: ['121.509134','31.30227'],
      latitude: "",
      requestlist: [],
      load:true
    };
  },
  watch:{
    longitude(){
      this.init();
    }
  },
  created() {
    this.request();
    // this.init();
  },
  mounted() {
    if(window.SDJSBridge){
      let origin = window.SDJSBridge.getLatAndLong();
      this.longitude = origin.split(",");
      this.timer = setInterval(() => {
        let origin = window.SDJSBridge.getLatAndLong();
        this.longitude = origin.split(",");
      },this.time);
    }
  },
  destroyed(){
    clearInterval(this.timer);
  },
  methods: {
    // 获取附近好友列表
    init() {
      let longitude = this.longitude;
      let params = {
        member_id: this.$memberId(),
        longitude: longitude[0].toString(),
        latitude: longitude[1].toString()
      };
      //  let params = {
      //   member_id: this.$memberId(),
      //   longitude: '121.509134',
      //   latitude: '31.30227'
      // };
      Connection.nearbyList(params).then(res => {
        let arr=[]
        if (res.status == 1000) {
          this.load=false;
          this.nearbylist = res.data;
           // 过滤出自己
          this.nearbylist.map(item => {
            if(item.member_id != this.$memberId()){
             let obj = {
               member_id:item.member_id,
               nickname:item.nickname,
               face:item.face,
               birth:item.birth,
               sex:item.sex,
               distance:item.distance
             }
              arr.push(obj)
            } 
            this.nearbylist =arr
           
        })
         console.log("全部",this.nearbylist)
        }
      });
    },
    // 获取好友申请列表
    request() {
      let obj = {
        friend_id: this.$memberId(),
      };
      Connection.getfriendReques(obj).then(res => {
        if (res.status == 1000) {
          // console.log(res)
          this.requestlist = res.data;
          if(res.data.length){
            this.load=false;
          }
          console.log("获取好友申请列表", this.requestlist);
        }
      });
    },
    // 申请加为好友
    addFriendlist(friend_id) {
      let params = {
        member_id: this.$memberId(),
        friend_id: friend_id
      };
      Connection.addFriend(params).then(res => {
        if (res.status == 1000) {
          Toast.success("申请成功,等待对方审核");
          this.init();
        } else {
          Toast.fail(res.message);
        }
      });
    },
    //审核好友是通过还是拒绝
    check(friend_id, status) {
      let params = {
        member_id: friend_id,
        friend_id: this.$memberId(),
        status: status
      };
      Connection.checkFriend(params).then(res => {
        if (res.status == 1000) {
          Toast.success("审核成功");
          this.request();
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.group_list:last-child{
  margin-bottom: 40px;
}
.request {
  padding: 8px 0;
  font-size: 14px;
  color: #699ef6;
}
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
  margin-top: 15px;
}
.conten_none img {
  display: block;
  width: 168px;
  height: 111px;
  margin: 50px auto 0;
}
.load-v{
  margin-top: 30px;
}
.nearbyList {
  .group_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f4f4f4;
    .preson_info {
      width: 70%;
      display: flex;
      justify-content: flex-start;
      .img_box {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  .nickname {
    font-size: 14px;
    color: #333333;
    margin-bottom: 6px;
  }
  .info {
    font-size: 12px;
    color: #999999;
  }
  .addfriends {
    width: 52px;
    padding: 0 5px;
    font-size: 14px;
    height: 20px;
    text-align: center;
    // line-height: 20px;

    // margin-top: 10px;
    .distance{
      color: #999999;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .addfriend{
      color: #699ef6;
      border: 1px solid #699ef6;
      font-size: 12px;
      border-radius: 50px;
    }
  }
}
.btn {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.btn span {
  display: inline-block;
  width: 40px;
  height: 20px;
  border-radius: 50px;
  line-height: 20px;
  margin-left: 10px;
  border: 1px solid #699ef6;
  text-align: center;
}
</style>