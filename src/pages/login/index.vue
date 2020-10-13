<template>
  <div class="content">
    <div class="center">
      <img class="start" src="@/static/img/start-img2.png" alt="" />
      <span>打开展览馆&nbsp;&nbsp;&nbsp;发现美好</span>
      <!-- <div class="yl" :class="tab == 0 ? 'active' : ''" @click="tab = 0">
        游览
      </div> -->
      <div class="yl cz" :class="tab == 1 ? 'active' : ''" @click="tab = 1">
        自由创作
      </div>
      <img class="goin" src="@/static/img/goin.png" alt="" @click="goin" />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      tab: 1,
    };
  },
  created() {},
  methods: {
    goin() {
      if (this.tab == 1) {
        this.$router.push("/gallery");
      }else{
        this.$router.push("/focusPersonal");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background: url(../../static/img/开始页面01.jpg) center / cover no-repeat;
  position: relative;
  .center {
    width: 200px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .start {
      width: 86px;
      height: 68px;
      margin-bottom: 28px;
    }
    span {
      font-size: 19px;
      color: #fff;
      margin-bottom: 100px;
    }
    .yl {
      width: 101px;
      height: 29px;
      border: 1px solid rgba(255, 255, 255, 1);
      border-radius: 14px;
      font-size: 15px;
      color: #fff;
      text-align: center;
      line-height: 29px;
      box-sizing: border-box;
      margin-bottom: 20px;
      &.active {
        background: #fff;
        color: #000;
      }
    }
    .cz {
      margin-bottom: 60px;
    }
    .goin {
      width: 74px;
      height: 74px;
    }
  }
}
</style>
