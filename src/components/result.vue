<template>
  <div>

    <div class="box">
      <div class="item" @click="$router.push({ path: '/gallery/1' })">
        <img class="img" src="@/static/img/item-1.jpeg" alt="">
        <div class="tit">
          <label>现代风格</label>
          <span class="active">
            <img src="@/static/img/zan.png" alt="" v-show="false">
            <img src="@/static/img/zan-f.png" alt="" v-show="true" >
            123
          </span>
        </div>
        <div class="num">独具特色的现代风格画...</div>
      </div>
      <div class="item" @click="$router.push({ path: '/gallery/1' })">
        <img class="img" src="@/static/img/item-1.jpeg" alt="">
        <div class="tit">
          <label>现代风格</label>
          <span>
            <img src="@/static/img/zan.png" alt="" v-show="true">
            <img src="@/static/img/zan-f.png" alt="" v-show="false" >
            123
          </span>
        </div>
        <div class="num">独具特色的现代风格画...</div>
      </div>
      <div class="item" @click="$router.push({ path: '/gallery/1' })">
        <img class="img" src="@/static/img/item-2.jpeg" alt="">
        <div class="tit">
          <label>现代风格</label>
          <span>
            <img src="@/static/img/zan.png" alt="" v-show="true">
            <img src="@/static/img/zan-f.png" alt="" v-show="false" >
            123
          </span>
        </div>
        <div class="num">独具特色的现代风格画...</div>
      </div>
      <div class="item" @click="$router.push({ path: '/gallery/1' })">
        <img class="img" src="@/static/img/item-1.jpeg" alt="">
        <div class="tit">
          <label>现代风格</label>
          <span>
            <img src="@/static/img/zan.png" alt="" v-show="true">
            <img src="@/static/img/zan-f.png" alt="" v-show="false" >
            123
          </span>
        </div>
        <div class="num">独具特色的现代风格画...</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'result',
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
  .box{
    -moz-column-count:2;
    -webkit-column-count:2;
    column-count:2;
    -moz-column-gap:15px;
    -webkit-column-gap:15px;
    column-gap:15px;
    padding: 0 15px;
    .item{
      -moz-page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
      margin-bottom: 30px;
      .img{
        width: 100%;
      }
      .tit{
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        label{
          width: 70%;
          font-size: 16px;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span{
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #6F8191;
          img{
            width: 14px;
            height: 15px;
            margin-right: 5px;
          }
          &.active{
            color: #F1630D;
          }
        }
      }
      .num{
        width: 100%;
        padding: 5px 12px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background:rgba(239,238,236,1);
        text-align: center;
        font-size: 12px;
        color: #6F8191;
      }
    }
  }
   
</style>
