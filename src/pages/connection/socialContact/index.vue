<template>
  <div class="content">
    <div class="search-wrap">
      <div class="search" @click="$router.push({ path: '/search', query:{ type: 'friend' } })">
        <img src="@/static/image/search.png" alt />
        <input type="text" v-model="keywords" placeholder="搜索" readonly />
      </div>
    </div>
    <div class="menu">
      <div class="tab">
        <span :class="tabIndex === 0? 'active' : '' " @click="tabIndex = 0">附近</span>
        <span :class="tabIndex === 1? 'active' : '' " @click="tabIndex = 1">好友</span>
        <span :class="tabIndex === 2? 'active' : '' " @click="tabIndex = 2">群聊</span>
        <span :class="tabIndex === 3? 'active' : '' " @click="tabIndex = 3">动态</span>
      </div>
    </div>
    <div class="cont-scroll">
      <!-- 附近 -->
      <NearbyList v-if="tabIndex === 0" />
      <!-- 好友 -->
      <FriendList @childFn="parentFn" v-if="tabIndex === 1" />
      <!-- 群聊 -->
      <MoreChatList v-if="tabIndex === 2" />
      <!-- 动态 -->
      <DynamicState v-if="tabIndex === 3" />
    </div>
  </div>
</template>


<script>
import NearbyList from "@/components/connection/nearbyList";
import FriendList from "@/components/connection/friendList";
import MoreChatList from "@/components/connection/moreChatList";
import DynamicState from "@/components/connection/dynamicState";
export default {
  name: "socialContact",
  components: {
    NearbyList,
    FriendList,
    MoreChatList,
    DynamicState
  },
  data() {
    return {
      isShowIcon: false,
      keywords: "",
      tabIndex: 0
    };
  },
  created() {
    // index.accountData().then( res => {
    //   console.log(res)
    // })
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //  这里的vm指的就是vue实例，可以用来当做this使用
      console.log(from);
      if (from.name == "publish") {
        vm.tabIndex = 3;
      } else if (from.name == "goodsInfo" && from.query.type == 1) {
        vm.tabIndex = 0;
      } else if (from.name == "goodsInfo" && from.query.type == 2) {
        vm.tabIndex = 1;
      } else if (from.name == "setgroupWhat") {
        vm.tabIndex = 2;
      } else if (from.name == "moreChat") {
        vm.tabIndex = 2;
      } else if (from.name == "chat") {
        vm.tabIndex = 1;
      }
    });
  },
  methods: {
    parentFn(tabIndex) {
      this.tabIndex = tabIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 15px;
  .search-wrap{
    width: 100%;
    height: 40px;
    background: #fff;
    padding: 15px 15px 0;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    .search {
      width: 267px;
      height: 24px;
      background: rgba(244, 244, 244, 1);
      box-shadow: 0px 2px 6px rgba(229, 229, 229, 1);
      border-radius: 5px;
      box-sizing: border-box;
      text-align: center;
      line-height: 24px;
      position: relative;
      img {
        width: 14px;
        height: 14px;
        margin-right: 45px;
      }
      input {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        color: #999;
        text-align: center;
      }
      &.focus {
        text-align: left;
        padding-left: 5px;
        img {
          margin-right: 0;
        }
        input {
          text-align: left;
          padding: 0 20px;
        }
      }
    }
  }
  .menu {
    width: 100%;
    height: auto;
    position: fixed;
    top: 40px;
    left: 0;
    z-index: 10000;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 16px 15px 12px;
    .tab {
      width: 70%;
      display: flex;
      align-items: center;
      span {
        color: #999;
        font-size: 12px;
        margin-right: 20px;
        position: relative;
      }
      span.active {
        font-size: 16px;
        color: #333;
      }
      span.active::after {
        content: "";
        width: 16px;
        height: 16px;
        background: rgba(105, 158, 246, 1);
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 8px;
        z-index: -1;
      }
    }
    a {
      font-size: 10px;
      color: #699ef6;
    }
  }
  .banner {
    height: 100px;
    /deep/ .van-swipe {
      height: 88px;
      transform: translateZ(0);
    }
    .banner-img {
      width: 100%;
      height: 88px;
    }
  }
  .custom-bg {
    height: 40px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .reading-tab {
    margin-bottom: 15px;
    .list {
      display: flex;
      padding-bottom: 8px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
      .img {
        width: 80px;
        height: 48px;
        border-radius: 5px;
        margin-right: 8px;
      }
      .cont {
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        label {
          font-size: 16px;
          color: #333;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .list:last-child {
      margin-bottom: 0;
    }
  }
  .reading-tab.great {
    .list:last-child {
      border-bottom: none;
    }
  }
  .student-tab {
    .tab {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      label {
        font-size: 16px;
        color: #333;
        position: relative;
      }
      label::before {
        display: inline-block;
        content: "";
        width: 2px;
        height: 12px;
        background: linear-gradient(
          180deg,
          rgba(151, 190, 255, 1) 0%,
          rgba(105, 158, 246, 1) 100%
        );
        border-radius: 1px;
        margin-right: 3px;
      }
      a {
        font-size: 10px;
        color: #699ef6;
      }
    }
    .list-3 {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 140px;
        height: 64px;
        background: url(../../../static/img/book-bg.png) center / cover
          no-repeat;
        margin: 0 10px 10px 0;
        display: flex;
        align-items: center;
        padding-left: 5px;
        box-sizing: border-box;
        &:nth-child(2n) {
          margin-right: 0;
        }
        img {
          width: 52px;
          height: 52px;
          margin-right: 10px;
        }
        div {
          width: 70px;
          font-size: 14px;
          label,
          span {
            display: block;
          }
          label {
            display: block;
            color: #333;
            margin-bottom: 5px;
          }
          span {
            color: #999;
          }
        }
      }
    }
  }
  .mb12 {
    margin-bottom: 12px;
  }
  .cont-scroll{
    padding-top: 75px;
  }
}
</style>