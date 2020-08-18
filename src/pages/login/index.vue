<template>
  <div class="login">
    <div class="center">
        <img class="start" src="@/static/img/start-img.png" alt="">
        <span>打开乙观&nbsp;&nbsp;&nbsp;发现美好</span>
        <div class="yl" :class="tab==0? 'active' : '' " @click="tab=0">游览</div>
        <div class="yl cz" :class="tab==1? 'active' : '' " @click="tab=1">自由创作</div>
        <img class="goin" src="@/static/img/goin.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return{
      tab: 1,
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .login{
    width: 100%;
    height: 100%;
    background: url(../../static/img/login-bg.jpg) center / cover no-repeat;
    position: relative;
    .center{
      width: 200px;
      height: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .start{
        width: 86px;
        height: 68px;
        margin-bottom: 28px;
      }
      span{
        font-size: 19px;
        color: #fff;
        margin-bottom: 100px;
      }
      .yl{
        width:101px;
        height:29px;
        border:1px solid rgba(255,255,255,1);
        border-radius:14px;
        font-size: 15px;
        color: #fff;
        text-align: center;
        line-height: 29px;
        box-sizing: border-box;
        margin-bottom: 20px;
        &.active{
          background: #fff;
          color: #000;
        }
      }
      .cz{
        margin-bottom: 60px;
      }
      .goin{
        width: 74px;
        height: 74px;
      }
    }
  }
</style>
