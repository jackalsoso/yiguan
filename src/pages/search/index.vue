<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <img class="back" src="@/static/img/back-icon.png" alt="" @click="$router.back(-1)" >
        <div class="input">
          <img src="@/static/img/search.png" alt="">
          <input type="text" placeholder="搜索热门画廊模板" >
        </div>
      </div>
    </div>

    <History v-if="!isResult" />
    <Result v-else />

  </div>
</template>

<script>
import History from '@/components/history'
import Result from '@/components/result'
export default {
  name: 'search',
  components:{
    History,
    Result
  },
  data(){
    return{
      isResult: false,
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
    .history{
      margin-top: 20px;
      .tit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 15px;
        background: #6F8191;
        span{
          font-size: 14px;
          color: #fff;
        }
        img{
          width: 14px;
          height: 14px;
        }
      }
      .cont{
        padding: 15px 15px 0;
        display: flex;
        flex-wrap: wrap;
        span{
          padding: 6px 12px;
          background: #EFEEEC;
          border-radius: 12px;
          margin-right: 20px;
          margin-bottom: 15px;
          font-size: 12px;
          color: #000; 
        }
      }
    }
  }
</style>
