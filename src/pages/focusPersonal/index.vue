<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <div class="input ml" @click="$router.push('/search')">
          <img src="@/static/img/search.png" alt="">
          <input type="text" placeholder="搜索作者" readonly >
        </div>
      </div>
    </div>

    <div class="author" v-for="v in 3" :key="v">
      <div class="name" @click="$router.push('/focusInfor')">
        <label>作者昵称</label>
        <span>
          <img src="@/static/img/yuedul.png" alt="">
          135
        </span>
      </div>
      <span class="intro">贫穷的纠缠，坚强的意识...</span>
      <div class="box-img">
        <img @click="$router.push('/focusWorks')" class="animated fadeInLeft" src="@/static/img/item-1.jpeg" alt="" v-for="v in 3" :key="v">
      </div>
    </div>

    <div class="focus-but">
      <span @click="$router.push('/focusInfor')">
        <img src="@/static/img/focus-i.png" alt="">
        <i>关注</i>
      </span>
      <span>
        <img src="@/static/img/my-i.png" alt="" @click="$router.push('/')">
        <i>我的</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'focusPersonal',
  data(){
    return{

    }
  },
  created(){
    
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding-bottom: 70px;
    background-color: #F5F5F5;
    .ml{
      margin-left: 40px;
    }
    .author{
      margin-top: 6px;
      padding-bottom: 12px;
      background-color: #fff;
      .name{
        padding: 8px 15px;
        display: flex;
        align-items: center;
        label{
          font-size: 16px;
          color: #000;
          margin-right: 40px;
        }
        span{
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #000;
          img{
            width: 21px;
            height: 13px;
            margin-right: 5px;
          }
        }
      }
      .intro{
        display: block;
        padding: 0 15px;
        font-size: 12px;
        color: #6F8191;
        margin-bottom: 20px;
      }
      .box-img{
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
          width:119px;
          height:193px;
          border-radius:10px;
          animation-duration: 1s;
          &:first-child{
            -webkit-animation-delay: 1s;//延迟
            animation-delay: 1s;
          }
          &:nth-child(2){
            -webkit-animation-delay: .5s;//延迟
            animation-delay: .5s;
          }
        }
      }
    }
    .focus-but{
      width: 100%;
      height: 50px;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        i{
          font-size: 10px;
        }
        &:first-child{
          background-color: #F2630D;
          img{
            width: 19px;
            height: 16px;
            margin-bottom: 2px;
          }
          i{
            color: #fff;
          }
        }
        &:last-child{
          img{
            width: 15px;
            height: 16px;
            margin-bottom: 2px;
          }
          i{
            color: #000;
          }
        }
      }
    }
  }
</style>
