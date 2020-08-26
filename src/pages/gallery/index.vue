<template>
  <div class="content">
    <div class="animated fadeInUp">
      <div class="search-warp">
        <div class="search">
          <img class="back" src="@/static/img/back-icon.png" alt="" @click="$router.back(-1)" >
          <div class="input" @click="$router.push('/search')">
            <img src="@/static/img/search.png" alt="">
            <input type="text" placeholder="搜索热门画廊模板" readonly >
          </div>
        </div>
      </div>

      <div class="box">
        <div class="item" @click="$router.push({ path: '/gallery/1' })">
          <img class="img" :class="{ 'active': !isShowPop }" src="@/static/img/item-1.jpeg" alt="">
          <div class="tit">
            <label>现代风格</label>
            <span>4.5分</span>
          </div>
          <div class="num">30个画框</div>
        </div>
        <div class="item" @click="$router.push({ path: '/gallery/1' })">
          <img class="img" :class="{ 'active': !isShowPop }" src="@/static/img/item-1.jpeg" alt="">
          <div class="tit">
            <label>现代风格</label>
            <span>4.5分</span>
          </div>
          <div class="num">30个画框</div>
        </div>
        <div class="item" @click="$router.push({ path: '/gallery/1' })">
          <img class="img" :class="{ 'active': !isShowPop }" src="@/static/img/item-2.jpeg" alt="">
          <div class="tit">
            <label>现代风格</label>
            <span>4.5分</span>
          </div>
          <div class="num">30个画框</div>
        </div>
        <div class="item" @click="$router.push({ path: '/gallery/1' })">
          <img class="img" :class="{ 'active': !isShowPop }" src="@/static/img/item-1.jpeg" alt="">
          <div class="tit">
            <label>现代风格</label>
            <span>4.5分</span>
          </div>
          <div class="num">30个画框</div>
        </div>
      </div>
    </div>

    <div class="pop" v-if="isShowPop"  @click="isShowPop = false">
      <span>选择画廊类型</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gallery',
  data(){
    return{
      isShowPop: true,
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
          &.active{
            transform-origin: left top;
            animation: imgRun .5s;
          }
        }
        @keyframes imgRun {
          0%{
            transform: scale(0);
          }
          100%{
            transform: scale(1);
          }
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
            color: #F2630D;
            font-size: 14px;
          }
        }
        .num{
          display: inline-block;
          padding: 5px 12px;
          background:rgba(239,238,236,1);
          text-align: center;
          font-size: 12px;
          color: #6F8191;
        }
      }
    }
    .pop{
      width:100%;
      height:100%;
      background: rgba(0,0,0,.7);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10000;
      span{
        width:137px;
        height:41px;
        background:rgba(239,238,236,1);
        border-radius:20px;
        font-size: 16px;
        color: #000;
        text-align: center;
        line-height: 41px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
</style>
