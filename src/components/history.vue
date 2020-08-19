<template>
  <div>

    <div class="history">
      <div class="tit">
        <span>最近搜索</span>
        <img src="@/static/img/del.png" alt="">
      </div>
      <div class="cont">
        <span v-for="v in 6" :key="v" >现在风格</span>
      </div>
    </div>

    <div class="history">
      <div class="tit">
        <span>热门搜索</span>
      </div>
      <div class="cont">
        <span v-for="v in 6" :key="v">现在风格</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'history',
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
  
</style>
